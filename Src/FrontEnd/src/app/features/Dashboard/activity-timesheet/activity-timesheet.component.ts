import { Component, OnInit } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  PunchInStatus,
  Timesheets,
  TimeSheetService,
} from '../../../services/time-sheet.service';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-timesheet',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-timesheet.component.html',
  styleUrl: './activity-timesheet.component.css',
})
export class ActivityTimesheetComponent implements OnInit {
  sessionStatus: PunchInStatus | null = null;
  timeSheets: Timesheets[] = [];
  showCompleted = false;

  editFormData: {
    id: number | null;
    startTime: string | null;
    endTime: string | null;
    Hrs: number | null;
    Mins: number | null;
    remark: string | null;
  } = {
    id: null,
    startTime: null,
    endTime: null,
    Hrs: null,
    Mins: null,
    remark: null,
  };

  constructor(
    private timeSheetService: TimeSheetService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.getSession();
    // this.calculateTimeDifferences();
    const empCode = this.getEmpCode();
    if (!empCode) return;
    this.getTimesheetByEmpId(empCode);
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
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService.punchOut(empId).subscribe((res) => {
        console.log(res);
        this.getSession();
      });
    } else {
      this.showError();
    }
  }

  getSession() {
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService.getSession(empId).subscribe((res) => {
        console.log(res);
        this.sessionStatus = res;
      });
    } else {
      this.showError();
    }
  }

  getTimesheetByEmpId(empCode: string) {
    this.timeSheetService.getByCodeTimeSheet(empCode).subscribe((data) => {
      console.log('Received timesheet data:', data);
      this.timeSheets = data;
      console.log('After TimeSheets Data:', this.timeSheets);
    });
  }

  private getEmpCode() {
    const token = this.roleService.getToken();
    const decodeToken = jwtDecode(token != null ? token : '');
    const empCode = decodeToken.sub;
    if (!empCode) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Employee Code not found in token',
      });
      return null;
    }
    return empCode;
  }

  private getEmpId() {
    const token = this.roleService.getToken();
    const decodeToken = jwtDecode(token != null ? token : '');
    const empId: string | undefined = (decodeToken as any).id;
    if (!empId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Employee ID not found in token',
      });
      return null;
    }
    return Number(empId);
  }
  private showError() {
    Swal.fire({
      title: 'This should never happen',
      text: 'Employee Id does not exist. Please logout and login again',
    });
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    console.log('Toggle Completed:', this.showCompleted);
  }

  toggleEditForm(timeSheetId: number) {
    if (this.editFormData.id === timeSheetId) {
      this.editFormData = {
        id: null,
        startTime: null,
        endTime: null,
        Hrs: null,
        Mins: null,
        remark: null,
      };
      return;
    }

    this.editFormData.id = timeSheetId; // Open the form for the selected timesheet

    const timesheet = this.timeSheets.find((ts) => ts.id === timeSheetId);
    if (timesheet) {
      this.editFormData = {
        id: timesheet.id,
        startTime: this.formatForDateTimeLocal(
          timesheet.startTime ?? new Date().toISOString()
        ),
        endTime: this.formatForDateTimeLocal(
          timesheet.endTime ?? new Date().toISOString()
        ),
        Hrs: timesheet.hrs ?? null,
        Mins: timesheet.min ?? null,
        remark: timesheet.remark ?? null,
      };
    }
  }

  formatForDateTimeLocal(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onEditTimeChange() {
    if (this.editFormData.startTime && this.editFormData.endTime) {
      const start = new Date(this.editFormData.startTime).getTime();
      const end = new Date(this.editFormData.endTime).getTime();

      if (end > start) {
        const diffMins = Math.floor((end - start) / (1000 * 60));
        this.editFormData.Hrs = Math.floor(diffMins / 60);
        this.editFormData.Mins = diffMins % 60;
      } else {
        this.editFormData.Hrs = 0;
        this.editFormData.Mins = 0;
      }
    } else {
      this.editFormData.Hrs = null;
      this.editFormData.Mins = null;
    }
  }

  submitEditForm() {
    console.log('submitting');
    console.log(this.editFormData);
    if (
      this.editFormData.id &&
      this.editFormData.startTime &&
      this.editFormData.endTime &&
      this.editFormData.Hrs !== null &&
      this.editFormData.Mins !== null
    ) {
      const safeData = this.editFormData as {
        id: number;
        startTime: string;
        endTime: string;
        Hrs: number;
        Mins: number;
        remark: string | null;
      };

      console.log('updating');
      this.timeSheetService.updateTimeSheet({ timeSheet: safeData }).subscribe({
        next: () => {
          this.toggleEditForm(safeData.id);
          this.getTimesheetByEmpId(this.getEmpCode()!);
        },
      });
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please fill all fields before submitting.',
    });
  }
}
