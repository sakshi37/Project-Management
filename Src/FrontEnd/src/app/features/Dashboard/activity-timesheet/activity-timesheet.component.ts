import { Component, OnInit } from '@angular/core';
import {
  PunchInStatus,
  Timesheets,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-activity-timesheet',
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-timesheet.component.html',
  styleUrl: './activity-timesheet.component.css',
})
export class ActivityTimesheetComponent implements OnInit {
  sessionStatus: PunchInStatus | null = null;
  timeSheets: Timesheets[] = [];

  constructor(
    private timeSheetService: TimeSheetService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.getSession();
    this.getTimesheetByEmpId();
    this.calculateTimeDifferences();
  }

  calculateTimeDifferences() {
    this.timeSheets.forEach((timesheet) => {
      if (timesheet.startTime && timesheet.endTime) {
        const diffMs =
          new Date(timesheet.endTime).getTime() -
          new Date(timesheet.startTime).getTime();

        if (diffMs > 0) {
          const diffMins = Math.floor(diffMs / (1000 * 60));
          timesheet.hrs = Math.floor(diffMins / 60);
          timesheet.min = diffMins % 60;
        } else {
          timesheet.hrs = 0;
          timesheet.min = 0;
        }
      }
    });
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

  getTimesheetByEmpId() {
    const empId = this.roleService.getEmpId();
    if (!empId) {
      this.showError();
      return;
    }
    this.timeSheetService.getByIdTimeSheet(Number(empId)).subscribe((data) => {
      console.log('Received timesheet data:', data);
      this.timeSheets = data;
      console.log('After TimeSheets Data:', this.timeSheets);
    });
  }

  private showError() {
    Swal.fire({
      title: 'This should never happen',
      text: 'Employee Id does not exist. Please logout and login again',
    });
  }
}
