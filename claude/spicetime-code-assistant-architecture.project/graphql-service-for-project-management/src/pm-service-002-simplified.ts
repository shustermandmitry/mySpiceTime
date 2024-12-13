// packages/services/project-management/src/domain/types/spicetime.ts
export interface SpiceTimeProject {
  id: string;
  name: string;
  description?: string;
  status: SpiceTimeProjectStatus;
  context: ProjectContext;
  teamMembers: TeamMemberRef[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMemberRef {
  memberId: string;
  roles: ProjectRole[];
  joinedAt: string;
}

export interface ProjectRole {
  name: string;
  description?: string;
  assignedAt: string;
}

export enum SpiceTimeProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

// packages/services/project-management/src/schema/typeDefs.ts
export const typeDefs = `#graphql
  type Project {
    id: ID!
    name: String!
    description: String
    status: ProjectStatus!
    teamMembers: [TeamMember!]!
    createdAt: String!
    updatedAt: String!
  }

  type TeamMember {
    memberId: ID!
    roles: [ProjectRole!]!
    joinedAt: String!
  }

  type ProjectRole {
    name: String!
    description: String
    assignedAt: String!
  }

  enum ProjectStatus {
    ACTIVE
    COMPLETED
    ARCHIVED
  }

  input AssignRoleInput {
    memberId: ID!
    roleName: String!
    description: String
  }

  type Mutation {
    assignRole(projectId: ID!, input: AssignRoleInput!): TeamMember!
    removeRole(projectId: ID!, memberId: ID!, roleName: String!): TeamMember!
    addTeamMember(projectId: ID!, memberId: ID!): TeamMember!
    removeTeamMember(projectId: ID!, memberId: ID!): Boolean!
  }

  type Query {
    projectTeam(projectId: ID!): [TeamMember!]!
    memberRoles(projectId: ID!, memberId: ID!): [ProjectRole!]!
  }

  type Subscription {
    teamMemberUpdated(projectId: ID!): TeamMember!
  }
`;