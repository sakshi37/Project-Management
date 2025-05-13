
export interface UpdateDivisionDto {
  divisionId: number;
  divisionName: string;
  projectManagerName: string;
  prefixName: string;
  fk_HolidayId: number;
  manHours: number;
  divisionStatus: boolean;
  updatedBy: string;
}
