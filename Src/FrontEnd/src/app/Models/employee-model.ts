export class EmployeeModel {
}
export interface Employee {
    photo: string | null;
    employeeName: string;
    employeeCode: string;
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
  