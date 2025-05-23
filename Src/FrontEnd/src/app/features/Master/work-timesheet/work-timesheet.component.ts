import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {
  EmployeeByIdName,
  EmployeeService,
} from '../../../services/employee-service';
import { CommonModule } from '@angular/common';
import {
  Timesheets,
  TimeSheetService,
} from '../../../services/time-sheet.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-timesheet',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-timesheet.component.html',
  styleUrl: './work-timesheet.component.css',
})
export class WorkTimesheetComponent implements OnInit {
  currentEmpId: number | undefined;
  closeAddTaskModal() {
    throw new Error('Method not implemented.');
  }
  toggleAddTaskForm(empId: number): void {
    this.addTaskEmpId = this.addTaskEmpId === empId ? null : empId;
  }

  taskForm!: FormGroup;
  employees: EmployeeByIdName[] = [];
  taskList: Timesheets[] = [];
  openEmpId: number | null = null;
  addTaskEmpId: number | null = null;

  selectedTaskList: Timesheets[] = [];

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.employeeService.getAllEmployeeByIdName().subscribe((res) => {
      console.log(res);
      this.employees = res;
      this.timeSheet();
    });
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      jobId: [],
      sequence: [],
      part: [],
      activity: [],
      type: [],

      empId: [],
      timeSheetStatus: [],
    });
  }
  onSubmit(empId: number) {
    if (this.taskForm.invalid) return;
    const newTaskData = { ...this.taskForm.value, empId };
    this.timesheetService
      .InsertTimesheet({ timesheet: { ...this.taskForm.value, empId } })

      .subscribe((res) => {
        console.log(res);
        this.timeSheet();
        this.taskForm.reset();
        this.addTaskEmpId = null;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Task Added successfully!',
          confirmButtonColor: '#3085d6',
        });
      });
  }

  timeSheet() {
    this.timesheetService.getAllTimeSheet().subscribe((res) => {
      console.log(res);
      this.taskList = res;
    });
  }

  toggleTaskList(empId: number) {
    if (empId === this.openEmpId) {
      this.openEmpId = null;
    } else {
      this.openEmpId = empId;
    }
  }

  checkTask(clickedTask: Timesheets) {
    const isChecked = this.selectedTaskList.find(
      (task) => task.jobId === clickedTask.jobId
    );

    if (isChecked) {
      this.selectedTaskList = this.selectedTaskList.filter(
        (task) => task.jobId !== clickedTask.jobId
      );
    } else {
      this.selectedTaskList.push(clickedTask);
    }

    console.log(this.selectedTaskList);
  }
}

type Task = {
  jobNo: number;
  sequence: string;
  part: string;
  activity: string;
  type: string;
};
