import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee-service';
import { Stack, TimeSheetService } from '../../../services/time-sheet.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-task',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './work-timesheet.component.html',
  styleUrl: './work-timesheet.component.css',
})
export class WorkTimesheetComponent {
  projectForm!: FormGroup;
  stacks: Stack[] = [];

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimeSheetService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initProjectForm();
    this.getAllStack();
  }

  initProjectForm(): void {
    this.projectForm = this.fb.group({
      Name: [''],
      StackIds: [[]],
    });
  }

  onProjectSubmit() {
    if (this.projectForm.invalid) return;

    this.timesheetService
      .InserProject(this.projectForm.value)
      .subscribe((res) => {
        console.log('Project Inserted:', res);

        this.projectForm.reset();
        Swal.fire({
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
