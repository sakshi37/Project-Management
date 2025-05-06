import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InactiveEmployeeService } from '../../../../services/inactive-employee-service';
import { InactiveEmployeeModel } from '../../../../Models/inactive-employee-model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inactivate-employee',
  imports: [],
  templateUrl: './inactivate-employee.component.html',
  styleUrl: './inactivate-employee.component.css'
})
export class InactivateEmployeeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InactivateEmployeeComponent>,
    private inactiveemployeeService: InactiveEmployeeService

  ) {}

  inactivate(): void {
    this.inactiveemployeeService.deactivateEmployee(this.data.code).subscribe({
      next: (res: InactiveEmployeeModel) => {
        Swal.fire({
          title: 'Success!',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
        this.dialogRef.close(true);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Fail!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
   
  }
  
  close(): void {
    this.dialogRef.close(true);
  }
}
