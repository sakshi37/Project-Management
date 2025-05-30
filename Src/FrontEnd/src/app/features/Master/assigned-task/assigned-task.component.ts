import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  UpdateTaskTimeSheetDto,
} from '../../../services/time-sheet.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetAttendanceReportDtoService } from '../../Hr/employee-attendance-report/Model/get-attendance-report-dto.service';
import { GetAttendanceReportService } from '../../../services/get-attendance-report.service';
import { RoleService } from '../../../services/role.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { EmployeeModel } from '../../../Models/employee-model';
// import*  bootstrap from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-work-timesheet',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './assigned-task.component.html',
  styleUrl: './assigned-task.component.css',
})
export class AssignedTaskComponent implements OnInit {
  
  @ViewChild('updateModal') updateModalRef!: ElementRef;
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
    private modal!: bootstrap.Modal;
  

  constructor(

    private timeSheetService: TimeSheetService,
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {
    this.updateForm = this.fb.group({
      id: [0],
      sequence: ['', Validators.required],
      part: ['', Validators.required],
      activity: ['', Validators.required],
      type: ['', Validators.required],
       remark: [''],
      fk_EmpId: [0]
    });
  }

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
    const modalElement = document.getElementById('updateModal');
        if (modalElement) {
          this.modal = new bootstrap.Modal(modalElement);
        }
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      jobId: [],
      sequence: ['', Validators.required],
      part: ['', Validators.required],
      activity: ['', Validators.required],
      type: ['', Validators.required],

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

  updateForm: FormGroup;

selectedTaskIsCompleted: boolean = false;

    openUpdateModal(task: Timesheets) {
    // Patch the task properties into the update form dynamically
    this.selectedTaskIsCompleted = !!task.endTime; 
    this.updateForm.patchValue({
      id: task.id,
      sequence: task.sequence,
      part: task.part,
      activity: task.activity,
      type: task.type,
      fk_EmpId: task.empId,
      remark: task.remark || ''
    });

    this.modal.show();
  }


  // model: UpdateTaskTimeSheetDto = {
  //   id: 2,
  //   sequence: '001',
  //   part: 'designing the',
  //   activity: 'Frontend',
  //   type: 'with work',
  //   fk_EmpId: 1
  // };



  submitUpdate() {
    const updatePayload: UpdateTaskTimeSheetDto = this.updateForm.value;
    console.log(this.updateForm.value);
    this.timeSheetService.updateTaskTimeSheet(updatePayload).subscribe({
      next: () => {
         this.timeSheet();
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'TimeSheet updated successfully!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.modal.hide();
      },
      error: err => {
        Swal.fire({
          toast: true,
          icon: 'error',
          title: 'Update failed!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        console.error('Update error:', err);
      }
    });
  }

}
