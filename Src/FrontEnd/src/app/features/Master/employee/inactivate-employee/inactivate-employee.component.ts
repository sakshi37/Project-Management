import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InactiveEmployeeService } from '../../../../services/inactive-employee-service';
import { InactiveEmployeeModel } from '../../../../Models/inactive-employee-model';


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
    this.inactiveemployeeService.deactivateEmployee(this.data.employeeCode).subscribe({
      next: (res: InactiveEmployeeModel) => {
        alert(res.message); 
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to deactivate employee');
      }
    });
  }
  
  close(): void {
    this.dialogRef.close(true);
  }
}
