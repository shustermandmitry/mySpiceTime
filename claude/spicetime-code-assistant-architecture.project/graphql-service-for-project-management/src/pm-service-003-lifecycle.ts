// packages/services/project-management/src/domain/types/lifecycle.ts
export enum ProjectStage {
  PROPOSAL = 'PROPOSAL',
  DESIGN = 'DESIGN',
  PLANNING = 'PLANNING',
  TEAM_FORMATION = 'TEAM_FORMATION',
  IMPLEMENTATION = 'IMPLEMENTATION',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum MilestoneStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  COMPLETED = 'COMPLETED'
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: MilestoneStatus;
  dependencies?: string[]; // IDs of other milestones
  branchedProjects?: string[]; // IDs of projects branched from this milestone
}

// Update SpiceTimeProject interface
export interface SpiceTimeProject {
  id: string;
  name: string;
  description?: string;
  stage: ProjectStage;
  parentProject?: string; // ID of parent project if this was branched
  branchPoint?: string; // Milestone ID where this project branched
  milestones: ProjectMilestone[];
  teamMembers: TeamMemberRef[];
  createdAt: string;
  updatedAt: string;
}

// packages/services/project-management/src/infrastructure/providers/nextcloud/adapter.ts
export class NextCloudAdapter {
  toSpiceTimeProject(board: NextCloudBoard): SpiceTimeProject {
    return {
      id: board.id,
      name: board.title,
      description: board.description,
      stage: this.mapBoardStateToStage(board.state),
      milestones: this.mapStacksToMilestones(board.stacks),
      teamMembers: this.mapBoardUsersToTeamMembers(board.users),
      createdAt: board.created_at,
      updatedAt: board.last_modified
    };
  }

  private mapBoardStateToStage(state: string): ProjectStage {
    const stateMap: Record<string, ProjectStage> = {
      'proposal': ProjectStage.PROPOSAL,
      'design': ProjectStage.DESIGN,
      'planning': ProjectStage.PLANNING,
      'implementation': ProjectStage.IMPLEMENTATION,
      'review': ProjectStage.REVIEW,
      'archived': ProjectStage.ARCHIVED
    };
    return stateMap[state] || ProjectStage.PROPOSAL;
  }

  private mapStacksToMilestones(stacks: NextCloudStack[]): ProjectMilestone[] {
    return stacks.map(stack => ({
      id: stack.id,
      title: stack.title,
      description: stack.description,
      dueDate: stack.due_date,
      status: this.mapStackStateToStatus(stack.state),
      dependencies: this.extractDependencies(stack.tags),
      branchedProjects: this.extractBranchedProjects(stack.links)
    }));
  }
}

// packages/services/project-management/src/schema/typeDefs.ts
export const typeDefs = `#graphql
  enum ProjectStage {
    PROPOSAL
    DESIGN
    PLANNING
    TEAM_FORMATION
    IMPLEMENTATION
    REVIEW
    COMPLETED
    ARCHIVED
  }

  type ProjectMilestone {
    id: ID!
    title: String!
    description: String
    dueDate: String
    status: MilestoneStatus!
    dependencies: [ID!]
    branchedProjects: [ID!]
  }

  enum MilestoneStatus {
    PLANNED
    IN_PROGRESS
    BLOCKED
    COMPLETED
  }

  extend type Project {
    stage: ProjectStage!
    parentProject: ID
    branchPoint: ID
    milestones: [ProjectMilestone!]!
  }

  input CreateMilestoneInput {
    title: String!
    description: String
    dueDate: String
    dependencies: [ID!]
  }

  extend type Mutation {
    updateProjectStage(projectId: ID!, stage: ProjectStage!): Project!
    createMilestone(projectId: ID!, input: CreateMilestoneInput!): ProjectMilestone!
    updateMilestoneStatus(milestoneId: ID!, status: MilestoneStatus!): ProjectMilestone!
    branchProject(projectId: ID!, milestoneId: ID!, name: String!): Project!
  }

  extend type Query {
    projectMilestones(projectId: ID!): [ProjectMilestone!]!
    branchedProjects(projectId: ID!): [Project!]!
  }

  extend type Subscription {
    projectStageUpdated(projectId: ID!): Project!
    milestoneStatusUpdated(projectId: ID!): ProjectMilestone!
  }
`;