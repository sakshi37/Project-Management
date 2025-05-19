import { Component, OnInit } from '@angular/core';
import {
  PunchInStatus,
  Timesheets,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activity-timesheet',
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-timesheet.component.html',
  styleUrl: './activity-timesheet.component.css',
})
export class ActivityTimesheetComponent implements OnInit {
  sessionStatus: PunchInStatus | null = null;
  timeSheets: Timesheets[] = [];
  constructor(private timeSheetService: TimeSheetService) {}
  ngOnInit() {
    this.getSession();
    this.getAttendance();
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
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService.punchIn(empId).subscribe((res) => {
        console.log(res);
        this.getSession();
      });
    }
  }
  punchOut() {
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService.punchOut(empId).subscribe((res) => {
        console.log(res);
        this.getSession();
      });
    }
  }
  getSession() {
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService.getSession(empId).subscribe((res) => {
        console.log(res);

        this.sessionStatus = res;
      });
    }
  }
  private getEmpId() {
    const empId = localStorage.getItem('empId');

    if (empId === null || empId === '' || isNaN(Number(empId))) {
      Swal.fire({
        title: 'This should never happen',
        text: 'Employee Id does not exist. Please logout and login again',
      });
      return;
    }
    return Number(empId);
  }

  getAttendance() {
    this.timeSheetService.getAllTimeSheet().subscribe((data) => {
      console.log(data);
      console.log('TimeSheets Data:', this.timeSheets);

      this.timeSheets = data;
    });
  }
}
