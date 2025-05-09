export interface UpdateEmployeeDto {
    code: string;
    address: string;
    mobileNo: string;
    skypeId: string;
    email: string;
    joinDate: string;       // ISO date string
    bccEmail: string;
    panNumber: string;
    birthDate: string;      // ISO date string
    image: string;          // base64 string or file name
    signature: string;      // base64 string or file name
    loginStatus: boolean;
    leftCompany: boolean;
    leaveCompany: string;   // ISO date string
    locationId: number;
    designationId: number;
    shiftId: number;
    employeeTypeId: number;
    userGroupId: number;
    branchId: number;
    divisionId: number;
  }