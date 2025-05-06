
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
  
  export interface FamilyMember {
    member: string;
    name: string;
    birthDate: string;
    age: number | null;
    relation: string;
  }
  