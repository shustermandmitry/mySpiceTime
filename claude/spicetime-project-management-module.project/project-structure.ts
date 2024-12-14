// packages/services/project-management/package.json
{
  "name": "@spicetime/project-management",
  "version": "0.1.0",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {
    "@spicetime/core": "workspace:*",
    "graphql": "^16.8.1",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "typescript": "^5.3.3",
    "vitest": "^1.2.1",
    "@spicetime/eslint-config": "workspace:*",
    "@spicetime/tsconfig": "workspace:*"
  }
}

// packages/services/project-management/src/domain/types.ts
export interface Project {
  id: string;
  name: string;
  description?: string;
  stage: ProjectStage;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStage {
  PROPOSAL = 'PROPOSAL',
  PLANNING = 'PLANNING',
  IMPLEMENTATION = 'IMPLEMENTATION',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED'
}

export interface TeamMember {
  id: string;
  roles: string[];
  joinedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: MilestoneStatus;
}

export enum MilestoneStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

// packages/services/project-management/src/domain/repositories.ts
export interface ProjectRepository {
  create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  update(id: string, project: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
}

export interface TeamMemberRepository {
  addToProject(projectId: string, member: Omit<TeamMember, 'joinedAt'>): Promise<TeamMember>;
  removeFromProject(projectId: string, memberId: string): Promise<void>;
  findByProjectId(projectId: string): Promise<TeamMember[]>;
}

// packages/services/project-management/src/infrastructure/nextcloud/nextcloud-adapter.ts
export class NextCloudAdapter implements ProjectRepository, TeamMemberRepository {
  constructor(private readonly nextCloudClient: any) {} // We'll properly type this later

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    // Implementation will come later
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<Project | null> {
    throw new Error('Not implemented');
  }

  async findAll(): Promise<Project[]> {
    throw new Error('Not implemented');
  }

  async update(id: string, project: Partial<Project>): Promise<Project> {
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async addToProject(projectId: string, member: Omit<TeamMember, 'joinedAt'>): Promise<TeamMember> {
    throw new Error('Not implemented');
  }

  async removeFromProject(projectId: string, memberId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async findByProjectId(projectId: string): Promise<TeamMember[]> {
    throw new Error('Not implemented');
  }
}

// packages/services/project-management/src/services/project-service.ts
export class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly teamMemberRepo: TeamMemberRepository
  ) {}

  async createProject(data: {
    name: string;
    description?: string;
    stage?: ProjectStage;
  }): Promise<Project> {
    return this.projectRepo.create({
      name: data.name,
      description: data.description,
      stage: data.stage || ProjectStage.PROPOSAL
    });
  }

  async getProject(id: string): Promise<Project | null> {
    return this.projectRepo.findById(id);
  }

  async updateProjectStage(id: string, stage: ProjectStage): Promise<Project> {
    return this.projectRepo.update(id, { stage });
  }

  async addTeamMember(projectId: string, memberId: string, roles: string[]): Promise<TeamMember> {
    return this.teamMemberRepo.addToProject(projectId, { id: memberId, roles });
  }

  async getProjectTeam(projectId: string): Promise<TeamMember[]> {
    return this.teamMemberRepo.findByProjectId(projectId);
  }
}
