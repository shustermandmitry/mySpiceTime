// packages/services/project-management/src/domain/services/lifecycle.ts
export class ProjectLifecycleService {
  constructor(
    private nextCloudClient: NextCloudClient,
    private notificationService: NotificationService,
    private logger: Logger
  ) {}

  async updateProjectStage(projectId: string, stage: ProjectStage): Promise<SpiceTimeProject> {
    try {
      // Update board state in NextCloud
      const board = await this.nextCloudClient.updateBoardState(projectId, this.mapStageToState(stage));
      const project = this.adapter.toSpiceTimeProject(board);
      
      await this.notificationService.notifyProjectUpdated(project);
      return project;
    } catch (error) {
      this.logger.error('Failed to update project stage', { projectId, stage, error });
      throw new ProjectOperationError('Failed to update project stage', { projectId, stage });
    }
  }

  async createMilestone(
    projectId: string, 
    input: CreateMilestoneInput
  ): Promise<ProjectMilestone> {
    try {
      // Create stack in NextCloud
      const stack = await this.nextCloudClient.createStack(projectId, {
        title: input.title,
        description: input.description,
        due_date: input.dueDate,
        tags: this.formatDependencyTags(input.dependencies)
      });

      const milestone = this.adapter.stackToMilestone(stack);
      return milestone;
    } catch (error) {
      this.logger.error('Failed to create milestone', { projectId, input, error });
      throw new ProjectOperationError('Failed to create milestone', { projectId });
    }
  }

  async branchProject(
    sourceProjectId: string,
    milestoneId: string,
    name: string
  ): Promise<SpiceTimeProject> {
    try {
      // Create new board in NextCloud
      const newBoard = await this.nextCloudClient.createBoard({
        title: name,
        source_board: sourceProjectId,
        milestone_ref: milestoneId
      });

      // Copy relevant stacks and cards
      await this.nextCloudClient.copyMilestoneData(sourceProjectId, milestoneId, newBoard.id);

      const project = this.adapter.toSpiceTimeProject(newBoard);
      return project;
    } catch (error) {
      this.logger.error('Failed to branch project', { 
        sourceProjectId, 
        milestoneId, 
        name, 
        error 
      });
      throw new ProjectOperationError('Failed to branch project');
    }
  }

  private mapStageToState(stage: ProjectStage): string {
    const stageMap: Record<ProjectStage, string> = {
      [ProjectStage.PROPOSAL]: 'proposal',
      [ProjectStage.DESIGN]: 'design',
      [ProjectStage.PLANNING]: 'planning',
      [ProjectStage.IMPLEMENTATION]: 'implementation',
      [ProjectStage.REVIEW]: 'review',
      [ProjectStage.ARCHIVED]: 'archived'
    };
    return stageMap[stage];
  }

  private formatDependencyTags(dependencies?: string[]): string[] {
    if (!dependencies?.length) return [];
    return dependencies.map(id => `depends_on:${id}`);
  }
}

// packages/services/project-management/src/schema/resolvers.ts
export const resolvers = {
  Mutation: {
    updateProjectStage: async (
      _, 
      { projectId, stage }, 
      { lifecycleService }: { lifecycleService: ProjectLifecycleService }
    ) => {
      return lifecycleService.updateProjectStage(projectId, stage);
    },

    createMilestone: async (
      _,
      { projectId, input },
      { lifecycleService }
    ) => {
      return lifecycleService.createMilestone(projectId, input);
    },

    branchProject: async (
      _,
      { projectId, milestoneId, name },
      { lifecycleService }
    ) => {
      return lifecycleService.branchProject(projectId, milestoneId, name);
    }
  },

  Subscription: {
    projectStageUpdated: {
      subscribe: (_, { projectId }, { pubsub }) => 
        pubsub.asyncIterator([`PROJECT_STAGE_UPDATED_${projectId}`])
    },
    
    milestoneStatusUpdated: {
      subscribe: (_, { projectId }, { pubsub }) =>
        pubsub.asyncIterator([`MILESTONE_STATUS_UPDATED_${projectId}`])
    }
  }
};