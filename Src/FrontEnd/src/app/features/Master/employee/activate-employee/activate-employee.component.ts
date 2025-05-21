// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ActivateEmployeeModel } from '../../../../Models/activate-employee-model';
// import { ActivateEmployeeService } from '../../../../services/activate-employee-service';
// import Swal from 'sweetalert2';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-activate-employee',
//   imports: [ FormsModule],
//   templateUrl: './activate-employee.component.html',
//   styleUrl: './activate-employee.component.css'
// })
// export class ActivateEmployeeComponent {
//   reason:string=''
//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any, // Injected data from the dialog
//     private dialogRef: MatDialogRef<ActivateEmployeeComponent>, // MatDialog reference
//     private activateEmployeeService: ActivateEmployeeService // Inject ActivateEmployeeService
//   ) {}

//   activate(): void {
//     this.activateEmployeeService.activateEmployee(this.data.code).subscribe({
//           next: (res: ActivateEmployeeModel) => {
//             Swal.fire({
//               toast:true,
//               icon: 'success',
//           text: res.message,
//           position: 'top', 
//           timer:2000,
//           showConfirmButton: false 
  
  
// }).then(() => {
//   this.dialogRef.close(true);
// });

//           },
//           error: (err) => {
//             console.error('Activation Error:', err);
//             if (err.error && err.error.message) {
              
//             } else {
//               alert('Failed to activate employee. Please try again.');
              
//             }
//           }
          
//         });
//   }
//   close(): void {
//     this.dialogRef.close();
//   }
// }


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
        Swal.fire('Error', 'Failed to activate employee. Please try again.', 'error');
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
