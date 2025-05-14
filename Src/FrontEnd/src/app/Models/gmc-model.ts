
export interface Employee {
    name: string;
    code: string;
    designation: string;
    // gender: string;
    // pan: string;
    // joinDate: string;
    // birthDate: string;
    // email: string;
    // age: number | null;
    // emergencyContact: string;
    // aadhar: string;
    // address: string;
    
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

