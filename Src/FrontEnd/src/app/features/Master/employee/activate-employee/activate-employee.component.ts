import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivateEmployeeService } from '../../../../services/activate-employee-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivateEmployeeModel } from '../../../../Models/activate-employee-model';

@Component({
  selector: 'app-activate-employee',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './activate-employee.component.html',
  styleUrl: './activate-employee.component.css'
})
export class ActivateEmployeeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActivateEmployeeComponent>,
    private activateemployeecomponentservice :ActivateEmployeeService
  ) {}

  activate(): void {
    this.activateemployeecomponentservice.activateEmployee(this.data.code).subscribe({
          next: (res: ActivateEmployeeModel) => {
            Swal.fire({
                      title: 'Success!',
                      text: res.message,
                      icon: 'success',
                      confirmButtonText: 'Ok'
                    }).then(()=>{
            this.dialogRef.close(true);});
          },
          error: (err) => {
            console.error('Activation Error:', err);
            if (err.error && err.error.message) {
              alert(`Activation failed: ${err.error.message}`);
            } else {
              alert('Failed to activate employee. Please try again.');
            }
          }
          
        });
  }

  close(): void {
    this.dialogRef.close();
  }
}