// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthResponseModel, Login } from '../Models/login';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl:string = "https://localhost:7292/api/Login/login";
//   constructor(private http:HttpClient) { }
//   login(loginUser:Login):Observable<AuthResponseModel> {
//     return this.http.post<AuthResponseModel>(`${this.apiUrl}`, loginUser);
//   }

  

//   resendOtp(loginUser: Login): Observable<AuthResponseModel> {
//     return this.http.post<AuthResponseModel>(`${this.apiUrl}/resend-otp`, loginUser);
//   }


//   // ----------------------------------------------------------------------------------------------------------------

//   resetPassword(data: { username: string; otp: string; newPassword: string, confirmNewPassword:string }) {
//     return this.http.post<any>('https://localhost:7292/api/Login/verify-otp',data);
//   }

//   sendForgotPasswordOtp(username: string) {
//     return this.http.post<any>(`https://localhost:7292/api/Login/send-otp?username=${username}`, null);
//   } 
// }


// =======================================================================================================

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseModel, Login, VerifyOTPDto } from '../Models/login';
import { Observable } from 'rxjs';
import { ChangePasswordModel } from '../Models/changepassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl:string = "https://localhost:7292/api/Login/login";
  constructor(private http:HttpClient) { }
  login(loginUser:Login):Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.apiUrl}`, loginUser);
  }
  verifyOtp(data: VerifyOTPDto) : Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`https://localhost:7292/api/Login/otpVerify`, data);
  }

  resendOtp(loginUser: Login): Observable<AuthResponseModel>{
    return this.http.post<AuthResponseModel>(`${this.apiUrl}/resend-otp`, loginUser);
  }


  // ----------------------------------------------------------------------------------------------------------------

  resetPassword(data: { username: string; otp: string; newPassword: string, confirmNewPassword:string }) {
    return this.http.post<any>('https://localhost:7292/api/Login/verify-otp',data);
  }

  sendForgotPasswordOtp(username: string) {
    return this.http.post<any>(`https://localhost:7292/api/Login/send-otp?username=${username}`, null);
  }

  // updatePassword(data: { oldPassword: string; newPassword: string; confirmNewPassword: string }) {
  //   return this.http.post<any>('https://localhost:7292/api/Login/update_password',data);
  // }
  
  
  updatePasswords(ChangePassword:ChangePasswordModel):Observable<string>{
    return this.http.post<string>('https://localhost:7292/api/Login/update_password',ChangePassword)
  }
  
}