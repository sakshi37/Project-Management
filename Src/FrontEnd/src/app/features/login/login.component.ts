import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';  
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthResponseModel, Login } from '../../Models/login';
import { UserService } from '../../services/user.service';

declare var bootstrap: any;
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']   
})

export class LoginComponent implements OnInit {
  UserName = '';
  login: Login = new Login('', '', false);
  otpDigits: string[] = ['', '', '', ''];
  isVerifying = false;
  errorMessage = '';
  formSubmitted = false;
  // -----
  isLoggingIn=false;
 
  
  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone  
  ) {}

  ngOnInit() { }

  loginUser(loginForm: NgForm) {
    this.login = loginForm.value;
    this.formSubmitted = true;
    if (loginForm.invalid) {
      return;
    }
    this.login = loginForm.value;

     // START: Login Button Spinner Addition
  this.isLoggingIn = true;
  // END: Login Button Spinner Addition

    this.userService.login(this.login).subscribe({
      next: (response: AuthResponseModel) => {
        console.log('Login Response:', response);  // Check the response object
    if (response.userName) {
      localStorage.setItem('userName', response.userName);  // Save username
    } else {
      console.error('Username is missing from the response');
    }
 // Save other details
 localStorage.setItem('otp', response.otp);
 localStorage.setItem('email', response.email);

 // Show OTP Modal
 const modalElement = document.getElementById('otpModal');
 const otpModal = new bootstrap.Modal(modalElement);
 otpModal.show();

         // start Login button Spinner 
      this.isLoggingIn = false;
      // end Login button Spinner  
      },
      error: (error) => {
        console.error('Login failed!', error);
        alert("Invalid email or password. Please try again");

          // START: Login Button Spinner Addition
      this.isLoggingIn = false;
      // END: Login Button Spinner Addition
      }
    });
  }

  verifyOtp() {
    this.isVerifying = true;

    setTimeout(() => {
      const enteredOtp = this.otpDigits.join('');
      const storedOtp = localStorage.getItem('otp');

      if (enteredOtp === storedOtp) {
        alert('OTP Verified Successfully!'); 
        const modalElement = document.getElementById('otpModal');
        const otpModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        otpModal.hide();
       sessionStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/dashboard']);

      } else {
        alert('Incorrect OTP. Please try again.');
        
      }

      this.isVerifying = false;
    }, 1500);
  }

  moveToNext(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < 3) {
      const nextInput = input.parentElement.children[index + 1];
      nextInput.focus();
    }
  }

  moveToPrev(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 0 && index > 0) {
      const prevInput = input.parentElement.children[index - 1];
      prevInput.focus();
    }
  }

  resendOtp() {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('Email not found. Please login again.');
      return;
    }
  
    const loginUser = new Login(email, '', false); 
  
    this.userService.resendOtp(loginUser).subscribe({
      next: (response: any) => {
        localStorage.setItem('otp', response.otp);  
        alert('OTP Resent Successfully!');
      },
      error: (error) => {
        console.error('Resend OTP failed!', error);
        alert('Failed to resend OTP. Please try again.');
      }
    });
  }
  
  // <!-- -----IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII -->
 //forgot password logic
  
  forgotUsername: string = ''
forgotOtp: string = '';
newPassword: string = '';
confirmNewPassword: string = '';

openForgotPasswordModal() {
  const username = prompt('Please enter your registered username:');
  if (username) {
    this.forgotUsername = username;
    this.userService.sendForgotPasswordOtp(username).subscribe({
      next: (response: any) => {
        alert('OTP sent to your registered email.');
        const modalElement = document.getElementById('forgotPasswordModal');
        const forgotPasswordModal = new bootstrap.Modal(modalElement);
        forgotPasswordModal.show();
      },
      error: (error) => {
        console.error('Failed to send OTP!', error);
        alert('Failed to send OTP. Please check your UserName and try again.');
      }
    });
  }
}

submitForgotPassword() {
  if (!this.forgotUsername || !this.forgotOtp || !this.newPassword || !this.confirmNewPassword) {
    alert('Please fill all fields.');
    return;
  }

  if (this.newPassword !== this.confirmNewPassword) {
    alert('New Password and Confirm Password do not match.');
    return;
  }

  const resetPasswordData = {
    username: this.forgotUsername,
    otp: this.forgotOtp,
    newPassword: this.newPassword,
    confirmNewPassword: this.confirmNewPassword
  };

  this.userService.resetPassword(resetPasswordData).subscribe({
    next: (response: any) => {
      alert('Password reset successfully! Please login with new password.');
      const modalElement = document.getElementById('forgotPasswordModal');
      const forgotPasswordModal = bootstrap.Modal.getInstance(modalElement);
      forgotPasswordModal.hide();
    },
    error: (error) => {
      console.error('Password reset failed!', error);
      alert('Failed to reset password. Please check your OTP and try again.');
    }
  });
}

    // <!-- -----IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII -->

    //UpdatePassword

    



}