export interface GetTeamCompositionDto {
    teamId: number;
    teamName: string;
    fk_BranchId: number;
    branchName: string;
    fk_DivisionId: number;
    divisionName: string;
    fk_TeamLeaderId: number;
    teamLeaderName: string;
    teamStatus: boolean;
}
  
