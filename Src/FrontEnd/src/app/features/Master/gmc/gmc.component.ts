import { Component, OnInit } from '@angular/core';
import { GmcService } from '../../../services/gmc-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyMember } from '../../../Models/family-member-dto'; 
import { Employee, EmployeeSaveDto } from '../../../Models/gmc-model';

import { Gender } from '../../../Models/get-gender-dto';
import { UpdateService } from '../../../services/update-service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-gmc',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,NgxPaginationModule  ],
  templateUrl: './gmc.component.html',
  styleUrls: ['./gmc.component.css'],
})
export class GmcComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0];
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


  familyTypes: { id: number, label: string }[] = [];

  genders: Gender[] = [];



  familyList: FamilyMember[] = [];

  constructor(private gmcService: GmcService, private updateService: UpdateService) {
      

  }

  ngOnInit(): void {
    const code = localStorage.getItem('userName');
    if (code) {
      this.family.employeeCode = code;
      this.fetchEmployeeDetails(code);

    } else {
      alert('Employee code is missing in local storage!');
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
      alert('Could not fetch employee data.');
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
      alert('Employee code missing.');
      return;
    }

    this.gmcService.saveFamilyMemberDetails(this.family).subscribe({
      next: (res) => {
        console.log('Saved:', res);
        this.familyList.push({ ...this.family });
        alert('Family member details saved successfully!');
        this.clearFamilyForm();
      },
      error: (err) => {
        console.error('Error saving family member:', err);
        alert('Failed to save family member.');
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
  calculateAge(dateString: string): number {
  if (!dateString) return 0;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


  loadFamilyList(): void {
    this.gmcService.getFamilyList().subscribe({
      next: (data) => {
        this.familyList = data;
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
        alert('Failed to load family member types.');
      },
    });
  }

 saveEmployeeDetails(): void {
  // Sync values from display-only employee object to the DTO
  this.employees.code = this.employee.code;
  this.employees.fk_GenderId = this.employees.fk_GenderId ?? this.employee.fk_GenderId;

  // Optional: add validation check
  if (!this.employees.code || !this.employees.fk_GenderId) {
    alert('Employee code and gender are required.');
    return;
  }

  console.log('Sending employee data to backend:', this.employees);

  this.gmcService.saveEmployeeDetails(this.employees).subscribe({
    next: (res) => {
      alert('Employee saved!');
      this.employees = {
        code: '',
       fk_GenderId: 0,
      };
    },
    error: (err) => {
      console.error('Error saving employee:', err);
      if (err.error?.errors) {
        console.table(err.error.errors);
        alert('Validation failed. Check console for details.');
      } else {
        alert('Failed to save employee.');
      }
    }
  });
}



}
