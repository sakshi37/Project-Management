import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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
  minDate: string = '';
  editMode = false;
editedId: number | null = null;


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
     this.minDate = new Date().toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm

    this.initializeForm();
    this.loadAnnouncements();
    this.setupTargetTypeListener();
    this.announcementService.editAnnouncement$.subscribe((announcement) => {
  if (announcement) {
    this.editMode = true;
    this.editedId = announcement.id;
    this.announcementForm.patchValue({
      title: announcement.title,
      message: announcement.message,
      fromDate: announcement.fromDate,
      toDate: announcement.toDate,
      targetType: announcement.targetType,
      targetValue: announcement.targetValue
    });
  }
});

  }
 
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    // this.announcementForm = this.fb.group({
    //   title: ['', Validators.required],
    //   message: ['', Validators.required],
    //   fromDate: ['', Validators.required],
    //   toDate: ['', Validators.required],
    //   targetType: ['', Validators.required],
    //   targetValue: ['', Validators.required] // Initialize as required
    // });
    this.announcementForm = this.fb.group({
  title: ['', [Validators.required, Validators.maxLength(50)]],
  message: ['', [Validators.required, Validators.maxLength(100)]],
  fromDate: ['', [Validators.required, this.futureDateValidator()]],
  toDate: ['', Validators.required],
  targetType: ['', Validators.required],
  targetValue: ['', Validators.required]
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
  futureDateValidator() {
  return (control: AbstractControl) => {
    const inputDate = new Date(control.value);
    const now = new Date();

    if (inputDate < now) {
      return { pastDate: true };
    }
    return null;
  };
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

  // submitForm(): void {
  //   const fromDate = new Date(this.announcementForm.value.fromDate);
  // const toDate = new Date(this.announcementForm.value.toDate);

  // if (toDate < fromDate) {
  //   Swal.fire('Validation Error', 'To Date cannot be earlier than From Date.', 'warning');
  //   return;
  // }
  //   if (this.announcementForm.valid) {
  //     const formValue = this.announcementForm.value;
      
  //     // Ensure targetValue is empty string when "All" is selected
  //     const body = {
  //       id: 0,
  //       ...formValue,
  //       targetValue: this.targetTypeValue === 'All' ? '' : formValue.targetValue
  //     };

  //     this.announcementService.postAnnouncement(body).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           title: 'Success',
  //           toast: true,
  //           position: 'top',
  //           timer: 3000,
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //           text: 'Announcement posted successfully!',
  //           icon: 'success'
  //         }).then(() => {
  //           this.router.navigate(['/announcements']);
  //         });
  //       },
  //       error: (err) => this.errorHandler.handleError(err)
  //     });
  //   }
  // }
  submitForm(): void {
  const fromDate = new Date(this.announcementForm.value.fromDate);
  const toDate = new Date(this.announcementForm.value.toDate);

  if (toDate < fromDate) {
    Swal.fire('Validation Error', 'To Date cannot be earlier than From Date.', 'warning');
    return;
  }

  if (this.announcementForm.valid) {
    const formValue = this.announcementForm.value;

    const body = {
      id: this.editMode && this.editedId ? this.editedId : 0,
      ...formValue,
      targetValue: this.targetTypeValue === 'All' ? '' : formValue.targetValue
    };

    const request$ = this.editMode
      ? this.announcementService.updateAnnouncement(body)
      : this.announcementService.postAnnouncement(body);

    request$.subscribe({
      next: () => {
        Swal.fire({
          title: 'Success',
          toast: true,
          position: 'top',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          text: this.editMode ? 'Announcement updated successfully!' : 'Announcement posted successfully!',
          icon: 'success'
        }).then(() => {
          this.resetForm();
          this.router.navigate(['/announcements']);
        });
      },
      error: (err) => this.errorHandler.handleError(err)
    });
  }
}
resetForm() {
  this.announcementForm.reset();
  this.editMode = false;
  this.editedId = null;
  this.announcementService.clearEditAnnouncement();
}


}