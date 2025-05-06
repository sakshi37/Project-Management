export interface CreateModel {
  name: string;
  code: string;
  address: string;
  mobileNo: string;
  skypeId: string;
  email: string;
  joinDate: Date | string;
  bccEmail: string;
  panNumber: string;
  birthDate: Date | string;
  image: string | null;
  signature: string | null;
  loginStatus: boolean;
  leftCompany?: boolean;
  // leaveCompany?: boolean | null | undefined | Date;
  locationId: number;
  designationId: number;
  shiftId: number;
  employeeTypeId: number;
  usergroupId: number;
  branchId: number;
  divisionId: number;
}
