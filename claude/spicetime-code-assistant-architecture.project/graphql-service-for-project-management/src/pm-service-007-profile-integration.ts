// packages/services/project-management/src/infrastructure/providers/nextcloud/profile-adapter.ts
export class NextCloudProfileAdapter {
  /**
   * Creates NextCloud board structure from project profile
   */
  async applyProfile(boardId: string, profile: ProjectProfile): Promise<void> {
    // Set up Custom Fields app fields
    await this.setupCustomFields(boardId, profile.customFields);
    
    // Set up Deck board lists based on workflow stages
    await this.setupWorkflowStages(boardId, profile.workflow);
    
    // Create default milestone stacks
    await this.createMilestoneStacks(boardId, profile.defaultMilestones);
    
    // Set up Forms for required artifacts
    await this.setupArtifactForms(boardId, profile.workflow.requiredArtifacts);
    
    // Configure Workflows app for transitions
    await this.setupWorkflowTransitions(boardId, profile.workflow.allowedTransitions);
    
    // Set up time tracking configuration
    await this.configureTimeTracking(boardId, profile.timeTracking);
  }

  private async setupCustomFields(boardId: string, fields: CustomField[]): Promise<void> {
    // Maps our custom fields to NextCloud Custom Fields app
    for (const field of fields) {
      await this.nextCloudClient.customFields.create({
        object_id: boardId,
        name: field.name,
        type: this.mapFieldType(field.type),
        options: field.options,
        required: field.required
      });
    }
  }

  private async setupWorkflowStages(
    boardId: string, 
    workflow: WorkflowDefinition
  ): Promise<void> {
    // Creates Deck lists for each workflow stage
    for (const stage of workflow.stages) {
      await this.nextCloudClient.deck.createList({
        boardId,
        title: stage,
        order: workflow.stages.indexOf(stage)
      });
    }
  }

  private async setupWorkflowTransitions(
    boardId: string,
    transitions: WorkflowDefinition['allowedTransitions']
  ): Promise<void> {
    // Configure Workflows app for stage transitions
    for (const transition of transitions) {
      if (transition.requiresApproval) {
        await this.nextCloudClient.workflows.createRule({
          boardId,
          event: 'card.move',
          conditions: {
            from_list: transition.from,
            to_list: transition.to
          },
          actions: [
            {
              type: 'require_approval',
              roles: transition.approvalRoles
            }
          ]
        });
      }
    }
  }

  private async createMilestoneStacks(
    boardId: string,
    milestones: MilestoneTemplate[]
  ): Promise<void> {
    // Creates Deck stacks for default milestones
    for (const milestone of milestones) {
      await this.nextCloudClient.deck.createStack({
        boardId,
        title: milestone.title,
        description: milestone.description
      });
    }
  }

  private async setupArtifactForms(
    boardId: string,
    requiredArtifacts: WorkflowDefinition['requiredArtifacts']
  ): Promise<void> {
    // Creates Forms for artifact submission
    for (const stageArtifacts of requiredArtifacts) {
      for (const artifact of stageArtifacts.artifacts) {
        await this.nextCloudClient.forms.create({
          title: `${stageArtifacts.stage} - ${artifact}`,
          workflow: {
            trigger: 'card.move',
            conditions: {
              to_list: stageArtifacts.stage
            }
          }
        });
      }
    }
  }

  private async configureTimeTracking(
    boardId: string,
    policy: TimeTrackingPolicy
  ): Promise<void> {
    // Configure TimeTracking app settings
    await this.nextCloudClient.timetracking.configure({
      boardId,
      settings: {
        granularity: this.mapTimeGranularity(policy.granularity),
        approval_required: policy.requireApproval,
        allow_overhead: policy.overheadAllowed
      }
    });
  }

  private mapFieldType(type: CustomField['type']): string {
    const typeMap: Record<CustomField['type'], string> = {
      'TEXT': 'text',
      'NUMBER': 'numeric',
      'DATE': 'datetime',
      'SELECT': 'select',
      'MULTISELECT': 'multiselect'
    };
    return typeMap[type];
  }

  private mapTimeGranularity(granularity: TimeTrackingPolicy['granularity']): string {
    const granularityMap: Record<TimeTrackingPolicy['granularity'], string> = {
      'HOUR': '3600',
      'DAY': '86400',
      'WEEK': '604800'
    };
    return granularityMap[granularity];
  }
}