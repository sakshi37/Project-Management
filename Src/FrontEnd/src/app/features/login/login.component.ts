import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../Models/login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: Login = new Login('', '',false);
  errorMessage='';

  constructor(private router:Router,private userService: UserService) {}
  ngonInit() { }

  loginUser(loginForm: NgForm) {
    this.login = loginForm.value;
    console.log(this.login);
    this.router.navigate(['/otp'])
    // this.router.navigate(['/sidebar'])  reduect to sidebar not for forst login 
    ;
;

    // this.userService.login(this.loginModel).subscribe({
    //   next: (response: AuthResponseModel) => {
    //     console.log(response)
    //     localStorage.setItem('token', response.token);
    //     localStorage.setItem('email', response.email);  
         
    //       loginForm.reset();
    //       this.router.navigate(['']);
  }

  
}
