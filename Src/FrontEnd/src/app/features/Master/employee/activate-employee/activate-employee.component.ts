import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivateEmployeeModel } from '../../../../Models/activate-employee-model';
import { ActivateEmployeeService } from '../../../../services/activate-employee-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-employee',
  imports: [],
  templateUrl: './activate-employee.component.html',
  styleUrl: './activate-employee.component.css'
})
export class ActivateEmployeeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Injected data from the dialog
    private dialogRef: MatDialogRef<ActivateEmployeeComponent>, // MatDialog reference
    private activateEmployeeService: ActivateEmployeeService // Inject ActivateEmployeeService
  ) {}

  activate(): void {
    this.activateEmployeeService.activateEmployee(this.data.code).subscribe({
          next: (res: ActivateEmployeeModel) => {
            Swal.fire({
              toast:true,
              icon: 'success',
          text: res.message,
          position: 'top', 
          timer:3000,
          showConfirmButton: false 
  
  
}).then(() => {
  this.dialogRef.close(true);
});

          },
          error: (err) => {
            console.error('Activation Error:', err);
            if (err.error && err.error.message) {
              
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