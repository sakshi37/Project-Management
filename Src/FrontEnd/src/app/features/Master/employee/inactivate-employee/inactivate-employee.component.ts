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
          toast:true,
          icon:'success',
          text: res.message,
          position: 'top', 
          timer:3000,
          showConfirmButton: false 
  
        }).then(()=>{
        this.dialogRef.close(true);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          toast:true,
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
