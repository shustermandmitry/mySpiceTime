// packages/services/project-management/src/domain/types/jobs.ts
export interface JobCode {
  id: string;
  code: string;  // The actual job number
  name: string;
  description?: string;
  category: JobCategory;
  parentJob?: string;  // Parent job code ID
  allocationType: AllocationType;
  overhead?: OverheadPolicy;
  activeProjects: string[];  // Project IDs this job is used in
  validFrom: string;
  validTo?: string;
}

export enum JobCategory {
  DEVELOPMENT = 'DEVELOPMENT',
  RESEARCH = 'RESEARCH',
  MAINTENANCE = 'MAINTENANCE',
  SUPPORT = 'SUPPORT',
  OVERHEAD = 'OVERHEAD',
  TRAINING = 'TRAINING'
}

export enum AllocationType {
  DIRECT = 'DIRECT',           // Time tracked directly to this job
  DISTRIBUTED = 'DISTRIBUTED', // Time automatically split between projects
  OVERHEAD = 'OVERHEAD'        // General overhead activities
}

export interface OverheadPolicy {
  distributionType: 'EQUAL' | 'WEIGHTED' | 'CUSTOM';
  weights?: Record<string, number>; // Project ID to weight mapping
}

// Extend SpiceTimeProject
export interface ProjectJobs {
  primaryJob: string;  // Primary job code ID for this project
  secondaryJobs: string[];  // Additional job codes that can be used
  timeAllocationPolicy?: TimeAllocationPolicy;
}

export interface TimeAllocationPolicy {
  defaultJob: string;  // Job code ID to use by default
  autoDistribute?: boolean;  // Whether to use AI service for distribution
  overheadHandling?: OverheadPolicy;
}

// packages/services/project-management/src/schema/typeDefs.ts
const jobTypeDefs = `#graphql
  type JobCode {
    id: ID!
    code: String!
    name: String!
    description: String
    category: JobCategory!
    parentJob: JobCode
    allocationType: AllocationType!
    overhead: OverheadPolicy
    activeProjects: [Project!]!
    validFrom: String!
    validTo: String
  }

  enum JobCategory {
    DEVELOPMENT
    RESEARCH
    MAINTENANCE
    SUPPORT
    OVERHEAD
    TRAINING
  }

  enum AllocationType {
    DIRECT
    DISTRIBUTED
    OVERHEAD
  }

  type OverheadPolicy {
    distributionType: DistributionType!
    weights: JSON
  }

  enum DistributionType {
    EQUAL
    WEIGHTED
    CUSTOM
  }

  extend type Project {
    primaryJob: JobCode!
    secondaryJobs: [JobCode!]!
    timeAllocationPolicy: TimeAllocationPolicy
  }

  type TimeAllocationPolicy {
    defaultJob: JobCode!
    autoDistribute: Boolean
    overheadHandling: OverheadPolicy
  }

  input CreateJobCodeInput {
    code: String!
    name: String!
    description: String
    category: JobCategory!
    parentJob: ID
    allocationType: AllocationType!
    overhead: OverheadPolicyInput
  }

  input OverheadPolicyInput {
    distributionType: DistributionType!
    weights: JSON
  }

  extend type Mutation {
    createJobCode(input: CreateJobCodeInput!): JobCode!
    assignJobToProject(projectId: ID!, jobId: ID!, isPrimary: Boolean!): Project!
    setTimeAllocationPolicy(projectId: ID!, policy: TimeAllocationPolicyInput!): Project!
  }

  extend type Query {
    projectJobs(projectId: ID!): [JobCode!]!
    availableJobs(category: JobCategory): [JobCode!]!
    jobHierarchy(rootId: ID): [JobCode!]!
  }

  extend type Subscription {
    jobAssignmentUpdated(projectId: ID!): Project!
  }
`;

// packages/services/project-management/src/infrastructure/providers/nextcloud/adapter.ts
export class NextCloudAdapter {
  // Add to existing adapter
  mapTimeTrackingData(timeTracking: NextCloudTimeTracking): ProjectJobs {
    return {
      primaryJob: timeTracking.default_account,
      secondaryJobs: timeTracking.additional_accounts,
      timeAllocationPolicy: timeTracking.policy ? {
        defaultJob: timeTracking.policy.default_account,
        autoDistribute: timeTracking.policy.auto_distribute,
        overheadHandling: this.mapOverheadPolicy(timeTracking.policy.overhead)
      } : undefined
    };
  }
}