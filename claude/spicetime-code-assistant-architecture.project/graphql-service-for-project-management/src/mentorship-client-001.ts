// packages/services/project-management/src/infrastructure/clients/mentorship/types.ts
export interface MentorshipRequirement {
  requiresMentor: boolean;
  mentorSkillLevel?: string;
  mentorshipDuration?: number;
  specificMentors?: string[];
}

export interface MentorshipSession {
  mentorId: string;
  menteeId: string;
  scheduledAt: string;
  duration: number;
  focusAreas: string[];
}

export interface MentorshipStatus {
  roleId: string;
  memberId: string;
  mentorId?: string;
  startedAt?: string;
  lastSessionAt?: string;
  nextSession?: MentorshipSession;
  progress: {
    completedSessions: number;
    plannedSessions: number;
    currentFocus: string[];
  };
}

// packages/services/project-management/src/infrastructure/clients/mentorship/client.ts
export class MentorshipServiceClient {
  constructor(
    private baseUrl: string,
    private config: ServiceConfig
  ) {}

  async getAvailableMentors(requirements: MentorshipRequirement): Promise<Array<{
    mentorId: string;
    matchScore: number;
    availability: Array<{
      startTime: string;
      endTime: string;
      timeZone: string;
    }>;
    specializations: string[];
  }>> {
    throw new Error('Not implemented');
  }

  async setupMentorship(params: {
    memberId: string;
    roleType: string;
    requirements: MentorshipRequirement;
  }): Promise<MentorshipStatus> {
    throw new Error('Not implemented');
  }

  async getTeamMentorshipStatus(team: {
    members: Array<{ id: string }>;
  }): Promise<Record<string, MentorshipStatus>> {
    throw new Error('Not implemented');
  }
}