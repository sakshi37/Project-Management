import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone, Injector } from '@angular/core';
import { FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthResponseModel, Login, VerifyOTPDto } from '../../Models/login';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';
import { Toast } from 'bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserName?: string = '';
  UserEmail?: string = '';
  otpButtonMsg: string = 'OTP Expires in';
  login: Login = new Login('', '', false);
  otpDigits: string[] = ['', '', '', ''];
  isVerifying = false;
  errorMessage = '';
  formSubmitted = false;
  isLoggingIn = false;

  forgotUsername: string = '';
  forgotOtp: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  showNewPassword: boolean = true;
  showConfirmPassword: boolean = true;
  loginAttempts: number = 0;
  maxAttempts: number = 3;

  loginForm = new FormControl({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&\\-+=()])(?=\\S+$).{4,10}$'
      ),
    ]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone,
    private injector: Injector
  ) { }

  passwordModel = {
    oldPassword: '',
    confirmNewPassword:'',
    newPassword:''
  };

  showPassword: boolean = true;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit() { }


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
        this.loginAttempts = 0;
        localStorage.setItem('token', response.token);
        localStorage.setItem('loginStatus', String(response.loginStatus));
        // localStorage.setItem('loginStatus', String(response.loginStatus));
        localStorage.setItem('firstLogin', String(response.firstLogin));
        const decodedToken = jwtDecode(response.token);
        this.UserName = decodedToken.sub;
        this.UserEmail = decodedToken.iss;
        // this.firstLogin=decodedToken.nbf;

        if (!response.loginStatus) {
          Swal.fire('Access Denied', 'Your login has been disabled. Please contact HR.', 'error');
          this.isLoggingIn = false;
          return;
        }

        if (response.firstLogin) {
          const modalElement = document.getElementById('otpModal');
          const otpModal = new bootstrap.Modal(modalElement);
          this.startTimer();
          otpModal.show();

        } else {
          this.router.navigate(['/dashboard']).then(() => {
            const appRef = this.injector.get(AppComponent);
            appRef.hideLayout = false;
            appRef.isSidebarVisible = true;
          });
          sessionStorage.setItem('isAuthenticated', 'true');
        }
      },
      error: (error) => {
        this.loginAttempts++;

        if (this.loginAttempts >= this.maxAttempts) {
          Swal.fire({
            icon: 'error',
            title: 'Account Blocked',
            text: 'You have entered incorrect credentials 3 times. Your account has been blocked, Please contact HR.',
            confirmButtonColor: '#d33'
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'error',
            title: 'Login Failed',
            text: `Invalid credentials. Attempt ${this.loginAttempts} of ${this.maxAttempts}.`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }

        console.error('Login failed!', error);
        this.isLoggingIn = false;
      },
    });
  }


  // updating password update at first login
  FirstLoginPasswordUpdate(code: string, Password: string) {
    this.userService.FirstLoginPasswordUpdate(code, Password).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed!', error.error);
        Swal.fire('Password Update Failed', error.error.message, 'error');
        // this.isLoggingIn = false;
      },
    });
  }

  // OTP verifcation at firstlogin
  verifyOtp() {
    this.isVerifying = true;

    setTimeout(() => {
      const enteredOtp = this.otpDigits.join('');
      const storedOtp = localStorage.getItem('otp');
      if (localStorage.getItem('token') != null) {
        const userNaav: string = this.UserName != null ? this.UserName : 'lol';
        const OtpRequest: VerifyOTPDto = {
          code: userNaav,
          password: this.login.password,
          otp: enteredOtp,
        };
        this.userService.verifyOtp(OtpRequest).subscribe({
          next: (res: AuthResponseModel) => {
            Swal.fire('Success', 'OTP Verified Successfully!', 'success');
            const modalElement = document.getElementById('otpModal');
            const otpModal =
              bootstrap.Modal.getInstance(modalElement) ||
              new bootstrap.Modal(modalElement);
            otpModal.hide();
            sessionStorage.setItem('isAuthenticated', 'true');
            // this.router.navigate(['']);
            this.router.navigate(['/changePassword']).then(() => {
              const appRef = this.injector.get(AppComponent);
              appRef.hideLayout = false;
              appRef.isSidebarVisible = true;
            });
          },
          error: (error) => {
            console.error('Otp Failed', error.error);
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

  //timer at otp modal=====
  timeLeft: number = 60;
  txtTimeleft: boolean = false;
  btnDisabled: boolean = false;
  interval: any;

  startTimer() {
    this.timeLeft = 60; // Reset the timer
    this.btnDisabled = true;
    this.txtTimeleft = true;

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.btnDisabled = false;
        this.txtTimeleft = false;
        clearInterval(this.interval);
        this.otpButtonMsg = 'Resend OTP'
      }
    }, 1000);
  }

  // otp termination modal 
  terminateOtp() {
    clearInterval(this.interval);
    this.txtTimeleft = false;
    this.otpDigits = ['', '', '', ''];
    this.txtTimeleft = false;
    this.isLoggingIn = false;
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'info',
      title: 'Process Terminated',
      text: 'OTP verification process has been terminated. Please login again.',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true
    });
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

  //===resend OTP module=====
  isLoading = false;

  resendOtp() {
    this.isLoading = true;

    this.userService.resendOtp(this.UserName).subscribe({
      next: (response: AuthResponseModel) => {
        this.isLoading = false;
        // localStorage.setItem('otp', response.otp); 
        // localStorage.setItem('email',response.token);
        Swal.fire({
          toast: true,
          position: 'top',
          title: 'Resending OTP',
          text: 'OTP Resent Successfully!',
          icon: 'success'
        });
        this.startTimer()
      },
      error: (error) => {
        this.isLoading = false;

        Swal.fire({
          title: 'Resend OTP failed!',
          text: 'Failed to resend OTP. Please try again.'
        });
      },
    });
  }
  //forgot password modal
  openForgotPasswordModal() {
    Swal.fire({
      title: 'Forgot Password',
      text: 'Please enter your registered username:',
      input: 'text',
      inputPlaceholder: 'Enter your username',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      confirmButtonColor: '#28a745',
      cancelButtonColor: 'darkgrey',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const enteredUsername = result.value;


        this.userService.getUserByUsername(enteredUsername).subscribe({
          next: (user) => {
            if (user.firstLogin) {
              Swal.fire({
                icon: 'info',
                title: 'Restricted Action',
                text: 'You are a new user. Please verify OTP first to Forgot your Password.',
                confirmButtonColor: '#007bff'
              });
              return;
            }

            if (this.passwordModel.oldPassword===this.passwordModel.newPassword) {
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

            this.forgotUsername = enteredUsername;
  
            this.userService.sendForgotPasswordOtp(this.forgotUsername).subscribe({
              next: () => {
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'success',
                  title: 'OTP sent to your registered email.',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true
                });

                setTimeout(() => {
                  const modalElement = document.getElementById('forgotPasswordModal');
                  const forgotPasswordModal = new bootstrap.Modal(modalElement);
                  forgotPasswordModal.show();
                }, 2000);
              },
              error: (error) => {
                console.error('Failed to send OTP!', error);
                Swal.fire(
                  'Failed',
                  'Failed to send OTP. Please check your email and try again.',
                  'error'
                );
              },
            });
          },
          error: (error: any) => {
            console.error('User fetch failed!', error);
            Swal.fire(
              'Error',
              'User not found. Please enter a valid username.',
              'error'
            );
          }
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
      Swal.fire('Validation', 'Please fill all fields.', 'warning');
      return;
    }

    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&\-+=()])(?=\S+$).{6,12}$/;

    if (!passwordPattern.test(this.newPassword)) {
      Swal.fire(
        'Weak Password',
        'Password must include 6-12 characters, uppercase, lowercase, number, and special character.',
        'error'
      );
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
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
      next: () => {
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
        Swal.fire(
          'Failed',
          'Failed to reset password. Please check your OTP and try again.',
          'error'
        );
      },
    });
  }
}
