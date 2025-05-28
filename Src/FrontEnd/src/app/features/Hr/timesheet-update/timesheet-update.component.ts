import { Component, OnInit } from '@angular/core';
import {
  PunchInStatus,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';
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

  private showError() {
    Swal.fire({
      title: 'This should never happen',
      text: 'Employee Id does not exist. Please logout and login again',
    });
  }
}
