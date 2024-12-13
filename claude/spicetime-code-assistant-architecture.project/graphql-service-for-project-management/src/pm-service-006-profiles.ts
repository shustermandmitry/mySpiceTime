// packages/services/project-management/src/domain/types/profiles.ts
export enum ProjectType {
  CLIENT_PROJECT = 'CLIENT_PROJECT',       // Client deliverables, strict deadlines
  COMMUNITY_PROJECT = 'COMMUNITY_PROJECT', // Open source, community-driven
  INTERNAL_TOOL = 'INTERNAL_TOOL',        // Internal development tools
  PUBLIC_PROJECT = 'PUBLIC_PROJECT',       // Public-facing products
  COLLABORATIVE = 'COLLABORATIVE',         // Multi-org collaboration
  RESEARCH = 'RESEARCH',                  // Exploratory work
  MAINTENANCE = 'MAINTENANCE'             // System maintenance
}

export interface ProjectProfile {
  id: string;
  name: string;
  type: ProjectType;
  workflow: WorkflowDefinition;
  defaultMilestones: MilestoneTemplate[];
  customFields: CustomField[];
  timeTracking: TimeTrackingPolicy;
  documentTemplates: DocumentTemplate[];
}

export interface WorkflowDefinition {
  stages: ProjectStage[];
  allowedTransitions: Array<{
    from: ProjectStage;
    to: ProjectStage;
    requiresApproval?: boolean;
    approvalRoles?: string[];
  }>;
  requiredArtifacts: Array<{
    stage: ProjectStage;
    artifacts: string[];
  }>;
}

export interface MilestoneTemplate {
  title: string;
  description?: string;
  relativeDuration: number; // in days
  requiredArtifacts: string[];
  defaultAssigneeRole?: string;
}

export interface CustomField {
  name: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'SELECT' | 'MULTISELECT';
  required: boolean;
  options?: string[]; // For SELECT/MULTISELECT
  defaultValue?: string;
}

export interface TimeTrackingPolicy {
  granularity: 'HOUR' | 'DAY' | 'WEEK';
  requireApproval: boolean;
  overheadAllowed: boolean;
  distributionRules?: DistributionRules;
}

export interface DocumentTemplate {
  name: string;
  type: string;
  template: string;
  requiredFields: string[];
}

// Example profile implementations
export const CLIENT_PROJECT_PROFILE: ProjectProfile = {
  id: 'client-project',
  name: 'Client Project',
  type: ProjectType.CLIENT_PROJECT,
  workflow: {
    stages: [
      ProjectStage.PROPOSAL,
      ProjectStage.PLANNING,
      ProjectStage.DESIGN,
      ProjectStage.IMPLEMENTATION,
      ProjectStage.REVIEW,
      ProjectStage.COMPLETED
    ],
    allowedTransitions: [
      { 
        from: ProjectStage.PROPOSAL, 
        to: ProjectStage.PLANNING,
        requiresApproval: true,
        approvalRoles: ['PROJECT_MANAGER', 'CLIENT']
      },
      // ... more transitions
    ],
    requiredArtifacts: [
      {
        stage: ProjectStage.PROPOSAL,
        artifacts: ['client_requirements', 'cost_estimate', 'timeline']
      },
      // ... more stage artifacts
    ]
  },
  defaultMilestones: [
    {
      title: 'Requirements Gathering',
      description: 'Collect and document client requirements',
      relativeDuration: 5,
      requiredArtifacts: ['requirements_doc', 'sign_off'],
      defaultAssigneeRole: 'BUSINESS_ANALYST'
    },
    // ... more milestone templates
  ],
  customFields: [
    {
      name: 'Client Contact',
      type: 'TEXT',
      required: true
    },
    {
      name: 'Contract Number',
      type: 'TEXT',
      required: true
    },
    {
      name: 'Billing Cycle',
      type: 'SELECT',
      required: true,
      options: ['WEEKLY', 'MONTHLY', 'MILESTONE']
    }
  ],
  timeTracking: {
    granularity: 'HOUR',
    requireApproval: true,
    overheadAllowed: false
  },
  documentTemplates: [
    {
      name: 'Project Proposal',
      type: 'document',
      template: 'templates/client/proposal.md',
      requiredFields: ['client_name', 'project_scope', 'timeline', 'cost']
    }
  ]
};

export const COMMUNITY_PROJECT_PROFILE: ProjectProfile = {
  id: 'community-project',
  name: 'Community Project',
  type: ProjectType.COMMUNITY_PROJECT,
  workflow: {
    stages: [
      ProjectStage.PROPOSAL,
      ProjectStage.DESIGN,
      ProjectStage.IMPLEMENTATION,
      ProjectStage.REVIEW,
      ProjectStage.COMPLETED
    ],
    allowedTransitions: [
      { 
        from: ProjectStage.PROPOSAL, 
        to: ProjectStage.DESIGN,
        requiresApproval: true,
        approvalRoles: ['COMMUNITY_MAINTAINER']
      }
    ],
    requiredArtifacts: [
      {
        stage: ProjectStage.PROPOSAL,
        artifacts: ['rfc', 'community_discussion']
      }
    ]
  },
  defaultMilestones: [
    {
      title: 'Community RFC',
      description: 'Create and discuss RFC with community',
      relativeDuration: 14,
      requiredArtifacts: ['rfc_document', 'discussion_summary']
    }
  ],
  customFields: [
    {
      name: 'Community Channel',
      type: 'TEXT',
      required: true
    },
    {
      name: 'License',
      type: 'SELECT',
      required: true,
      options: ['MIT', 'Apache-2.0', 'GPL-3.0']
    }
  ],
  timeTracking: {
    granularity: 'DAY',
    requireApproval: false,
    overheadAllowed: true
  },
  documentTemplates: [
    {
      name: 'RFC Template',
      type: 'document',
      template: 'templates/community/rfc.md',
      requiredFields: ['feature_name', 'motivation', 'design']
    }
  ]
};