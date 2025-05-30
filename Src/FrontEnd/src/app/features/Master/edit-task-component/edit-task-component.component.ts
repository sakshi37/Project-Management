import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimeSheetService, UpdateTaskTimeSheetDto } from '../../../services/time-sheet.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-edit-time-sheet',
  templateUrl: './edit-time-sheet.componenfort.html'
})
export class EditTimeSheetComponent {
   @ViewChild('updateModal') updateModalRef!: ElementRef;

  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private timeSheetService: TimeSheetService
  ) {
    this.updateForm = this.fb.group({
      id: [0],
      sequence: ['', Validators.required],
      part: ['', Validators.required],
      activity: ['', Validators.required],
      type: ['', Validators.required],
      fk_EmpId: [0]
    });
  }

  openUpdateModal(task: any) {
    this.updateForm.patchValue(task);

    const modalEl = this.updateModalRef.nativeElement;
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  
  model: UpdateTaskTimeSheetDto = {
    id: 1,
    sequence: '001',
    part: 'designing the',
    activity: 'Frontend',
    type: 'with work',
    fk_EmpId: 1
  };

  

  submitUpdate() {
    this.timeSheetService.updateTaskTimeSheet(this.model).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'TimeSheet updated successfully!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
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
