import { Component, OnInit } from '@angular/core';
import { GmcService } from '../../../services/gmc-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FamilyMember } from '../../../Models/family-member-dto';
import { Employee } from '../../../Models/gmc-model';
import { FamilyMemberForm } from '../../../Models/gmc-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gmc',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gmc.component.html',
  styleUrls: ['./gmc.component.css'],
})
export class GmcComponent implements OnInit {
  employee: Employee = {
    name: '',
    code: '',
    address: '',
    designation: '',
    gender: '',
    pan: '',
    joinDate: '',
    birthDate: '',
    email: '',
    age: 0,
    emergencyContact: '',
    aadhar: '',
    // fill with all expected fields
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

  familyTypes: { id: number; label: string }[] = [];

  familyList: FamilyMember[] = [];

  constructor(private gmcService: GmcService) {}

  ngOnInit(): void {
    const code = localStorage.getItem('userName');
    if (code) {
      this.family.employeeCode = code;
    } else {
      alert('Employee code is missing in local storage!');
    }
    this.loadFamilyList();
    this.loadFamilyTypes();
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

  saveEmployeeDetails() {
    // Your form submission logic here
  }
}
