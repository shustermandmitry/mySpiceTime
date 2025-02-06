import { ProcessPlugin } from './process-plugin';
import { Action, Reducer, Schema } from './types';

export class Process<S = any> {
  private reducer: Reducer<S>;
  private state: S;
  private schema: Schema;
  private recursionDepth: number = 0;
  private maxRecursionDepth: number;
  private actionStack: string[] = [];
  private plugins: ProcessPlugin[] = [];

  constructor(reducer: Reducer<S>, initialState: S, options: { maxRecursionDepth?: number } = {}) {
    this.reducer = reducer;
    this.state = initialState;
    this.maxRecursionDepth = options.maxRecursionDepth || 10;
    this.schema = { queries: {}, mutations: {} };
  }

  dispatch = (action: Action): S => {
    // Notify plugins before dispatch
    this.plugins.forEach(plugin => plugin.beforeDispatch?.(action));

    // Track action stack to detect cycles
    if (this.actionStack.includes(action.type)) {
      throw new Error(
        `Action cycle detected: ${[...this.actionStack, action.type].join(' -> ')}`
      );
    }

    this.recursionDepth++;
    this.actionStack.push(action.type);

    try {
      if (this.recursionDepth > this.maxRecursionDepth) {
        throw new Error(
          `Max recursion depth of ${this.maxRecursionDepth} exceeded. Action stack: ${this.actionStack.join(' -> ')}`
        );
      }

      const nextState = this.reducer(this.state, action);
      this.state = nextState;

      // Notify plugins after dispatch
      this.plugins.forEach(plugin => plugin.afterDispatch?.(action, nextState));

      return nextState;

    } finally {
      this.recursionDepth--;
      this.actionStack.pop();
    }
  };

  defineSchema(schema: Schema) {
    this.validateSchema(schema);
    this.schema = schema;
  }

  private validateSchema(schema: Schema) {
    if (!schema.queries || !schema.mutations) {
      throw new Error('Schema must define both queries and mutations');
    }

    // Validate resolvers
    const validateResolvers = (resolvers: Schema['queries' | 'mutations']) => {
      for (const [key, def] of Object.entries(resolvers)) {
        if (typeof def.resolver !== 'function') {
          throw new Error(`Invalid resolver for ${key}: resolver must be a function`);
        }
      }
    };

    validateResolvers(schema.queries);
    validateResolvers(schema.mutations);
  }

  async query<T = any>(queryName: string, args: any = {}): Promise<T> {
    const queryDef = this.schema.queries[queryName];
    if (!queryDef) {
      throw new Error(`Query "${queryName}" not found in schema`);
    }

    return queryDef.resolver(this.state, args);
  }

  async mutate<T = any>(mutationName: string, args: any = {}): Promise<T> {
    const mutationDef = this.schema.mutations[mutationName];
    if (!mutationDef) {
      throw new Error(`Mutation "${mutationName}" not found in schema`);
    }

    const result = await mutationDef.resolver(this.state, args);
    
    if (result && result.action) {
      this.dispatch(result.action);
    }

    return result;
  }

  addPlugin(plugin: ProcessPlugin) {
    this.plugins.push(plugin);
    plugin.initialize?.(this);
  }

  getState(): S {
    return this.state;
  }
}