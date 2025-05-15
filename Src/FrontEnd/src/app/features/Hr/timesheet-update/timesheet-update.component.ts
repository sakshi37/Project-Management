import { Component, OnInit } from '@angular/core';
import {
  PunchInStatus,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-timesheet-update',
  imports: [],
  templateUrl: './timesheet-update.component.html',
  styleUrl: './timesheet-update.component.css',
})
export class TimesheetUpdateComponent implements OnInit {
  sessionStatus: PunchInStatus | null = null;

  constructor(private timeSheetService: TimeSheetService) {}
  ngOnInit() {
    this.getSession();
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
}
