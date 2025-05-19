import { Injectable } from '@angular/core';
import { API_URL } from '../../constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  url = API_URL;
  constructor(private http: HttpClient) {}
  GetAllAttendance() {
    return this.http.get<Attendance[]>(
      `${this.url}/TimeSheet/GetAllAttendance`
    );
  }
}

export type Attendance = {
  fk_EmpId: number;
  startDate: string;
  endDate: null;
};
