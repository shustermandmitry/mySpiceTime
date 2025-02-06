import { Action } from './types';
import { Process } from './process-core';

export interface ProcessPlugin {
  initialize?(process: Process): void;
  beforeDispatch?(action: Action): void;
  afterDispatch?(action: Action, state: any): void;
}