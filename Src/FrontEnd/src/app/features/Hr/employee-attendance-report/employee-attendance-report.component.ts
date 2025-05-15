import { Component, OnInit } from '@angular/core';
import { DivisionService } from '../../../services/division.service';
import { GetDivisionDto } from '../../Master/settings/division/division/Models/get-division.dto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeFull, EmployeeModel } from '../../../Models/employee-model';
import { EmployeeService } from '../../../services/employee-service';

@Component({
  selector: 'app-employee-attendance-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-attendance-report.component.html',
  styleUrl: './employee-attendance-report.component.css'
})
export class EmployeeAttendanceReportComponent implements OnInit {
  divisions: GetDivisionDto[] = [];
  teamLeaders: any[] = [];
  employees: any[] = [];
  reportTypes: number = 0;
  constructor(private divisionService:DivisionService,
              private employeeService:EmployeeService
  ) { }
  ngOnInit() {
    this.getDivisions();
    this.getTLs();
    this.getEmployees();
   }

  getDivisions(): void {
    this.divisionService.getAllDivisions().subscribe((data) => {
      console.log("Raw divisions from API:", data);

      this.divisions = data.filter(d => !!d.divisionName);
      console.log('Divisions', this.divisions);
      
    });
  }
  getTLs(): void {
    this.employeeService.getTeamLeaders().subscribe((data) => {
        this.teamLeaders = data;
        console.log('TLs', this.teamLeaders);
        
    });
  }
  getEmployees(): void {
    this.employeeService.getPagedEmployees(1, 100).subscribe((data) => {
        this.employees = data.data;
        console.log('Employees', this.employees);
        
    });
  }
}
