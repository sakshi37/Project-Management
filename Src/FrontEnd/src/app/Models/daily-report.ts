export interface MissPushOutModel {
  code: string;
  name: string;
  departmentName: string;
  startDate: string;
  endDate: string | null;
}

export interface HalfDayModel extends MissPushOutModel {
  totalHours: number;
}