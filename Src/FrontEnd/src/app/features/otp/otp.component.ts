import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  otp: string[] = ['', '', '', ''];

  constructor(private router: Router) {}

  autoFocusNext(event: any, index: number) {
    const input = event.target;
    if (input.value && index < 3) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  submitOtp() {
    const otpValue = this.otp.join('');
    console.log('Submitted OTP:', otpValue);

    // Validate OTP or navigate forward
    // this.router.navigate(['/dashboard']);
    this.router.navigate(['/dashboard']);
  }

  resendOtp() {
    console.log('Resending OTP...');
    
    // Resend OTP logic here
  }
}