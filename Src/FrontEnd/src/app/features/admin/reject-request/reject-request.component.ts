import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin-service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject-request',
  imports: [FormsModule],
  templateUrl: './reject-request.component.html',
  styleUrl: './reject-request.component.css'
})
export class RejectRequestComponent {
reason: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RejectRequestComponent>,
    private adminService: AdminService
  ) {
    
  console.log('Reject dialog data:', data);
  }

  send(): void {
  const empCode = localStorage.getItem('userName');  // Get empCode from local storage

  if (!empCode || !this.reason || !this.data.requestId) {
    alert('Please enter a comment and ensure empCode and requestId are available.');
    return;
  }

  this.adminService.rejectRequest(this.data.requestId, empCode, this.reason).subscribe({
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
