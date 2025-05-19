import { Component, OnInit } from '@angular/core';
import { DivisionService } from '../../../services/division.service';
import { GetDivisionDto } from '../../Master/settings/division/division/Models/get-division.dto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeFull, EmployeeModel } from '../../../Models/employee-model';
import { EmployeeService } from '../../../services/employee-service';
import { GetAttendanceReportService } from '../../../services/get-attendance-report.service';
import { GetAttendanceReportDtoService } from './Model/get-attendance-report-dto.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-employee-attendance-report',
  imports: [CommonModule, FormsModule,NgxPaginationModule,],
  templateUrl: './employee-attendance-report.component.html',
  styleUrl: './employee-attendance-report.component.css',
  

})
export class EmployeeAttendanceReportComponent implements OnInit {
  [x: string]: any;
  divisions: GetDivisionDto[] = [];
  teamLeaders: any[] = [];
  employees: any[] = [];
  employeeNames:any[] =[];
  attendanceReports:GetAttendanceReportDtoService[]=[];
  filteredattendanceReports: any[] = [];
  itemsPerPage: number = 5; 
  currentPage: number = 1;
  reportTypes: number = 0;
  constructor(private divisionService:DivisionService,
              private employeeService:EmployeeService,
              private getAttendanceReportService : GetAttendanceReportService
  ) { }
  ngOnInit() {
    this.getDivisions();
    this.getTLs();
    this.getEmployees();
      this.getAttendanceReports();
   }

  getDivisions(): void {
    this.divisionService.getAllDivisions().subscribe((data) => {
      // console.log("Raw divisions from API:", data);

      this.divisions = data.filter(d => !!d.divisionName);
      // console.log('Divisions', this.divisions);
      
    });
  }
  getTLs(): void {
    this.employeeService.getTeamLeaders().subscribe((data) => {
        this.teamLeaders = data;
        // console.log('TLs', this.teamLeaders);
        
    });
  }
  getEmployees(): void {
    this.employeeService.getPagedEmployees(1, 100).subscribe((data) => {
        this.employees = data.data;
        // console.log('Employees', this.employees);
        
    });
  }
  
  getAttendanceReports(){
    // console.log(this.reportTypes);
    if (this.reportTypes == 1) {
      this.getAttendanceReportService.getAttendanceReports().subscribe({
        next: (response: GetAttendanceReportDtoService[]) => {
          this.attendanceReports = response;
          // console.log(response);
        }, error: (error) => {
          console.error(error.error);
        }
      })
    }
  }
  selectedDivisionName:string = ""
  getEARByDivisionName(){
    
    if(this.reportTypes == 2){
      this.getAttendanceReportService.getEARByDivisionName(this.selectedDivisionName).subscribe({
        next:(response:GetAttendanceReportDtoService[])=>{
          this.attendanceReports = response;
          // console.log(response);
        },error:(error) =>{
          console.error(error.error);
        }
      })
    }
  }
}
