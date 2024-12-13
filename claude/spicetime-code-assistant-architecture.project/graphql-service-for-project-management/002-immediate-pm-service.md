# Current PM Service Implementation

## Overview
Basic project management service wrapping NextCloud functionality with provisions for future expansion.

## Core Features
1. Project Lifecycle
   - Stage tracking
   - Milestone management
   - Basic team member management
   - Simple job number tracking

2. NextCloud Integration
   - Project/board mapping
   - Basic workflow support
   - Time tracking integration

3. Project Profiles
   - Basic profile templates
   - Workflow definitions
   - Default milestones
   - Custom fields support

## Implementation Structure

### Domain Layer
```typescript
// Basic domain types
interface SpiceTimeProject {
  id: string;
  name: string;
  description?: string;
  stage: ProjectStage;
  milestones: ProjectMilestone[];
  teamMembers: TeamMemberRef[];
  createdAt: string;
  updatedAt: string;
}

enum ProjectStage {
  PROPOSAL = 'PROPOSAL',
  DESIGN = 'DESIGN',
  PLANNING = 'PLANNING',
  IMPLEMENTATION = 'IMPLEMENTATION',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED'
}

interface ProjectMilestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: MilestoneStatus;
}

interface TeamMemberRef {
  memberId: string;
  roles: string[];
  joinedAt: string;
}
```

### GraphQL Schema
```graphql
type Project {
  id: ID!
  name: String!
  description: String
  stage: ProjectStage!
  milestones: [ProjectMilestone!]!
  teamMembers: [TeamMember!]!
  createdAt: String!
  updatedAt: String!
}

type ProjectMilestone {
  id: ID!
  title: String!
  description: String
  dueDate: String
  status: MilestoneStatus!
}

type TeamMember {
  memberId: ID!
  roles: [String!]!
  joinedAt: String!
}

type Mutation {
  createProject(input: CreateProjectInput!): Project!
  updateProjectStage(id: ID!, stage: ProjectStage!): Project!
  addTeamMember(projectId: ID!, memberId: ID!): TeamMember!
  createMilestone(projectId: ID!, input: CreateMilestoneInput!): ProjectMilestone!
}

type Query {
  projects: [Project!]!
  project(id: ID!): Project
  projectMilestones(projectId: ID!): [ProjectMilestone!]!
  teamMembers(projectId: ID!): [TeamMember!]!
}
```

### NextCloud Integration
```typescript
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

  // Additional mapping methods...
}
```

## Current Limitations
1. Basic NextCloud functionality only
2. Simple project structure
3. Limited workflow capabilities
4. Basic time tracking

## Future Integration Points
1. GitHub integration
2. Advanced PM features
3. AI services integration
4. Advanced CLI support