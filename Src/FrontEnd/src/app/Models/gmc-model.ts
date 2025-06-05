export interface Employee {
  name: string;
  code: string;
  designation: string;
  gender:string;
  fk_GenderId?: number;
  address?: string;
  panNumber?: string;
  aadharCardNo?: string;
  joinDate?: string;
  birthDate?: string;
  email?: string;
  age?: number;

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
