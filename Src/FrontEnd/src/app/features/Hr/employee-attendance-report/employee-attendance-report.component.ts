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
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ParticularEmployeeService } from './Model/particular-employee.service';
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
  filteredattendanceReports: GetAttendanceReportDtoService[] = [];
  // praticularEmployeeReports:ParticularEmployeeService[] = [];
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
        console.log('TLs', this.teamLeaders);
        
    });
  }
  getEmployees(): void {
    this.employeeService.getPagedEmployees(1, 100).subscribe((data) => {
        this.employees = data.data;
        console.log('Employees', this.employees);
        
    });
  }
  
  getAttendanceReports(){
    // console.log(this.reportTypes);
    if (this.reportTypes == 1) {
      this.getAttendanceReportService.getAttendanceReports().subscribe({
        next: (response: GetAttendanceReportDtoService[]) => {
          this.attendanceReports = response;
          // console.log(this.attendanceReports);
          this.filteredattendanceReports = this.attendanceReports;
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
        this.filteredattendanceReports = this.attendanceReports;
          // console.log(response);
        },error:(error) =>{
          console.error(error.error);
        }
      })
    }
  }

  selectedEmployeeId:number = 0
  getEARByTLName(){
    if(this.reportTypes==3){
this.getAttendanceReportService.getEARByTLName(this.selectedEmployeeId).subscribe({
  next:(response:GetAttendanceReportDtoService[])=>{
    this.attendanceReports = response;
    this.filteredattendanceReports = this.attendanceReports;
    console.log("Hello")
  },error:(error) =>{
    console.error('Error', error.error);
    console.error('Error Message', error.error.message);
  }
})
}
}

  selectedEmployeeName:string =""
  getEAREmployeeName(){
    if(this.reportTypes==4){
    this.getAttendanceReportService.getEAREmployeeName(this.selectedEmployeeName).subscribe({
      next:(response:GetAttendanceReportDtoService[])=>{
        this.attendanceReports = response;
        this.filteredattendanceReports = this.attendanceReports;
        console.log(response);
      },error:(error)=>{
        console.error(error.error);
      }
    })
  }
  // selectedDivisionName:string = ""
  // getEARByDivisionName(){
    
  //   if(this.reportTypes == 2){
  //     this.getAttendanceReportService.getEARByDivisionName(this.selectedDivisionName).subscribe({
  //       next:(response:GetAttendanceReportDtoService[])=>{
  //         this.attendanceReports = response;
  //       this.filteredattendanceReports = this.attendanceReports;
  //         // console.log(response);
  //       },error:(error) =>{
  //         console.error(error.error);
  //       }
  //     })
  //   }
  // }
  
}

fromDate: string = '';
toDate: string = '';

filterByDate(): void {
  if (!this.fromDate || !this.toDate) {
    alert('Please select both From and To dates.');
    return;
  }

  if (this.fromDate > this.toDate) {
    alert('From date cannot be after To date.');
    return;
  }

  this.filteredattendanceReports = this.attendanceReports.filter(report => {
    const reportDate = report.inTime?.toString().split('T')[0];
    return reportDate >= this.fromDate && reportDate <= this.toDate;
  });

  if (this.filteredattendanceReports.length === 0) {
    alert('No records found in the selected date range.');
  }
}
resetDateFilter(): void {
  this.filteredattendanceReports = [...this.attendanceReports];
  this.fromDate = '';
  this.toDate = '';
}
exportToExcel(): void {
    const element = document.getElementById('Table_id'); // your table id
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet1': worksheet },
      SheetNames: ['Sheet1']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'table-data.xlsx');
  }

}


