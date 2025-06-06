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
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { Employee, EmployeeFull } from '../../../Models/employee-model';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  fullEmployeeList: EmployeeFull[] = [];

  searchText: string = '';
currentUserCode: string = '';

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
    { key: 'action', label: 'Action' },
  ];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private Router: Router
  ) {}

  ngOnInit(): void {
  this.decodeToken();

    let updatedCode =
      this.Router.getCurrentNavigation()?.extras?.state?.['updatedCode'];

    if (!updatedCode) {
      updatedCode = sessionStorage.getItem('updatedCode') || undefined;
      if (updatedCode) {
        sessionStorage.removeItem('updatedCode');
      }
    }

    console.log('Updated Code from navigation or sessionStorage:', updatedCode);
    this.loadEmployees(updatedCode);
  }
  decodeToken(): void {
  const token = localStorage.getItem('token'); // or sessionStorage
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.currentUserCode = payload.sub;
  } catch (err) {
    console.error('Error decoding token:', err);
  }
}

  loadEmployees(updatedCode?: string) {
  const pageSizeToUse = updatedCode ? 1000 : this.pageSize;

  this.employeeService
    .getPagedEmployees(this.pageNumber, pageSizeToUse, this.searchText)
    .subscribe((res) => {
      this.fullEmployeeList = res.data;
      this.employees = res.data.slice(0, this.pageSize); // display only first page
      this.totalCount = res.totalCount;

      console.log('Loaded employees:', this.employees.length);
    });
}


  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  onPageChange(newPage: number) {
    const maxPage = Math.ceil(this.totalCount / this.pageSize);
    if (newPage < 1 || newPage > maxPage) {
      return; // do nothing, outside valid page range
    }
    this.pageNumber = newPage;
    this.loadEmployees();
  }

  editEmployee(emp: any): void {
    if (!emp || !emp.code) {
      console.error('Selected employee is missing code or is invalid:', emp);
      return;
    }

    console.log('Selected Employee:', emp);
    console.log('Selected Employee Code:', emp.code);
    console.log('Selected Employee Name:', emp.name);

    this.Router.navigate(['/update-employee'], {
      state: { employee: emp, employeeName: emp.name },
    });
  }

  openInactivatePopup(emp: any): void {
    this.dialog
      .open(InactivateEmployeeComponent, {
        width: '1000px',

        data: emp,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.loadEmployees();
        }
      });
  }

  openActivatePopup(emp: any): void {
    this.dialog
      .open(ActivateEmployeeComponent, {
        width: '1000px',
        data: emp,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.loadEmployees();
        }
      });
  }

  onSearch() {
    const search = this.searchText?.toLowerCase().trim();

    this.employeeService
      .getPagedEmployees(this.pageNumber, this.pageSize, search)
      .subscribe((res) => {
        this.employees = res.data.filter((emp: any) => {
          const statusText = emp.loginStatus ? 'active' : 'inactive';

          return (
            emp.code?.toLowerCase().includes(search) ||
            emp.name?.toLowerCase().includes(search) ||
            emp.branchName?.toLowerCase().includes(search) ||
            emp.designationName?.toLowerCase().includes(search) ||
            emp.divisionName?.toLowerCase().includes(search) ||
            statusText.includes(search)
          );
        });

        this.totalCount = this.employees.length;
      });
  }

  exportexceldata(): void {
    const exceldata = this.employees.map((emp, i) => {
      const row: any = {};
      this.columns.forEach((col) => {
        if (col.key === 'srNo') {
          row['Sr.No'] = (this.pageNumber - 1) * this.pageSize + i + 1;
        } else if (col.key == 'loginStatus') {
          row['Status'] = emp[col.key] ? 'Active' : 'Inactive';
        } if (col.key !== 'photo' && col.key !== 'action' && col.key !== 'image') {
  row[col.label] = emp[col.key];
}
      });
      return row;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);
    const workbook: XLSX.WorkBook = {
      Sheets: { Employees: worksheet },
      SheetNames: ['Employees'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(data, 'Visible_Employees.xlsx');
  }

  exportVisibleDataAsPDF(): void {
    const doc = new jsPDF('landscape'); // For wider tables
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header Title
    doc.setFontSize(12);
    doc.text('PAN GULF TECHNOLOGIES PVT.LTD', pageWidth / 2, 15, {
      align: 'center',
    });

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
  show() {
    Swal.fire({
      toast: true,
      position: 'top',
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool',
    });
  }
  isValidBase64(str: string): boolean {
    return (
      typeof str === 'string' &&
      str.length > 100 &&
      /^[A-Za-z0-9+/=]+$/.test(str)
    );
  }

  getSelectedEmployees(): any[] {
    return this.employees.filter((emp) => emp.selected);
  }
  // Check if all rows are selected
  areAllSelected(): boolean {
    return (
      this.employees.length > 0 && this.employees.every((emp) => emp.selected)
    );
  }

  // Select/Deselect all
  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.employees.forEach((emp) => (emp.selected = checked));
  }

  // When an individual checkbox changes
  onCheckboxChange(): void {
    // If needed, you could update some UI here
  }

  // Get selected employees
  selectedEmployees(): any[] {
    return this.employees.filter((emp) => emp.selected && emp.code);
  }

  // Delete (inactivate) selected employees
 deleteSelectedEmployees() {
  const selectedCodes = this.selectedEmployees().map((emp) => emp.code);

  if (selectedCodes.length === 0) {
    Swal.fire({
      toast: true,
      icon: 'warning',
      text: 'Please select at least one employee.',
      position: 'top',
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  // SweetAlert2 confirmation modal
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to inactivate selected employees.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Inactivate',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.inactivateEmployees(selectedCodes).subscribe({
        next: (response) => {
          const msg = response.message || '';

          // If response message contains "already inactive", show error toast and do NOT update UI
          if (msg.toLowerCase().includes('already inactive')) {
            Swal.fire({
              toast: true,
              icon: 'error',
              text: msg.trim(),
              position: 'top',
              timer: 3000,
              showConfirmButton: false,
            });
            return; // Stop here, don't update UI
          }

          // Success case — update UI and show success toast
          Swal.fire({
            toast: true,
            icon: 'success',
            text: msg.trim() || 'Employees inactivated successfully.',
            position: 'top',
            timer: 3000,
            showConfirmButton: false,
          });

          this.employees.forEach((emp) => {
            if (selectedCodes.includes(emp.code)) {
              emp.loginStatus = false;
            }
            emp.selected = false;
          });
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            toast: true,
            icon: 'error',
            text: 'Something went wrong while inactivating employees.',
            position: 'top',
            timer: 3000,
            showConfirmButton: false,
          });
        },
      });
    }
  });
}


}
