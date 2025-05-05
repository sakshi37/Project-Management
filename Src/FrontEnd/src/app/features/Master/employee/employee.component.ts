import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/employee-model';
import { EmployeeService } from '../../../services/employee-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivateEmployeeComponent } from './activate-employee/activate-employee.component';
import { InactivateEmployeeComponent } from './inactivate-employee/inactivate-employee.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;

  searchText: string = '';

  columns = [
    { key: 'srNo', label: 'Sr. No.' },
    { key: 'photo', label: 'Photo' },
    { key: 'employeeName', label: 'Name' },
    { key: 'employeeCode', label: 'Code' },
    { key: 'designationName', label: 'Designation' },
    { key: 'branchName', label: 'Branch' },
    { key: 'divisionName', label: 'Division' },
    { key: 'userGroupName', label: 'User Group' },
    { key: 'loginStatus', label: 'Status' },
    { key: 'action', label: 'Action' },
  ];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService
      .getPagedEmployees(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.employees = res.data;
        this.totalCount = res.totalCount;
      });
  }

  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > Math.ceil(this.totalCount / this.pageSize))
      return;
    this.pageNumber = newPage;
    this.loadEmployees();
  }

  editEmployee(emp: any): void {
    // Implement the logic to edit an employee
    console.log('Editing employee:', emp);
    // You can navigate to another page or open a modal to edit the employee
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
    this.dialog.open(ActivateEmployeeComponent, {
      width: '1000px',

      data: emp,
    });
  }
  onSearch() {
    this.employeeService
      .getPagedEmployees(this.pageNumber, this.pageSize, this.searchText)
      .subscribe((res) => {
        this.employees = res.data;
        this.totalCount = res.totalCount;
      });
  }
}
