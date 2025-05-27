import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {
  EmployeeByIdName,
  EmployeeService,
} from '../../../services/employee-service';
import { CommonModule } from '@angular/common';
import {
  ProjectWithStack,
  Stack,
  Timesheets,
  TimeSheetService,
} from '../../../services/time-sheet.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-timesheet',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './work-timesheet.component.html',
  styleUrl: './work-timesheet.component.css',
})
export class WorkTimesheetComponent implements OnInit {
  toggleAddProjectForm() {
    throw new Error('Method not implemented.');
  }
  currentEmpId: number | undefined;
  sessionStatus: any;
  showAddProjectForm: boolean | undefined;
  // closeAddTaskModal() {
  //   throw new Error('Method not implemented.');
  // }
  toggleAddTaskForm(projectId: number): void {
    this.addTaskProjectId =
      this.addTaskProjectId === projectId ? null : projectId;
  }

  taskForm!: FormGroup;
  projectForm!: FormGroup;
  employees: EmployeeByIdName[] = [];
  taskList: Timesheets[] = [];
  openProjectId: number | null = null;
  addTaskProjectId: number | null = null;
  projects: ProjectWithStack[] = [];
  stacks: Stack[] = [];
  selectedTaskList: Timesheets[] = [];

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initProjectForm();
    this.employeeService.getAllEmployeeByIdName().subscribe((res) => {
      console.log(res);
      this.employees = res;
    });

    this.timeSheet();
    this.getAllProject();
    this.getAllStack();
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
  onSubmit(projectId: number) {
    console.log(this.taskForm.value);
    if (this.taskForm.invalid) return;

    this.timesheetService
      .InsertTimesheet({
        timesheet: { ...this.taskForm.value, projectId },
      })

      .subscribe((res) => {
        console.log(res);
        this.timeSheet();
        this.taskForm.reset();
        this.addTaskProjectId = null;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Task Added successfully!',
          confirmButtonColor: '#3085d6',
        });
      });
  }

  initProjectForm(): void {
    this.projectForm = this.fb.group({
      Name: [''],
      StackIds: [[]],
    });
  }

  onProjectSubmit() {
    console.log(this.projectForm.value);
    if (this.projectForm.invalid) return;

    this.timesheetService
      .InserProject(this.projectForm.value)
      .subscribe((res) => {
        console.log('Project Inserted:', res);
        this.getAllProject();
        this.projectForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Project Added successfully!',
          confirmButtonColor: '#3085d6',
        });
      });
  }
  getAllProject() {
    this.timesheetService.GetAllProject().subscribe((res) => {
      console.log(res);
      this.projects = res;
    });
  }

  getAllStack() {
    this.timesheetService.getAllStack().subscribe((res) => {
      console.log(res);
      this.stacks = res;
      console.log('Stacks:', this.stacks);
    });
  }
  timeSheet() {
    this.timesheetService.getAllTimeSheet().subscribe((res) => {
      console.log(res);
      this.taskList = res;
    });
  }

  toggleTaskList(empId: number) {
    if (empId === this.openProjectId) {
      this.openProjectId = null;
    } else {
      this.openProjectId = empId;
    }
  }

  checkTask(clickedTask: Timesheets) {
    const isChecked = this.selectedTaskList.find(
      (task) => task.projectId === clickedTask.projectId
    );

    if (isChecked) {
      this.selectedTaskList = this.selectedTaskList.filter(
        (task) => task.projectId !== clickedTask.projectId
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
