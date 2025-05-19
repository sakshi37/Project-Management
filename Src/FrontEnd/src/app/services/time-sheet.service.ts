import { Injectable } from '@angular/core';
import { API_URL } from '../../constant';
import { HttpClient } from '@angular/common/http';
import { TimeSheetDto } from '../Models/time-sheet-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
  private url = `${API_URL}/TimeSheet`;
  constructor(private http: HttpClient) {}

  punchIn(empId: number): Observable<any> {
    return this.http.post(`${this.url}/PunchIn`, { EmpId: empId });
  }

  punchOut(empId: number): Observable<any> {
    return this.http.post(`${this.url}/PunchOut`, { EmpId: empId });
  }

  getSession(empId: number) {
    return this.http.get<PunchInStatus | null>(`${this.url}/${empId}`);
  }

  getAllTimeSheet() {
    return this.http.get<Timesheets[]>(`${this.url}/GetAllTimeSheet`);
  }
}
export type PunchInStatus = {
  id: number;
  fk_EmpId: number;
  startDate: string;
  endDate: null;
};

export type Timesheets = {
  jobId: number;
  sequence: string;
  part: string;
  activity: string;
  type: string;
  startTime: string;
  endTime: string;
  hrs: number;
  min: number;
  empId: 1;
  timeSheetStatus: boolean;
};
