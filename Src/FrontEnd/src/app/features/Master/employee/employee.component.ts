import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivateEmployeeComponent } from './activate-employee/activate-employee.component';
import { InactivateEmployeeComponent } from './inactivate-employee/inactivate-employee.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'
import { Router, RouterModule } from '@angular/router';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  
  searchText: string = '';



  columns = [
    { key: 'srNo', label: 'Sr. No.' },
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Employee Name' },
    { key: 'code', label: 'Employee Code' },
    { key: 'designationName', label: 'Designation' },
    { key: 'branchName', label: 'Branch' },
    { key: 'divisionName', label: 'Division' },
    { key: 'userGroupName', label: 'User Group' },
    { key: 'loginStatus', label: 'Status' },
    { key: 'action', label: 'Action' }
  ];

  constructor(private employeeService: EmployeeService,private dialog: MatDialog,private router: Router) {}


  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getPagedEmployees(this.pageNumber, this.pageSize, this.searchText)
.subscribe(res => {
      this.employees = res.data;
      this.totalCount = res.totalCount;
    });
  }

  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > Math.ceil(this.totalCount / this.pageSize)) return;
    this.pageNumber = newPage;
    this.loadEmployees();
  }

  editEmployee(emp: any): void {
    console.log('Selected Employee:', emp);  
    console.log('Selected Employee Code:', emp.code); 
  
    this.router.navigate(['/update-employee'], {
      queryParams: { code: emp.code }  
    });
  }
  
  

  openInactivatePopup(emp: any): void {
    this.dialog.open(InactivateEmployeeComponent
      , {
      width: '1000px',
     
      data: emp
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.loadEmployees(); 
      }
    });
  }


  openActivatePopup(emp: any): void {
    this.dialog.open(ActivateEmployeeComponent, {
      width: '1000px',
      data: emp
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.loadEmployees();
      }
    });
  }
  
  onSearch() {
    this.employeeService.getPagedEmployees(this.pageNumber, this.pageSize)
      .subscribe(res => {
        const search = this.searchText?.toLowerCase().trim();
  
        this.employees = res.data.filter((emp: {
          code: string,
          name: string,
          branchName: string,
          designationName: string,
          divisionName:string
        }) =>
          emp.code?.toLowerCase().includes(search) ||
          emp.name?.toLowerCase().includes(search) ||
          emp.branchName?.toLowerCase().includes(search) ||
          emp.designationName?.toLowerCase().includes(search)||
          emp.divisionName?.toLowerCase().includes(search)
        );
        
  
        this.totalCount = this.employees.length;
      });
  }
  
    exportexceldata():void{
 const exceldata=this.employees.map((emp,i)=>{
  const row:any ={};
  this.columns.forEach(col=>{
    if (col.key==="srNo"){
      row['Sr.No']=(this.pageNumber-1)*this.pageSize+i+1;
    }
    else if(col.key=='loginStatus'){       
       row['Status'] = emp[col.key] ? 'Active' : 'Inactive';
    }
    else if (col.key !== 'photo' && col.key !== 'action') {
      row[col.label] = emp[col.key];
    }

  });
  return row;
 });
 
 const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);
 const workbook: XLSX.WorkBook = { Sheets: { 'Employees': worksheet }, SheetNames: ['Employees'] };
 const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

 const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
saveAs(data, 'Visible_Employees.xlsx');
  }

  exportVisibleDataAsPDF(): void {
    const doc = new jsPDF('landscape'); // For wider tables
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Header Title
    doc.setFontSize(12);
    doc.text('PAN GULF TECHNOLOGIES PVT.LTD', pageWidth / 2, 15, { align: 'center' });
  
    doc.setFontSize(10);
    doc.text('Employee List Report', pageWidth / 2, 22, { align: 'center' });
  
    // Page No.
    doc.setFontSize(10);
    doc.text(`PAGE 1 of 1`, pageWidth - 30, 15);
  
    // Table Headers
    const tableHeaders = [
      [
        'SR. NO.',
        'Employee Name',
        'Employee Code',
        'Designation Name',
        'Branch Name',
        'Division Name',
        'Employee Type',
        'Login Status',
      ],
    ];
  
    // Table Data (Only visible employees)
    const tableRows = this.employees.map((emp, i) => [
      (this.pageNumber - 1) * this.pageSize + i + 1,
      emp.name,
      emp.code,
      emp.designationName,
      emp.branchName,
      emp.divisionName,
      emp.employeeType,
      emp.loginStatus ? 'Active' : 'Inactive',
    ]);
  
    // Draw Table
    autoTable(doc, {
      head: tableHeaders,
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Sr. No.
        1: { cellWidth: 35 }, // Emp Name
        // Add other column widths if needed
      },
    });
  
    // Save
    doc.save('Employee_List_Report.pdf');
  }
 show(){
  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
 }
 isValidBase64(str: string): boolean {
  return typeof str === 'string' && str.length > 100 && /^[A-Za-z0-9+/=]+$/.test(str);
}

 
}

