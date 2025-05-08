 
import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';  
// import {   } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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
 

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // Accepts one of 'old', 'new', or 'confirm'
  // togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
  //   switch (field) {
  //     case 'old':
  //       this.showOldPassword = !this.showOldPassword;
  //       break;
  //     case 'new':
  //       this.showNewPassword = !this.showNewPassword;
  //       break;
  //     case 'confirm':
  //       this.showConfirmPassword = !this.showConfirmPassword;
  //       break;
  //   }
  // }



  constructor(private userService: UserService) {}

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
      alert('Please fill in all fields.');
      return;
    }

    if (this.passwordModel.newPassword !== this.passwordModel.confirmPassword) {
      alert('New passwords do not match.');
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
        next:(res:string) => {
          alert('Password updated successfully!');
          form.resetForm();
        },
      
        error: (err) => {
          console.error(err);
          if(err.status == 200)
          {
            alert('Password Updated Successfully.');
            form.resetForm();
          }
          else
          {
            alert('Error updating password.');
          }
        }
      });
    }
}
