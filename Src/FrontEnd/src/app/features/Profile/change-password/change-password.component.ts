import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ChangePasswordComponent {
  passwordModel = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  showOldPassword = true;
  showNewPassword = true;
  showConfirmPassword = true;

  constructor(private userService: UserService,private router: Router) {} 

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onChangePassword(form: NgForm) {
    if (!form.valid) {
      // alert('Please fill in all fields.');
      Swal.fire('Validation Error', 'Please fill in all fields.', 'warning');
      return;
    }

    if (this.passwordModel.newPassword !== this.passwordModel.confirmPassword) {
      // alert('New passwords do not match.');
      Swal.fire('Mismatch', 'New passwords do not match.', 'error');
      return;
    } 

    const requestData = {
      userName: String(localStorage.getItem('userName')),
      oldPassword: this.passwordModel.oldPassword,
      newPassword: this.passwordModel.newPassword,
      confirmPassword: this.passwordModel.confirmPassword
    };

    console.log(requestData);

    this.userService.updatePasswords(requestData).subscribe({
      next: (res: string) => {
        // alert('Password updated successfully!');
        Swal.fire('Success', 'Password updated successfully!', 'success' ).then(()=>{
          form.resetForm();
          this.router.navigate(['/dashboard']);
        })
      },
      error: (err) => {
        console.error(err);
        if (err.status == 200) {
          // alert('Password Updated Successfully.');
          Swal.fire('Success', 'Password updated successfully!', 'success');
          form.resetForm();
          this.router.navigate(['/dashboard']);
        } else {
          // alert('Error updating password.');
          Swal.fire('Error', 'Error updating password.', 'error');
        }
      }
    });
    
  }
}
