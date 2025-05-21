import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAttendanceReportDtoService } from '../features/Hr/employee-attendance-report/Model/get-attendance-report-dto.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetAttendanceReportService {
private apiUrl ="https://localhost:7292/api/EmployeeAttendanceReport";

  constructor(private http:HttpClient) { }
  getAttendanceReports(): Observable<GetAttendanceReportDtoService[]>{
    return this.http.get<GetAttendanceReportDtoService[]>(this.apiUrl);
  }
  getEARByDivisionName(divisionName:string):Observable<GetAttendanceReportDtoService[]>{
    return this.http.get<GetAttendanceReportDtoService[]>(`${this.apiUrl}/DivisionName?divisionName=${divisionName}`);
  }
  getEAREmployeeName(employeeName:string):Observable<GetAttendanceReportDtoService[]>{
    return this.http.get<GetAttendanceReportDtoService[]>(`${this.apiUrl}/EmployeeName?employeeName=${employeeName}`);
  }
  
}
