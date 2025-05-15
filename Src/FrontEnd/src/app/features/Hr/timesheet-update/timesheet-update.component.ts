import { Component } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timesheet-update',
  imports: [],
  templateUrl: './timesheet-update.component.html',
  styleUrl: './timesheet-update.component.css',
})
export class TimesheetUpdateComponent {
  constructor(private timeSheetService: TimeSheetService) {}

  punchIn() {
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService.punchIn(empId).subscribe((res) => console.log(res));
    }
  }
  punchOut() {
    const empId = this.getEmpId();
    if (empId) {
      this.timeSheetService
        .punchOut(empId)
        .subscribe((res) => console.log(res));
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
