import { Injectable } from '@angular/core';
import { API_URL } from '../../constant';
import { HttpClient } from '@angular/common/http';
import { TimeSheetDto } from '../Models/attendance-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
  private url = `${API_URL}/TimeSheet`;
  private diffUrl = `${API_URL}/Project`;
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

  getByCodeTimeSheet(empCode: string) {
    return this.http.get<Timesheets[]>(`${this.url}/timesheet/${empCode}`);
  }

  InsertTimesheet(timeSheet: { timesheet: Timesheets }) {
    console.log(timeSheet);
    return this.http.post(`${this.url}`, timeSheet);
  }

  GetAllProject(empId: number) {
    return this.http.get<ProjectWithStack[]>(
      `${this.diffUrl}/GetAllProject/${empId}`
    );
  }

  InserProject(project: Project & { fk_TeamLeaderId: number }) {
    return this.http.post<Project>(`${this.diffUrl}`, project);
  }

  getAllStack() {
    return this.http.get<Stack[]>(`${this.diffUrl}/GetAllStack`);
  }


updateTaskTimeSheet(data: UpdateTaskTimeSheetDto): Observable<any> {
  return this.http.put(`${this.url}/update`, data);
}

  updateTimeSheet(timeSheet: {
    timeSheet: {
      id: number;
      startTime: string;
      endTime: string;
      Hrs: number;
      Mins: number;
    };
  }) {
    return this.http.patch(this.url, timeSheet);
  }
}
export type PunchInStatus = {
  id: number;
  fk_EmpId: number;
  startDate: string;
  endDate: null;
};

export type Timesheets = {
  id: number;
  projectId: number;
  sequence: string | null;
  part: string | null;
  activity: string | null;
  type: string | null;
  startTime: string;
  endTime: string | null;
  hrs: number | null;
  min: number | null;
  empId: number | null;
  timeSheetStatus: boolean | null;
  code: string;
  remark:string;
};

export type ProjectWithStack = {
  id: number;
  name: string;
  teamLeaderId: number;
  teamLeaderName: string;
  stack: { id: number; name: string }[];
};

export type Project = {
  StackIds: number[];
  Name: string;
};

export type Stack = {
  // stack: Stack[];
  id: number;
  name: String;
};

export interface UpdateTaskTimeSheetDto{
   id: number;
  sequence: string;
  part: string;
  activity: string;
  type: string;
  fk_EmpId: number;
}