export class ChangePasswordModel {
 
    constructor(
      public userName:string,
      public oldPassword:string,
      public newPassword:string,
      public confirmPassword:string)
     {}
  }