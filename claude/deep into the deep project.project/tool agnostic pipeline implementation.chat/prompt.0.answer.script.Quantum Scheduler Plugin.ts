import { Process } from './process-core';
import { ProcessPlugin } from './process-plugin';
import { Action } from './types';

interface QuantumState {
  quantum: number;
  deferredActions: Map<string, {
    action: Action;
    timestamp: number;
    attempts: number;
  }>;
  cycleDetected: boolean;
}

export class QuantumSchedulerPlugin implements ProcessPlugin {
  private process: Process;
  private state: QuantumState;
  private quantumSize: number;
  private maxAttempts: number;

  constructor(options: { 
    quantumSize?: number; // Size of quantum in ms
    maxAttempts?: number; // Max attempts to process an action
  } = {}) {
    this.quantumSize = options.quantumSize || 16; // Default to roughly one frame
    this.maxAttempts = options.maxAttempts || 3;
    this.state = {
      quantum: 0,
      deferredActions: new Map(),
      cycleDetected: false
    };
  }

  initialize(process: Process) {
    this.process = process;
    this.startQuantumClock();
  }

  beforeDispatch(action: Action) {
    // Check if action has been deferred too many times
    const deferred = this.state.deferredActions.get(action.type);
    if (deferred && deferred.attempts >= this.maxAttempts) {
      throw new Error(
        `Action ${action.type} exceeded maximum defer attempts (${this.maxAttempts})`
      );
    }

    // If cycle detected, defer action to next quantum
    if (this.state.cycleDetected) {
      this.deferAction(action);
      throw new Error('QUANTUM_DEFER');
    }
  }

  afterDispatch(action: Action, resultState: any) {
    // Clear deferred status for successful actions
    this.state.deferredActions.delete(action.type);
  }

  private startQuantumClock() {
    const tick = () => {
      this.state.quantum++;
      this.state.cycleDetected = false;
      this.processDeferredActions();
      setTimeout(tick, this.quantumSize);
    };

    tick();
  }

  private deferAction(action: Action) {
    const existing = this.state.deferredActions.get(action.type);
    const attempts = existing ? existing.attempts + 1 : 1;

    this.state.deferredActions.set(action.type, {
      action,
      timestamp: Date.now(),
      attempts
    });
  }

  private async processDeferredActions() {
    // Process deferred actions in order of attempts (prioritize older deferrals)
    const sortedDeferred = Array.from(this.state.deferredActions.values())
      .sort((a, b) => b.attempts - a.attempts);

    for (const { action } of sortedDeferred) {
      try {
        this.state.cycleDetected = false;
        await this.process.dispatch(action);
      } catch (error) {
        if (error.message !== 'QUANTUM_DEFER') {
          // Only re-throw non-deferral errors
          throw error;
        }
      }
    }
  }

  // Utility method to check if an action should be processed in current quantum
  shouldProcessNow(action: Action): boolean {
    return !this.state.deferredActions.has(action.type);
  }

  // Get current quantum number
  getCurrentQuantum(): number {
    return this.state.quantum;
  }

  // Get quantum size in ms
  getQuantumSize(): number {
    return this.quantumSize;
  }
}

// Example usage:
/*
const process = new Process(reducer, initialState);
const quantumScheduler = new QuantumSchedulerPlugin({
  quantumSize: 16, // ~60fps
  maxAttempts: 3
});

process.addPlugin(quantumScheduler);

// Now actions causing cycles will be automatically
// deferred to next quantum instead of throwing
try {
  process.dispatch(action);
} catch (error) {
  if (error.message === 'QUANTUM_DEFER') {
    console.log('Action deferred to next quantum');
  } else {
    throw error;
  }
}
*/