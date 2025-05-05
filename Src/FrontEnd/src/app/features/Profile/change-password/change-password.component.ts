import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ FormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  //password shoe
 
    showOldPassword = false;
    showNewPassword = false;
    showConfirmPassword = false;
  onChangePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
  
    // Handle actual password change logic here
    console.log("Password change request submitted:", this.passwordData);
    alert("Password changed successfully (demo only).");
  
    // Optionally reset the form
    this.passwordData = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}

