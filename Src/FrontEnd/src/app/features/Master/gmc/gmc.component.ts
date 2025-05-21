import { Component, OnInit } from '@angular/core';
import { GmcService } from '../../../services/gmc-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyList, FamilyMember } from '../../../Models/family-member-dto'; 
import { Employee, EmployeeSaveDto } from '../../../Models/gmc-model';

import { Gender } from '../../../Models/get-gender-dto';
import { UpdateService } from '../../../services/update-service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-gmc',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,NgxPaginationModule  ],
  templateUrl: './gmc.component.html',
  styleUrls: ['./gmc.component.css'],
})
export class GmcComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0];
  isAgeValid: boolean = true;

  employee: Employee = {
    name: '',
    code: '',
    designation: '',
    fk_GenderId:0
  };
employees: EmployeeSaveDto = {
  code: '',
  address: '',
  panNumber: '',
  aadharCardNo: '',
  joinDate: '',
  birthDate: '',
  email: '',
  emergencyNo: '',
  age: 0,
  fk_GenderId: 0
};

  family: FamilyMember = {
    fk_FamilyMemberTypeId: 0,
    employeeCode: '',
    familyMemberName: '',
    birthDate: new Date(),
    age: 0,
    relationWithEmployee: '',
    familyStatus: true,
  };

  familyList:FamilyList={
  familyMemberTypeName:'',
  familyMemberName:'',
  birthDate:new Date(),
  age:0,
  relationWithEmployee:''
  }


  familyTypes: { id: number, label: string }[] = [];

  genders: Gender[] = [];

  familyLists: FamilyList[] = [];

  constructor(private gmcService: GmcService, private updateService: UpdateService) {
  }

  ngOnInit(): void {
    const code = localStorage.getItem('userName');
    if (code) {
      this.family.employeeCode = code;
      this.fetchEmployeeDetails(code);

    } else {
       alert("employee code not in the local storage")
    }
    this.loadFamilyList();

    this.loadFamilyTypes()
    this.loadGenders();

  }

  fetchEmployeeDetails(code: string): void {
  this.gmcService.getEmployeeByCode(code).subscribe({
    next: (res: any) => {
      this.employee = {
        name: res.name,
        code: res.code,
        designation: res.designationName // mapping API field to model
      };
    },
    error: (err) => {
      console.error('Failed to fetch employee:', err);
      Swal.fire({
  toast: true,
  text: 'Could not fetch employee data.',
  position: 'top',
  timer: 3000,
  showConfirmButton: false
});
    }
  });
}
loadGenders():void{
    this.updateService.getAllGenders().subscribe((data: Gender[]) => {
  this.genders = data;
});   
  }

  saveFamilyDetails(): void {
    if (!this.family.employeeCode) {
       Swal.fire({
    toast: true,
    text: 'Employee code missing.',
    position: 'top',
    timer: 3000,
    showConfirmButton: false
  });
      return;
    }

    this.gmcService.saveFamilyMemberDetails(this.family).subscribe({
      next: (res) => {
        console.log('Saved:', res);
        this.familyLists.push({ ...this.familyList });
         Swal.fire({
      toast: true,
      icon: 'success',
      text: 'Family member details saved successfully!',
      position: 'top',
      timer: 3000,
      showConfirmButton: false
    });
        this.clearFamilyForm();
      },
      error: (err) => {
        console.error('Error saving family member:', err);
        const errorMessage = err.error?.message || 'Failed to save family member.';

         Swal.fire({
        toast: true,
        icon: 'error',
        text: errorMessage,
        position: 'top',
        timer: 3000,
        showConfirmButton: false
      });
      },
    });
  }

  clearFamilyForm(): void {
    this.family = {
      fk_FamilyMemberTypeId: 0,
      employeeCode: localStorage.getItem('employeeCode') || '',
      familyMemberName: '',
      birthDate: new Date(),
      age: 0,
      relationWithEmployee: '',
      familyStatus: true,
    };
  }
 
  calculateAge(birthDate: Date, referenceDate: Date): number {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const m = referenceDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

onFamilyBirthDateChange(birthDateStr: string) {
  const birthDate = new Date(birthDateStr);
  this.family.age = this.calculateAge(birthDate, this.todayAsDate);
}

validateAge(){
  if (!this.employees.birthDate || !this.employees.joinDate) {
    this.isAgeValid = true;
    return;
  }

  
  const birthDate = new Date(this.employees.birthDate);
  const joinDate = new Date(this.employees.joinDate);

  const ageDiff = this.calculateAge(birthDate, joinDate);
  this.isAgeValid = ageDiff >= 18;
}
get todayAsDate(): Date {
  return new Date(this.today);
}


onEmployeeBirthDateChange(birthDateStr: string) {
  const birthDate = new Date(birthDateStr);
  this.employees.age = this.calculateAge(birthDate, this.todayAsDate);
  this.validateAge(); // Optional, if you want to validate 18+ age
}

 loadFamilyList(): void {
  const employeeCode = localStorage.getItem('userName'); // Make sure it's set somewhere earlier

  if (!employeeCode) {
    console.error('Employee code not found in localStorage.');
    return;
  }

  
 this.gmcService.getFamilyList(employeeCode).subscribe({
  next: (data) => {
    this.familyLists = data.map(familylist => {
      const dt = new Date(familylist.birthDate);
      return {
        familyMemberTypeName: familylist.familyMemberTypeName ?? '',
        familyMemberName: familylist.familyMemberName,
        birthDate: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()),  // date only, time zeroed
        age: familylist.age,
        relationWithEmployee: familylist.relationWithEmployee,
      };
    });
  },
  error: (err) => {
    console.error('Error loading list:', err);
  },
});

}

  loadFamilyTypes(): void {
    this.gmcService.getAllFamilyMemberType().subscribe({
      next: (data) => {
        this.familyTypes = data.map((type) => ({
          id: type.familyMemberTypeId,
          label: type.familyMemberTypeName,
        }));
      },
      error: (err) => {
        console.error('Error loading family member types:', err);
        Swal.fire({
  toast: true,
  text: 'Failed to load family member types.',
  position: 'top',
  timer: 3000,
  showConfirmButton: false
});
      },
    });
  }

 saveEmployeeDetails(): void {
  // Sync values from display-only employee object to the DTO
  this.employees.code = this.employee.code;
  this.employees.fk_GenderId = this.employees.fk_GenderId ?? this.employee.fk_GenderId;

  // Optional: add validation check
  if (!this.employees.code || !this.employees.fk_GenderId) {
     Swal.fire({
    toast: true,
    icon: 'error',
    text: 'Employee code and gender are required.',
    position: 'top',
    timer: 3000,
    showConfirmButton: false
  });
    return;
  }

  console.log('Sending employee data to backend:', this.employees);

  this.gmcService.saveEmployeeDetails(this.employees).subscribe({
    next: (res) => {
       Swal.fire({
      toast: true,
      icon: 'success',
      text: 'Employee details are saved!',
      position: 'top',
      timer: 3000,
      showConfirmButton: false
    });
      this.employees = {
        code: '',
       fk_GenderId: 0,
      };
    },
    error: (err) => {
      console.error('Error saving employee:', err);
      if (err.error?.errors) {
        console.table(err.error.errors);
        Swal.fire({
        toast: true,
        icon: 'error',
        text: 'Validation failed. Check details.',
        position: 'top',
        timer: 3000,
        showConfirmButton: false
      });
      } else {
        Swal.fire({
        toast: true,
        icon: 'error',
        text: 'Failed to save employee.',
        position: 'top',
        timer: 3000,
        showConfirmButton: false
      });
      }
    }
  });
}

exportToExcel(): void {
  const employeeData = [{
    Name: this.employee.name,
    Code: this.employee.code,
    Address: this.employees.address,
    Designation: this.employee.designation,
    Gender: this.employees.fk_GenderId,
    PAN: this.employees.panNumber,
    'Join Date': this.employees.joinDate,
    'Birth Date': this.employees.birthDate,
    Age: this.employees.age,
    Email: this.employees.email,
    'Emergency Contact': this.employees.emergencyNo,
    Aadhar: this.employees.aadharCardNo
  }];

  const familyData = this.familyLists.map((f: any, index: number) => ({
    'Sr No': index + 1,
    'Family Member': f.familyMemberTypeName,
    Name: f.familyMemberName,
    'Birth Date': f.birthDate,
    Age: f.age,
    Relation: f.relationWithEmployee
  }));

  const employeeSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employeeData);
  const familySheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(familyData);

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, employeeSheet, 'Employee Details');
  XLSX.utils.book_append_sheet(wb, familySheet, 'Family Details');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'GMC_Details.xlsx');
}


}
