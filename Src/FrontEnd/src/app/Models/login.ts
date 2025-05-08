// export class Login {
//     constructor(
//       public userName: string,
//       public password: string,
//       public rememberMe: boolean = false ,
      
//     ) {}
//   }

// export class AuthResponseModel {
//   constructor(
//     public email:string,
//     public userName:string,
//     public otp:string,
//     otpExpiryTime:string,
//     public empid :number 
//   ) { }
// }


//==============================================================

export class Login {
  constructor(
    public userName: string,
    public password: string,
    public rememberMe: boolean = false ,
    
  ) {}
}

export class AuthResponseModel {
constructor(
  public email:string,
  public userName:string,
  public otp:string,
  otpExpiryTime:string,
  public firstLogin:string,
  public roleName:string
) { }
}
export class VerifyOTPDto {
constructor(
  public userName:string,
  public password:string,
  public otp:string
) {}
}