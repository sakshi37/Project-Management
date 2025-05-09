// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-change-password',
//   imports: [ FormsModule,CommonModule],
//   templateUrl: './change-password.component.html',
//   styleUrl: './change-password.component.css'
// })
// export class ChangePasswordComponent {
//   passwordData = {
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   };
//   //password show
 
//     showOldPassword = false;
//     showNewPassword = false;
//     showConfirmPassword = false;
//   onChangePassword() {
//     if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
//       alert("New passwords do not match.");
//       return;
//     }
   
//     console.log("Password change request submitted:", this.passwordData);
//     alert("Password changed successfully (demo only).");
  
//     // Optionally reset the form
//     this.passwordData = {
//       oldPassword: '',
//       newPassword: '',
//       confirmPassword: ''
//     };
//   }
// }

//=======================================================================================================

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
 

  showOldPassword = true;
  showNewPassword = true;
  showConfirmPassword = true;
 
  constructor(private userService: UserService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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