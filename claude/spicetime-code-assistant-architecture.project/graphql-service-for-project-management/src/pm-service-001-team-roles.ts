// packages/services/project-management/src/domain/types/spicetime.ts
export interface TeamMemberRole {
  roleId: string;
  memberId: string;
  roleType: string;
  requiredLevel: string;
  assignedAt: string;
}

// Extension to existing SpiceTimeProject interface
interface SpiceTimeProjectTeamExtension {
  teamRoles: TeamMemberRole[];
}

export type SpiceTimeProject = SpiceTimeProject & SpiceTimeProjectTeamExtension;