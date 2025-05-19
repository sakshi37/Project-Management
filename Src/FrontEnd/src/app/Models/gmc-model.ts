export interface Employee {
  emergencyNo: any;
  aadharCardNo: any;
  email: any;
  birthDate: any;
  joinDate: any;
  address: any;
  gender: any;
  pan: any;
  age: any;
  aadhar: any;
  emergencyContact: any;
  name: string;
  code: string;
  designation: string;
  fk_GenderId?: number;
}

export interface EmployeeSaveDto {
  code: string;
  address?: string;
  panNumber?: string;
  aadharCardNo?: string;
  joinDate?: string;
  birthDate?: string;
  email?: string;
  emergencyNo?: string;
  age?: number;
  fk_GenderId?: number;
}
