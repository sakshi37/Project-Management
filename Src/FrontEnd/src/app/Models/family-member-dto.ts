export interface FamilyMember {
  fk_FamilyMemberTypeId: number;
  employeeCode: string;
  familyMemberName: string;
  birthDate: Date;
  age: number;
  relationWithEmployee: string;
  familyStatus: boolean;
}


export interface FamilyList{
  familyMemberTypeName:string,
  familyMemberName:string,
  birthDate:Date,
  age:number,
  relationWithEmployee:string
}
