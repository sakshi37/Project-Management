

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivateEmployeeService } from '../../../../services/activate-employee-service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activate-employee',
  standalone: true, // important for imports to work in component
  imports: [FormsModule],
  templateUrl: './activate-employee.component.html',
  styleUrl: './activate-employee.component.css'
})
export class ActivateEmployeeComponent {
  reason: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActivateEmployeeComponent>,
    private activateEmployeeService: ActivateEmployeeService
  ) {}

  activate(): void {
    if (!this.reason.trim()) {
      Swal.fire('Missing Reason', 'Please enter a reason.', 'warning');
      return;
    }

    const requestByEmpCode = localStorage.getItem('userName');
    if (!requestByEmpCode) {
      Swal.fire('Missing Info', 'Your employee code is not found in localStorage.', 'error');
      return;
    }

    this.activateEmployeeService.activateEmployee(this.data.code, this.reason).subscribe({
      next: (res) => {
        Swal.fire({
          toast: true,
          icon: 'success',
          text: res.message,
          position: 'top',
          timer: 2000,
          showConfirmButton: false
        }).then(() => this.dialogRef.close(true));
      },
      error: (err) => {
        console.error('Activation Error:', err);
         Swal.fire({
          toast: true,
          icon: 'error',
          text: err.message,
          position: 'top',
          timer: 2000,
          showConfirmButton: false
        }).then(() => this.dialogRef.close(true));
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
