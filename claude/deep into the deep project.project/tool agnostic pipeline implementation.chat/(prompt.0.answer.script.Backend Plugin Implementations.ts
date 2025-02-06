import { Process } from './process-core';
import { ProcessPlugin } from './process-plugin';
import { Action } from './types';

export class DeepPlugin implements ProcessPlugin {
  private deep: any;

  constructor(deep: any) {
    this.deep = deep;
  }

  initialize(process: Process) {
    // Set up Deep-specific initialization
    const initNode = this.deep.new();
    initNode.value = {
      type: 'process_initialization',
      timestamp: Date.now()
    };
  }

  beforeDispatch(action: Action) {
    // Record action in Deep
    const actionNode = this.deep.new();
    actionNode.value = {
      type: action.type,
      payload: action.payload,
      timestamp: Date.now()
    };
  }

  afterDispatch(action: Action, state: any) {
    // Update state in Deep
    const stateNode = this.deep.new();
    stateNode.value = {
      action: action.type,
      resultState: state,
      timestamp: Date.now()
    };
  }
}

export class TreeRPCPlugin implements ProcessPlugin {
  private treeRPC: any;

  constructor(treeRPC: any) {
    this.treeRPC = treeRPC;
  }

  initialize(process: Process) {
    // Set up TreeRPC-specific initialization
    this.treeRPC.initialize({
      processId: Date.now().toString(),
      type: 'process'
    });
  }

  beforeDispatch(action: Action) {
    // Record action in TreeRPC structure
    this.treeRPC.record({
      type: 'action_start',
      action: action.type,
      payload: action.payload,
      timestamp: Date.now()
    });
  }

  afterDispatch(action: Action, state: any) {
    // Update TreeRPC structure
    this.treeRPC.record({
      type: 'action_complete',
      action: action.type,
      state,
      timestamp: Date.now()
    });
  }
}