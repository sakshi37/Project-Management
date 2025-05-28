import { Component, OnInit } from '@angular/core';
import {
  PunchInStatus,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

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
}
