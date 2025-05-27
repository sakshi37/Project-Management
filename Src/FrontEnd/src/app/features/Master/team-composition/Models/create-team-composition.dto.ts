export interface CreateTeamCompositionDto {
    teamName: string;
    fk_BranchId: number;
    fk_DivisionId: number;
    fk_TeamLeaderId: number;
    teamMembers: number[];
    createdBy: number;
}
  