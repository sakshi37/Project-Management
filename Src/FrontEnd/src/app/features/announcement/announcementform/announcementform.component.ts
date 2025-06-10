import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Announcement, AnnouncementService } from '../../../services/announcement.service';
import { RoleService } from '../../../services/role.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announcementform',
  imports: [RouterModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './announcementform.component.html',
  styleUrl: './announcementform.component.css',
  standalone: true
})
export class AnnouncementformComponent implements OnInit {
  announcements: Announcement[] = [];
  private subscription!: Subscription;
  
  announcementForm!: FormGroup;
  targetTypes = ['All', 'UserGroup', 'Employee'];
  userGroups = ['HR', 'Team Leader', 'User'];
  userGroup: string | null = '';
  empCode: string | null = '';

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private roleService: RoleService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.userGroup = this.roleService.getUserRole();
    this.empCode = this.roleService.getEmpId(); // fixed method name

    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      targetType: ['', Validators.required],
      targetValue: ['']
    });
    this.subscription = this.announcementService.gettodayAnnouncements().subscribe({
      next: (announcements) => {
        this.announcements = announcements;
      },
      error: (err) => this.errorHandler.handleError(err)
    });

    // Dynamically handle targetValue field based on selected targetType
    this.announcementForm.get('targetType')?.valueChanges.subscribe((type) => {
      const targetValueControl = this.announcementForm.get('targetValue');

      if (type === 'All') {
        targetValueControl?.clearValidators();
        targetValueControl?.reset();
      } else {
        targetValueControl?.setValidators(Validators.required);
      }

      targetValueControl?.updateValueAndValidity();
    });
  }

  get targetTypeValue(): string {
    return this.announcementForm.get('targetType')?.value;
  }

  get userGroupOptions(): string[] {
    return this.userGroups;
  }

  submitForm(): void {
    if (this.announcementForm.valid) {
      const body = {
        id: 0,
        ...this.announcementForm.value
      };

      this.announcementService.postAnnouncement(body).subscribe({
        next: () =>
          Swal.fire({
            title: 'Success',
            text: 'Announcement posted successfully!',
            icon: 'success'
          }),
        error: (err) => this.errorHandler.handleError(err)
      });
    }
  }
}
