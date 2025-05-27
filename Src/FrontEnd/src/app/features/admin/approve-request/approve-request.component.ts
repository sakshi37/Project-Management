import { Component, Inject } from '@angular/core';
import { AdminService } from '../../../services/admin-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-approve-request',
  imports: [FormsModule],
  templateUrl: './approve-request.component.html',
  styleUrl: './approve-request.component.css'
})
export class ApproveRequestComponent {
reason: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApproveRequestComponent>,
    private adminService: AdminService
  ) {}

  send():void{
    const decodedToken = jwtDecode(String(localStorage.getItem('token')));
          const empCode = decodedToken.sub;

  if (!empCode || !this.reason || !this.data.requestId) {
    alert('Please enter a comment and ensure empCode and requestId are available.');
    return;
  }

  this.adminService.approveRequest(this.data.requestId, empCode, this.reason).subscribe({
    next: (res) => {
      Swal.fire({
                toast: true,
                icon: 'success',
                text: res.message,
                position: 'top',
                timer: 2000,
                showConfirmButton: false
              }).then(() => this.dialogRef.close({ approvedCode: this.data.code }));

      
    },
    error: (err) => {
       Swal.fire({
                toast: true,
                icon: 'error',
                text: err.message,
                position: 'top',
                timer: 2000,
                showConfirmButton: false
              }).then(() => this.dialogRef.close(true));
      console.error(err);
    }
  });
  }
   close(): void {
    this.dialogRef.close();
  }
}
