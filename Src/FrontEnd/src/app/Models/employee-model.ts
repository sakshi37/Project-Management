export class EmployeeModel {
}
export interface Employee {
    photo: string | null;
    name: string;
    code: string;
    designationName: string;
    branchName: string;
    divisionName: string;
    userGroupName: string;
    loginStatus: 'Active' | 'Inactive';
    action: string;
  }
  
  export interface EmployeeResponse {
    data: Employee[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  }
  
  export interface EmployeeFull extends Employee {
  address: string;
  mobileNo: string;
  skypeId: string;
  joinDate: string;
  email: string;
  bccEmail: string;
  panNumber: string;
  birthDate: string;
  signature: string | null;
  leftCompany: boolean;
  leftDate: string;
}
