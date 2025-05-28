
export interface Employee {
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

