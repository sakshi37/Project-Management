export interface UpdateTeamCompositionDto {
    teamId: number | null; 
    teamName: string; 
    fk_BranchId: number; 
    fk_DivisionId: number; 
    fk_TeamLeaderId: number; 
    teamStatus: boolean; 
    updatedBy: number;
    teamMembers: number[];

}
