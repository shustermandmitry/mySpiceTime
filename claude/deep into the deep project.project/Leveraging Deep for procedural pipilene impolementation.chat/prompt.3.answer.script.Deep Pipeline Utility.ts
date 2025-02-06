import { Deep } from '@deep-foundation/deep';

interface PipelineStep {
  id: string;
  process: (context: any, next: () => Promise<any>) => Promise<any>;
  priority?: number;
  condition?: (context: any) => boolean;
}

class DeepPipeline {
  private deep: Deep;
  private types: Record<string, Deep>;
  private steps: Map<string, PipelineStep>;
  private processingQueue: Deep;

  constructor() {
    this.deep = new Deep();
    this.steps = new Map();
    this.setupTypes();
    this.initializeQueue();
  }

  private setupTypes() {
    // Core pipeline types
    this.types = {
      pipeline: this.deep.new(),
      step: this.deep.new(),
      context: this.deep.new(),
      result: this.deep.new(),
      error: this.deep.new(),
      queue: this.deep.new(),
    };
  }

  private initializeQueue() {
    this.processingQueue = this.types.queue.new();
    
    // Watch for new items in queue
    const queueSelection = this.deep.select({
      type: this.types.queue,
      value: { status: 'pending' }
    });

    queueSelection.on((event) => {
      if (event.name === 'add') {
        this.processQueueItem(event.value);
      }
    });
  }

  // Add a new middleware step
  addStep(step: PipelineStep) {
    // Create Deep representation of step
    const stepNode = this.types.step.new();
    stepNode.value = {
      id: step.id,
      priority: step.priority || 0,
      hasCondition: !!step.condition
    };

    // Store step implementation
    this.steps.set(step.id, step);

    return stepNode;
  }

  // Remove a middleware step
  removeStep(stepId: string) {
    const stepNode = this.deep.select({
      type: this.types.step,
      value: { id: stepId }
    }).first();

    if (stepNode) {
      stepNode.kill();
      this.steps.delete(stepId);
    }
  }

  // Execute pipeline with context
  async execute(context: any) {
    // Create context node
    const contextNode = this.types.context.new();
    contextNode.value = {
      data: context,
      timestamp: Date.now(),
      status: 'pending'
    };

    // Add to processing queue
    const queueItem = this.types.queue.new();
    queueItem.value = {
      contextId: contextNode.id,
      status: 'pending'
    };

    // Wait for result
    const result = await this.waitForResult(contextNode);
    return result;
  }

  private async processQueueItem(queueItem: Deep) {
    const contextNode = this.deep.select({
      id: queueItem.value.contextId
    }).first();

    try {
      // Get ordered steps
      const orderedSteps = Array.from(this.steps.values())
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));

      // Build middleware chain
      const chain = orderedSteps.reduceRight((next, step) => {
        return async () => {
          // Check condition if exists
          if (step.condition && !step.condition(contextNode.value.data)) {
            return next();
          }
          return step.process(contextNode.value.data, next);
        };
      }, async () => contextNode.value.data);

      // Execute chain
      const result = await chain();

      // Store result
      const resultNode = this.types.result.new();
      resultNode.from = contextNode;
      resultNode.value = {
        data: result,
        timestamp: Date.now()
      };

      // Update queue item
      queueItem.value = { ...queueItem.value, status: 'completed' };

    } catch (error) {
      // Handle error
      const errorNode = this.types.error.new();
      errorNode.from = contextNode;
      errorNode.value = {
        message: error.message,
        stack: error.stack,
        timestamp: Date.now()
      };

      queueItem.value = { ...queueItem.value, status: 'error' };
    }
  }

  private waitForResult(contextNode: Deep): Promise<any> {
    return new Promise((resolve, reject) => {
      const selection = this.deep.select({
        or: [
          { type: this.types.result, from: contextNode },
          { type: this.types.error, from: contextNode }
        ]
      });

      selection.on((event) => {
        if (event.name === 'add') {
          if (event.value.type === this.types.result) {
            resolve(event.value.value.data);
          } else {
            reject(new Error(event.value.value.message));
          }
        }
      });
    });
  }

  // Utility method to add monitoring
  addMonitoring(options: {
    onStepComplete?: (stepId: string, duration: number) => void;
    onPipelineComplete?: (duration: number) => void;
    onError?: (error: any) => void;
  }) {
    const monitoringStep = {
      id: 'monitoring',
      priority: -1000, // Run last
      process: async (context, next) => {
        const startTime = Date.now();
        try {
          const result = await next();
          options.onPipelineComplete?.(Date.now() - startTime);
          return result;
        } catch (error) {
          options.onError?.(error);
          throw error;
        }
      }
    };

    this.addStep(monitoringStep);
  }
}

// Example usage:
const pipeline = new DeepPipeline();

// Add middleware steps
pipeline.addStep({
  id: 'validation',
  priority: 100,
  process: async (context, next) => {
    // Validate input
    if (!context.input) throw new Error('Invalid input');
    return next();
  }
});

pipeline.addStep({
  id: 'transformation',
  priority: 50,
  condition: (context) => context.shouldTransform,
  process: async (context, next) => {
    context.transformed = true;
    return next();
  }
});

pipeline.addStep({
  id: 'enrichment',
  priority: 25,
  process: async (context, next) => {
    // Add additional data
    context.enriched = true;
    return next();
  }
});

// Add monitoring
pipeline.addMonitoring({
  onStepComplete: (stepId, duration) => 
    console.log(`Step ${stepId} completed in ${duration}ms`),
  onPipelineComplete: (duration) => 
    console.log(`Pipeline completed in ${duration}ms`),
  onError: (error) => 
    console.error('Pipeline error:', error)
});

// Execute pipeline
async function runPipeline() {
  try {
    const result = await pipeline.execute({
      input: 'test',
      shouldTransform: true
    });
    console.log('Pipeline result:', result);
  } catch (error) {
    console.error('Pipeline failed:', error);
  }
}
