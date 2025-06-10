import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AnnouncementformComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
  private subscription!: Subscription;
  
  announcementForm!: FormGroup;
  targetTypes = ['All', 'UserGroup', 'Employee'];
  userGroups = ['HR', 'Team Lead', 'User'];
  userGroup: string | null = '';
  empCode: string | null = '';

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private roleService: RoleService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userGroup = this.roleService.getUserRole();
    this.empCode = this.roleService.getEmpId();

    this.initializeForm();
    this.loadAnnouncements();
    this.setupTargetTypeListener();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      targetType: ['', Validators.required],
      targetValue: ['', Validators.required] // Initialize as required
    });
  }

  private loadAnnouncements(): void {
    this.subscription = this.announcementService.gettodayAnnouncements().subscribe({
      next: (announcements) => {
        this.announcements = announcements;
      },
      error: (err) => this.errorHandler.handleError(err)
    });
  }

  private setupTargetTypeListener(): void {
    this.announcementForm.get('targetType')?.valueChanges.subscribe((type) => {
      const targetValueControl = this.announcementForm.get('targetValue');
      
      if (type === 'All') {
        targetValueControl?.setValue(''); // Set empty string for "All"
        targetValueControl?.clearValidators();
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

  shouldShowTargetValueField(): boolean {
  return !!this.targetTypeValue && this.targetTypeValue !== 'All';
}

  submitForm(): void {
    if (this.announcementForm.valid) {
      const formValue = this.announcementForm.value;
      
      // Ensure targetValue is empty string when "All" is selected
      const body = {
        id: 0,
        ...formValue,
        targetValue: this.targetTypeValue === 'All' ? '' : formValue.targetValue
      };

      this.announcementService.postAnnouncement(body).subscribe({
        next: () => {
          Swal.fire({
            title: 'Success',
            text: 'Announcement posted successfully!',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/announcements']);
          });
        },
        error: (err) => this.errorHandler.handleError(err)
      });
    }
  }
}