import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Attendance,
  AttendanceService,
} from '../../../../services/attendance.service';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, RouterModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  attendance: Attendance[] = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.attendanceService.GetAllAttendance().subscribe((data) => {
      console.log(data);
      this.attendance = data;
    });
  }
}
