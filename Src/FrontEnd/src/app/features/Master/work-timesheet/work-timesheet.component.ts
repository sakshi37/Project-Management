import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee-service';
import { Stack, TimeSheetService } from '../../../services/time-sheet.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetAttendanceReportDtoService } from '../../Hr/employee-attendance-report/Model/get-attendance-report-dto.service';
import { GetAttendanceReportService } from '../../../services/get-attendance-report.service';
import { RoleService } from '../../../services/role.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { EmployeeModel } from '../../../Models/employee-model';
import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-assigned-task',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, MultiSelectModule],
  templateUrl: './work-timesheet.component.html',
  styleUrl: './work-timesheet.component.css',
})
export class WorkTimesheetComponent {
  projectForm!: FormGroup;
  stacks: Stack[] = [];

  employees: GetAttendanceReportDtoService[] = [];
  attendanceReports: GetAttendanceReportDtoService[] = [];
  empId: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private getAttendanceReportService: GetAttendanceReportService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initProjectForm();
    this.getAllStack();

    const token = this.roleService.getToken();
    const decodeToken = jwtDecode<JwtPayload>(token != null ? token : '');
    const empId: string | undefined = (decodeToken as any).id;
    console.log('decodeToken', decodeToken);

    if (!empId) return;
    if (this.roleService.getUserRole() !== 'Team Lead') return;
  }

  initProjectForm(): void {
    this.projectForm = this.fb.group({
      Name: [''],
      StackIds: [[]],
    });
  }

  onProjectSubmit() {
    if (this.projectForm.invalid) return;

    const token = this.roleService.getToken();
    const decodeToken = jwtDecode<JwtPayload>(token != null ? token : '');
    const empId: string | undefined = (decodeToken as any).id;
    const StackIds = this.projectForm.value.StackIds.map((stack: any) => stack.id);
    if (!empId) return;

    this.timesheetService
      .InserProject({
        ...this.projectForm.value,
        StackIds: StackIds,
        fk_TeamLeaderId: Number(empId),
      })
      .subscribe((res) => {
        console.log('Project Inserted:', res);

        this.projectForm.reset();
        Swal.fire({
          toast: true,
          position: 'top',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          icon: 'success',
          title: 'success',
          text: 'Project Added successfully!',
          confirmButtonColor: '#3085d6',
        });
        this.router.navigate(['/assigned-timesheet']);
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
}
