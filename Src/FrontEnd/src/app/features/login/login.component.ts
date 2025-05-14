import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthResponseModel, Login, VerifyOTPDto } from '../../Models/login';
import { UserService } from '../../services/user.service';
import { Otp } from '../../Models/otp';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserName = '';
  login: Login = new Login('', '', false);
  otpDigits: string[] = ['', '', '', ''];
  isVerifying = false;
  errorMessage = '';
  formSubmitted = false;
  isLoggingIn = false;

  loginForm = new FormControl({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{4,10}$'
      ),
    ]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  passwordModel = {
    oldPassword: '',
  };
  showPassword: boolean = true;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}

  loginUser(loginForm: NgForm) {
    this.login = loginForm.value;
    this.formSubmitted = true;
    if (loginForm.invalid) {
      return;
    }

    this.login = loginForm.value;
    this.isLoggingIn = true;

    this.userService.login(this.login).subscribe({
      next: (response: AuthResponseModel) => {
        localStorage.setItem('otp', response.otp);
        localStorage.setItem('email', response.email);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('checkFirstLogin', response.firstLogin);

        localStorage.setItem('roleName', response.roleName);
        localStorage.setItem('userCheckInTime', response.userCheckInTime);

        console.log(localStorage.getItem('userName'));

        if (response.firstLogin) {
          const modalElement = document.getElementById('otpModal');
          const otpModal = new bootstrap.Modal(modalElement);
          otpModal.show();
        } else {
          this.router.navigate(['/dashboard']);
          sessionStorage.setItem('isAuthenticated', 'true');
        }

        this.isLoggingIn = false;
      },
      error: (error) => {
        console.error('Login failed!', error);
        // alert("Invalid email or password. Please try again");
        Swal.fire(
          'Login Failed',
          'Invalid email or password. Please try again.',
          'error'
        );
        this.isLoggingIn = false;
      },
    });
  }

  verifyOtp() {
    this.isVerifying = true;

    setTimeout(() => {
      const enteredOtp = this.otpDigits.join('');
      const storedOtp = localStorage.getItem('otp');
      if (localStorage.getItem('userName') != null) {
        let userNaav: string = String(localStorage.getItem('userName'));
        const OtpRequest: VerifyOTPDto = {
          userName: userNaav,
          password: this.login.password,
          otp: enteredOtp,
        };
        console.log(OtpRequest);
        this.userService.verifyOtp(OtpRequest).subscribe({
          next: (res: AuthResponseModel) => {
            // alert('OTP Verified Successfully!');
            Swal.fire('Success', 'OTP Verified Successfully!', 'success');
            const modalElement = document.getElementById('otpModal');
            const otpModal =
              bootstrap.Modal.getInstance(modalElement) ||
              new bootstrap.Modal(modalElement);
            otpModal.hide();
            sessionStorage.setItem('isAuthenticated', 'true');
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Otp Failed', error.error);
            // alert('Incorrect OTP. Please try again.');
            Swal.fire(
              'Invalid OTP',
              'Incorrect OTP. Please try again.',
              'error'
            );
          },
        });
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
      // alert('Email not found. Please login again.');
      Swal.fire('Error', 'Email not found. Please login again.', 'error');
      return;
    }

    const loginUser = new Login(email, '', false);

    // this.userService.resendOtp(loginUser).subscribe({
    //   next: (response: any) => {
    //     localStorage.setItem('otp', response.otp);
    //     // alert('OTP Resent Successfully!');
    //     Swal.fire('Success', 'OTP Resent Successfully!', 'success');
    //   },
    //   error: (error) => {
    //     console.error('Resend OTP failed!', error);
    //     // alert('Failed to resend OTP. Please try again.');
    //     Swal.fire('Failed', 'Failed to resend OTP. Please try again.', 'error');
    //   }
    // });
  }

  // Forgot password logic
  forgotUsername: string = '';
  forgotOtp: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  openForgotPasswordModal() {
    Swal.fire({
      title: 'Forgot Password',
      text: 'Please enter your registered username:',
      input: 'text',
      inputPlaceholder: 'Enter your username',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.forgotUsername = result.value;
        this.userService.sendForgotPasswordOtp(this.forgotUsername).subscribe({
          next: (response: any) => {
            // alert('OTP sent to your registered email.');

            Swal.fire(
              'Success',
              'OTP sent to your registered email.',
              'success'
            );

            setTimeout(() => {
              const modalElement = document.getElementById(
                'forgotPasswordModal'
              );
              const forgotPasswordModal = new bootstrap.Modal(modalElement);
              forgotPasswordModal.show();
            }, 2000);
          },
          error: (error) => {
            console.error('Failed to send OTP!', error);
            // alert('Failed to send OTP. Please check your email and try again.');
            Swal.fire(
              'Failed',
              'Failed to send OTP. Please check your email and try again.',
              'error'
            );
          },
        });
      }
    });
  }

  submitForgotPassword() {
    if (
      !this.forgotUsername ||
      !this.forgotOtp ||
      !this.newPassword ||
      !this.confirmNewPassword
    ) {
      // alert('Please fill all fields.');
      Swal.fire('Validation', 'Please fill all fields.', 'warning');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      // alert('New Password and Confirm Password do not match.');
      Swal.fire(
        'Mismatch',
        'New Password and Confirm Password do not match.',
        'error'
      );
      return;
    }

    const resetPasswordData = {
      username: this.forgotUsername,
      otp: this.forgotOtp,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    };

    this.userService.resetPassword(resetPasswordData).subscribe({
      next: (response: any) => {
        // alert('Password reset successfully! Please login with new password.');
        Swal.fire(
          'Success',
          'Password reset successfully! Please login with new password.',
          'success'
        );
        const modalElement = document.getElementById('forgotPasswordModal');
        const forgotPasswordModal = bootstrap.Modal.getInstance(modalElement);
        forgotPasswordModal.hide();
      },
      error: (error) => {
        console.error('Password reset failed!', error);
        // alert('Failed to reset password. Please check your OTP and try again.');
        Swal.fire(
          'Failed',
          'Failed to reset password. Please check your OTP and try again.',
          'error'
        );
      },
    });
  }
}
