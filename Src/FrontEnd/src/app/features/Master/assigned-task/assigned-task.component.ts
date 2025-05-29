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
import { GetAttendanceReportDtoService } from '../../Hr/employee-attendance-report/Model/get-attendance-report-dto.service';
import { GetAttendanceReportService } from '../../../services/get-attendance-report.service';
import { RoleService } from '../../../services/role.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { EmployeeModel } from '../../../Models/employee-model';

@Component({
  selector: 'app-work-timesheet',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './assigned-task.component.html',
  styleUrl: './assigned-task.component.css',
})
export class AssignedTaskComponent implements OnInit {
  currentEmpId: number | undefined;
  sessionStatus: any;
  showAddProjectForm: boolean | undefined;

  toggleAddTaskForm(projectId: number): void {
    if (this.addTaskProjectId === projectId) {
      this.addTaskProjectId = null;
    } else {
      this.addTaskProjectId = projectId;
      this.openProjectId = null; // Close the task list when opening the add task form
    }
  }

  taskForm!: FormGroup;
  projectForm!: FormGroup;
  employees: EmployeeByIdName[] = [];
  taskList: Timesheets[] = [];
  openProjectId: number | null = null;
  addTaskProjectId: number | null = null;
  projects: ProjectWithStack[] = [];
  stacks: Stack[] = [];

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    console.log(this.roleService.getUserRole(), 'Role');

    this.initForm();
    this.initProjectForm();
    console.log(this.roleService.getUserRole(), 'Role');

    const token = this.roleService.getToken();
    const decodeToken = jwtDecode<JwtPayload>(token != null ? token : '');
    const empId: string | undefined = (decodeToken as any).id;
    console.log(decodeToken);

    if (empId) {
      this.employeeService
        .getAllEmployeeByIdName(Number(empId))
        .subscribe((res) => {
          console.log('res', res);
          this.employees = res;
        });

      this.getAllProject(Number(empId));
    }

    this.timeSheet();
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

  getAllProject(empId: number) {
    this.timesheetService.GetAllProject(empId).subscribe((res) => {
      console.log(res);
      this.projects = res;
    });
  }

  getAllStack() {
    this.timesheetService.getAllStack().subscribe((res) => {
      console.log(res);
      console.log('Stacks:', this.stacks);
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
      this.addTaskProjectId = null;
    }
  }
}
