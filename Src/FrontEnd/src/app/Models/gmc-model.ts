
export interface Employee {
    name: string;
    code: string;
    designation: string;
    gender: string;
    pan: string;
    joinDate: string;
    birthDate: string;
    email: string;
    age: number | null;
    emergencyContact: string;
    aadhar: string;
    address: string;
    
  }
  
 export interface FamilyMemberForm {
  member: string;              // dropdown value like "Father"
  name: string;                // actual name input
  birthDate: string;           // input type="date" gives string
  age: number | null;
  relation: string;
  familyStatus: boolean;
}
