import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

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

  constructor(private userService: UserService, private router: Router) { }

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

    if (this.passwordModel.newPassword === this.passwordModel.oldPassword) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: 'New Password can’t be the same as Old Password',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
      });
    }

    const decodedToken = jwtDecode(String(localStorage.getItem('token')));
    const UserName = decodedToken.sub != undefined ? decodedToken.sub : '';
    const requestData = {
      userName: UserName,
      oldPassword: this.passwordModel.oldPassword,
      newPassword: this.passwordModel.newPassword,
      confirmPassword: this.passwordModel.confirmPassword
    };

    console.log(requestData);



    this.userService.updatePasswords(requestData).subscribe({
      next: (res: string) => {
        // alert('Password updated successfully!');
        Swal.fire('Success', 'Password updated successfully!', 'success').then(() => {
          form.resetForm();
          this.router.navigate(['/changePassword']);
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
          setTimeout(() => {
            Swal.fire({
              toast: true,
              position: 'top',
              icon: 'error',
              title: 'Error Updating Password',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true
            });
          }, 1000);
        }
      }
    });

  }
}
