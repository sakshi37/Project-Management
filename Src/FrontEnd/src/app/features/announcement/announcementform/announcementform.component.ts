import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../services/announcement.service';
import { RoleService } from '../../../services/role.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-announcementform',
  imports: [RouterModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './announcementform.component.html',
  styleUrl: './announcementform.component.css'
})
export class AnnouncementformComponent {
announcementForm!: FormGroup;
  targetTypes = ['All', 'UserGroup', 'Employee'];
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
    this.empCode = this.roleService.getEmpCode();

    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      targetType: ['', Validators.required],
      targetValue: ['']
    });

    // Optional: Auto-fill targetValue based on targetType
    // this.announcementForm.get('targetType')?.valueChanges.subscribe(type => {
    //   if (type === 'All') {
    //     this.announcementForm.patchValue({ targetValue: 'All' });
    //   } else if (type === 'UserGroup') {
    //     this.announcementForm.patchValue({ targetValue: this.userGroup });
    //   } else if (type === 'Employee') {
    //     this.announcementForm.patchValue({ targetValue: this.empCode });
    //   } else {
    //     this.announcementForm.patchValue({ targetValue: '' });
    //   }
    // });
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
