import { Component, OnInit } from '@angular/core';
import { Employee, FamilyMember } from '../../../Models/gmc-model';
import { GmcService } from '../../../services/gmc-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gmc',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './gmc.component.html',
  
  styleUrls: ['./gmc.component.css']
})
export class GmcComponent implements OnInit {
  employee: Employee = {
    name: 'Vaishnavi', //read only
    code: '6189', //read only
    designation: 'HOD IT', //read only
    gender: '',
    pan: '',
    joinDate: '',
    birthDate: '',
    email: '',
    age: null,
    emergencyContact: '',
    aadhar: '',
    address: ''
  };

  family: FamilyMember = {
    member: '',
    name: '',
    birthDate: '',
    age: null,
    relation: ''
  };

  familyTypes: string[] = ['Spouse', 'Mother', 'Father', 'Child', 'Other'];
  familyList: FamilyMember[] = [];

  constructor(private gmcService: GmcService) {}

  ngOnInit(): void {
    this.loadFamilyList();
  }

  saveEmployeeDetails(): void {
    this.gmcService.saveEmployeeDetails(this.employee).subscribe({
      next: (response) => {
        console.log('Employee details saved:', response);
        alert('Employee details saved successfully!');
      },
      error: (err: any) => {
        console.error('Failed to save employee details:', err);
        alert('Failed to save employee details.');
      }
    });
  }

  saveFamilyDetails(): void {
    this.gmcService.saveFamilyMemberDetails(this.family).subscribe({
      next: (response) => {
        console.log('Family member saved:', response);
        this.familyList.push({ ...this.family });
        alert('Family member details saved successfully!');
        this.clearFamilyForm();
      },
      error: (err: any) => {
        console.error('Failed to save family member:', err);
        alert('Failed to save family member.');
      }
    });
  }

  clearFamilyForm(): void {
    this.family = {
      member: '',
      name: '',
      birthDate: '',
      age: null,
      relation: ''
    };
  }

  loadFamilyList(): void {
    this.gmcService.getFamilyList().subscribe({
      next: (data) => {
        this.familyList = data;
      },
      error: (err: any) => {
        console.error('Failed to load family list:', err);
      }
    });
  }
}
