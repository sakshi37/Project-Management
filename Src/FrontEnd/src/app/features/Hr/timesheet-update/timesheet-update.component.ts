import { Component, OnInit } from '@angular/core';
import {
  PunchInStatus,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-timesheet-update',
  templateUrl: './timesheet-update.component.html',
  styleUrl: './timesheet-update.component.css',
})
export class TimesheetUpdateComponent implements OnInit {
  sessionStatus: PunchInStatus | null = null;

  constructor(
    private timeSheetService: TimeSheetService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.roleService.getEmpId();
    console.log(this.roleService.getEmpId());
    this.getSession();
  }

  punchIn() {
    const empId = this.roleService.getEmpId();
    if (empId) {
      this.timeSheetService.punchIn(Number(empId)).subscribe((res) => {
        console.log(res);
        this.getSession();
      });
    } else {
      this.showError();
    }
  }

  punchOut() {
    const empId = this.roleService.getEmpId();
    if (empId) {
      this.timeSheetService.punchOut(Number(empId)).subscribe((res) => {
        console.log(res);
        this.getSession();
      });
    } else {
      this.showError();
    }
  }

  getSession() {
    const empId = this.roleService.getEmpId();
    if (empId) {
      this.timeSheetService.getSession(Number(empId)).subscribe((res) => {
        console.log(res);
        this.sessionStatus = res;
      });
    } else {
      this.showError();
    }
  }

  private getEmpId(): number | undefined {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Missing Token',
        text: 'Token not found. Please logout and login again.',
      });
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const empId = decodedToken.empId || decodedToken.sub;

      if (!empId || isNaN(Number(empId))) {
        Swal.fire({
          title: 'Invalid Token',
          text: 'Employee Id is missing or invalid in token. Please logout and login again.',
        });
        return;
      }

      return Number(empId);
    } catch (error) {
      Swal.fire({
        title: 'Token Error',
        text: 'Failed to decode token. Please logout and login again.',
      });
      return;
    }
  }
  private showError() {
    Swal.fire({
      title: 'This should never happen',
      text: 'Employee Id does not exist. Please logout and login again',
    });
  }
}
