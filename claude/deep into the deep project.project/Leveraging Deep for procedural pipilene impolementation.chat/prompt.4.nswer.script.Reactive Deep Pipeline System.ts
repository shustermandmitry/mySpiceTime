import { Deep } from '@deep-foundation/deep';

interface PipelineState {
  id: string;
  data: any;
  transitions: Array<{
    to: string;
    condition: (context: any, environment: any) => boolean;
  }>;
  process?: (context: any, environment: any) => Promise<any>;
}

interface PipelineEnvironment {
  deep: Deep;
  subscriptions: Array<{
    selector: any;
    handler: (event: any) => void;
  }>;
}

class ReactivePipeline {
  private deep: Deep;
  private states: Map<string, PipelineState>;
  private environments: Map<string, PipelineEnvironment>;
  private types: Record<string, Deep>;
  private currentState: string;

  constructor(private id: string) {
    this.deep = new Deep();
    this.states = new Map();
    this.environments = new Map();
    this.setupTypes();
  }

  private setupTypes() {
    this.types = {
      state: this.deep.new(),
      transition: this.deep.new(),
      environment: this.deep.new(),
      event: this.deep.new(),
      process: this.deep.new()
    };
  }

  // Add a state to the pipeline
  addState(state: PipelineState) {
    this.states.set(state.id, state);
    
    // Create Deep representation
    const stateNode = this.types.state.new();
    stateNode.value = {
      pipelineId: this.id,
      stateId: state.id,
      data: state.data
    };

    // Create transitions
    state.transitions.forEach(transition => {
      const transNode = this.types.transition.new();
      transNode.from = stateNode;
      transNode.to = this.types.state.new(); // Will be linked to target state
      transNode.value = {
        targetState: transition.to
      };
    });

    return stateNode;
  }

  // Connect to another Deep instance as environment
  connectEnvironment(envId: string, deepInstance: Deep) {
    const environment: PipelineEnvironment = {
      deep: deepInstance,
      subscriptions: []
    };

    // Create Deep representation
    const envNode = this.types.environment.new();
    envNode.value = {
      pipelineId: this.id,
      environmentId: envId
    };

    this.environments.set(envId, environment);
    return envNode;
  }

  // Subscribe to environment changes
  watchEnvironment(envId: string, selector: any, handler: (event: any) => void) {
    const env = this.environments.get(envId);
    if (!env) throw new Error(`Environment ${envId} not found`);

    const subscription = {
      selector,
      handler
    };

    env.subscriptions.push(subscription);
    
    // Set up Deep selection
    const selection = env.deep.select(selector);
    selection.on(handler);

    return () => {
      // Cleanup function
      const idx = env.subscriptions.findIndex(s => s === subscription);
      if (idx >= 0) env.subscriptions.splice(idx, 1);
    };
  }

  // Start pipeline execution
  async start(initialState: string, context: any) {
    this.currentState = initialState;
    await this.executeState(this.currentState, context);
  }

  private async executeState(stateId: string, context: any) {
    const state = this.states.get(stateId);
    if (!state) throw new Error(`State ${stateId} not found`);

    // Create process node to track execution
    const processNode = this.types.process.new();
    processNode.value = {
      pipelineId: this.id,
      stateId,
      context,
      status: 'running'
    };

    try {
      // Execute state process if exists
      if (state.process) {
        // Gather environment data
        const environmentData = Array.from(this.environments.entries()).reduce(
          (acc, [envId, env]) => ({
            ...acc,
            [envId]: env.deep
          }),
          {}
        );

        // Execute process
        const result = await state.process(context, environmentData);
        
        // Update process node
        processNode.value = {
          ...processNode.value,
          result,
          status: 'completed'
        };

        // Check transitions
        for (const transition of state.transitions) {
          if (transition.condition(context, environmentData)) {
            // Create transition event
            const eventNode = this.types.event.new();
            eventNode.value = {
              type: 'transition',
              from: stateId,
              to: transition.to,
              timestamp: Date.now()
            };

            // Move to next state
            this.currentState = transition.to;
            await this.executeState(transition.to, result);
            break;
          }
        }
      }
    } catch (error) {
      processNode.value = {
        ...processNode.value,
        error: error.message,
        status: 'error'
      };
      throw error;
    }
  }
}

// Example of a reactive UI component using the pipeline
class DeepComponent {
  private pipeline: ReactivePipeline;
  private renderPipeline: ReactivePipeline;

  constructor(private props: any) {
    // Main logic pipeline
    this.pipeline = new ReactivePipeline('main');
    
    // Pipeline for managing renders
    this.renderPipeline = new ReactivePipeline('render');

    this.setup();
  }

  private setup() {
    // Set up main processing states
    this.pipeline.addState({
      id: 'init',
      data: null,
      transitions: [
        {
          to: 'loading',
          condition: () => true
        }
      ]
    });

    this.pipeline.addState({
      id: 'loading',
      data: { loading: true },
      process: async (context, env) => {
        // Fetch data from environment
        const data = await env.dataSource.select({ /* query */ });
        return { loading: false, data };
      },
      transitions: [
        {
          to: 'ready',
          condition: (ctx) => !ctx.loading,
        },
        {
          to: 'error',
          condition: (ctx) => ctx.error
        }
      ]
    });

    // Set up render pipeline
    this.renderPipeline.addState({
      id: 'prepare',
      data: null,
      process: async (context, env) => {
        // Transform data for rendering
        return this.transformData(context);
      },
      transitions: [
        {
          to: 'render',
          condition: () => true
        }
      ]
    });

    // Connect pipelines through environments
    this.renderPipeline.connectEnvironment('mainState', this.pipeline.deep);
    
    // Watch for state changes
    this.renderPipeline.watchEnvironment(
      'mainState',
      { type: this.pipeline.types.state },
      (event) => {
        if (event.name === 'change') {
          this.renderPipeline.start('prepare', event.value);
        }
      }
    );
  }

  private transformData(data: any) {
    // Transform data for rendering
    return data;
  }

  async render() {
    // Start main pipeline
    await this.pipeline.start('init', this.props);
  }
}

// Usage example
const component = new DeepComponent({
  initialData: { /* ... */ }
});

component.render();
