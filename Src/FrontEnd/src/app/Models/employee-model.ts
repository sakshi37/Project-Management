export interface EmployeeModel {
  id: number;
  name: string;
  code: string;
  designationName: string;
}
export interface Employee {
  photo: string | null;
  name: string;
  code: string;
  genderType: string;
  countryName: string;
  cityName: string;
  StateName: string;
  designationName: string;
  branchName: string;
  divisionName: string;
  userGroupName: string;
  locationName: string;
  employeeType: string;
  loginStatus: 'Active' | 'Inactive';
  action: string;
}

export interface EmployeeResponse {
  data: Employee[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
export interface GetEmployeesAll {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
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
