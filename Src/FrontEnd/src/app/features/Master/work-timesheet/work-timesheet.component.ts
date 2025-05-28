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
  employees: GetAttendanceReportDtoService[] = [];
  attendanceReports:GetAttendanceReportDtoService[]=[];
  taskList: Timesheets[] = [];
  openProjectId: number | null = null;
  addTaskProjectId: number | null = null;
  projects: ProjectWithStack[] = [];
  stacks: Stack[] = [];
  selectedTaskList: Timesheets[] = [];

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private getAttendanceReportService : GetAttendanceReportService,
    private roleService : RoleService,
    private fb: FormBuilder
  ) {}
  empId:number = 0;
  ngOnInit(): void {
    this.initForm();
    this.initProjectForm();
    console.log(this.roleService.getUserRole(), 'Role');
    
    // this.employeeService.getAllEmployeeByIdName().subscribe((res) => {
    //   console.log(res);
    //   this.employees = res;
    // });
    const token  = this.roleService.getToken();
    const decodeToken = jwtDecode<JwtPayload>(token != null ? token : '');
    if(this.roleService.getUserRole() == 'Team Lead')
    {
      this.getAttendanceReportService.getTLEmployeeID(decodeToken.sub).subscribe({
        next: (res:EmployeeModel) => {
          this.empId = res.id;
          console.log('TL chi ID', this.empId);
          
      this.getAttendanceReportService.getEARByTLName(this.empId).subscribe({
        next:(response:GetAttendanceReportDtoService[])=>{
          this.employees = response;
          console.log(this.empId, 'Tyachya under employees', this.employees);
          
        },error:(error) =>{
          console.error('Error', error.error);
          console.error('Error Message', error.error.message);
        }
      });
        }, error:(error) =>{
          console.error('Error', error.error);
          console.error('Error Message', error.error.message);
        }
      })
  }
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
