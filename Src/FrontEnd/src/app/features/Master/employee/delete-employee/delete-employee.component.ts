import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../../../services/employee-service';
import { DeleteEmployeeModel } from '../../../../Models/delete-employee-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-employee',
  imports: [],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    private deletemployeeService: EmployeeService

  ) { }


  delete(): void {
    this.deletemployeeService.deleteEmployee(this.data.code).subscribe({
      next: (res: DeleteEmployeeModel) => {
        Swal.fire({
          toast: true,
          icon: 'success',
          text: res.message,
          position: 'top',
          timer: 2000,
          showConfirmButton: false

        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          toast: true,
          text: err.message,
          position: 'top',
          showConfirmButton: false

        })
      }
    });

  }
  close(): void {
    this.dialogRef.close(true);
  }
}
