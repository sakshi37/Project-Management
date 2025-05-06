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
    public empid :number 
  ) { }
}