export interface CreateDivisionDto {
  divisionName: string;
  projectManagerName : String;
  prefixName:string;
  manHours:number;
  fk_HolidayId:number;
  divisionStatus:boolean;
  createdBy: string;
}

