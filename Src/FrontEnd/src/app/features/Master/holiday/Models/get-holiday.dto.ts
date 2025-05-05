
export interface GetHolidayDto {
    holidayId: number;
    holidayName: string;
    holidayDate: string;
    holidayListType: boolean;
    year: number;
    holidayStatus: boolean;
    dayName?: string;
    formattedDate?: string;
  }
  