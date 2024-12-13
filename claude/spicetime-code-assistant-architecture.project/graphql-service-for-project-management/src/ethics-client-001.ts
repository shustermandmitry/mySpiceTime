// packages/services/project-management/src/infrastructure/clients/ethics/types.ts
export interface EthicsRating {
  memberId: string;
  openness: number;
  respect: number;
  accountability: number;
  timestamp: string;
  categoryScores: CategoryScore[];
}

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
}

export interface EthicsRequirement {
  minimumOverallScore: number;
  categoryThresholds: Array<{
    category: string;
    minimumScore: number;
  }>;
}

// packages/services/project-management/src/infrastructure/clients/ethics/client.ts
export class EthicsServiceClient {
  constructor(
    private baseUrl: string,
    private config: ServiceConfig
  ) {}

  async getBulkRatings(params: {
    threshold: number;
    roles: string[];
  }): Promise<{
    qualifiedMembers: Array<{
      memberId: string;
      ratings: EthicsRating;
    }>;
  }> {
    // Implementation will call ethics service
    throw new Error('Not implemented');
  }

  async getMemberSnapshot(memberId: string): Promise<EthicsRating> {
    throw new Error('Not implemented');
  }

  async getTeamEthicsReport(memberIds: string[]): Promise<{
    teamScore: number;
    memberScores: Record<string, EthicsRating>;
  }> {
    throw new Error('Not implemented');
  }
}