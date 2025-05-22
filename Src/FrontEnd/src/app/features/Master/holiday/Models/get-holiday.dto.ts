
export interface GetHolidayDto {
    holidayId: number;
    holidayName: string;
    holidayDate: string;
    holidayListType: boolean;
    year: number;
    holidayStatus: boolean;
    imagePath?: string;
    dayName?: string;
    formattedDate?: string;
  }
  