import { Component, OnInit } from '@angular/core';
import { GmcService } from '../../../services/gmc-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyList, FamilyMember } from '../../../Models/family-member-dto';
import { Employee, EmployeeSaveDto } from '../../../Models/gmc-model';

import { Gender } from '../../../Models/get-gender-dto';
import { UpdateService } from '../../../services/update-service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-gmc',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    gender: ''
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
    fk_GenderId: 0,
  };
  family: FamilyMember = {
    fk_FamilyMemberTypeId: 0,
    employeeCode: '',
    familyMemberName: '',
    fk_GenderId:0,
    birthDate: new Date(),
    age: 0,
    relationWithEmployee: '',
    familyStatus: true,
  };

  familyList: FamilyList = {
    familyMemberTypeName: '',
    familyMemberName: '',
    birthDate: new Date(),
    age: 0,
    relationWithEmployee: '',
  };

  familyTypes: { id: number; label: string }[] = [];

  genders: Gender[] = [];

  familyLists: FamilyList[] = [];

  constructor(
    private gmcService: GmcService,
    private updateService: UpdateService
  ) { }

  ngOnInit(): void {
    const decodedToken = jwtDecode(String(localStorage.getItem('token')));
    const code = decodedToken.sub;
    if (code) {
      this.family.employeeCode = code;
      this.fetchEmployeeDetails(code);

    } else {
      alert('employee code not in the local storage');
    }
    this.loadFamilyList();

    this.loadFamilyTypes();
    this.loadGenders();

  }
  

fetchEmployeeDetails(code: string): void {
  console.log('Fetching employee details for code:', code);

  this.gmcService.getEmployeeByCode(code).subscribe({
    next: (res: any) => {
      console.log('Raw response from API:', res);

      if (!res) {
        console.warn('No data received from API.');
        return;
      }

      // Format MMDDYYYY helper
     const formatDateForInput = (dateStr: string): string => {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = ('0' + (d.getMonth() + 1)).slice(-2);
  const dd = ('0' + d.getDate()).slice(-2);
  return `${yyyy}-${mm}-${dd}`;  // required format for input[type="date"]
};


      // Display object
      this.employee = {
        name: res.name,
        code: res.code,
        designation: res.designationName,
        gender: res.genderType,
      };

      // Save object
      this.employees = {
        code: res.code,
        address: res.address,
        panNumber: res.panNumber,
        aadharCardNo: res.aadharCardNo,
        joinDate: formatDateForInput(res.joinDate),  
  birthDate: formatDateForInput(res.birthDate), 
        email: res.email,
        emergencyNo: '', // Fill if available
        age: this.calculateAge(new Date(res.birthDate), new Date()),
        fk_GenderId: this.getGenderId(res.genderType),
      };

      console.log('Mapped display object:', this.employee);
      console.log('Mapped save object:', this.employees);
    },
    error: (err) => {
      console.error('Failed to fetch employee:', err);
      Swal.fire({
        toast: true,
        text: 'Could not fetch employee data.',
        position: 'top',
        timer: 3000,
        showConfirmButton: false,
      });
    },
  });
}


  loadGenders(): void {
    this.updateService.getAllGenders().subscribe((data: Gender[]) => {
      this.genders = data;
    });
  }

saveFamilyDetails(form: NgForm): void {
  if (form.invalid) {
    Swal.fire({
      toast: true,
      icon: 'warning',
      text: 'Please fill out all required fields correctly.',
      position: 'top',
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  if (!this.family.employeeCode) {
    Swal.fire({
      toast: true,
      text: 'Employee code missing.',
      position: 'top',
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  // ✅ Add this block here
  const birthDate = new Date(this.family.birthDate);
  const today = new Date();
  const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  if (birthDate < hundredYearsAgo || birthDate > today) {
    Swal.fire({
      toast: true,
      icon: 'warning',
      text: 'Birth Date must be within the past 100 years.',
      position: 'top',
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  // ✅ Recalculate age for accuracy before saving
  this.family.age = this.calculateAge(birthDate, today);

  this.gmcService.saveFamilyMemberDetails(this.family).subscribe({
    next: (res) => {
      console.log('Saved:', res);
      this.familyLists.push({
        familyMemberTypeName: this.getFamilyMemberTypeName(this.family.fk_FamilyMemberTypeId),
        familyMemberName: this.family.familyMemberName,
        birthDate: this.family.birthDate,
        age: this.family.age,
        relationWithEmployee: this.family.relationWithEmployee,
      });
      Swal.fire({
        toast: true,
        icon: 'success',
        text: 'Family member details saved successfully!',
        position: 'top',
        timer: 3000,
        showConfirmButton: false,
      });
      this.clearFamilyForm();
    },
    error: (err) => {
      const errorMessage =
        err?.error?.message ||
        err?.error?.error ||
        err?.message ||
        'Failed to save family member.';

      Swal.fire({
        toast: true,
        icon: 'error',
        text: errorMessage,
        position: 'top',
        timer: 3000,
        showConfirmButton: false,
      });
    },
  });
}


getGenderId(gender: string): number {
  switch (gender.toLowerCase()) {
    case 'male':
      return 1;
    case 'female':
      return 2;
    default:
      return 0;
  }
}

  clearFamilyForm(): void {
    this.family = {
      fk_FamilyMemberTypeId: 0,
      employeeCode: localStorage.getItem('employeeCode') || '',
      familyMemberName: '',
      fk_GenderId:0,
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

  // Ensure age is within 0 to 100
  if (age < 0 || age > 100) {
    return 0;
  }

  return age;
}


  onFamilyBirthDateChange(birthDateStr: string) {
    const birthDate = new Date(birthDateStr);
    this.family.age = this.calculateAge(birthDate, this.todayAsDate);
  }

  validateAge() {
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
    const decodedToken: { sub: string } = jwtDecode(String(localStorage.getItem('token')));
const employeeCode: string = decodedToken.sub;
    if (!employeeCode) {
      console.error('Employee code not found in localStorage.');
      return;
    }

    this.gmcService.getFamilyList(employeeCode).subscribe({
      next: (data) => {
        this.familyLists = data.map((familylist) => {
          const dt = new Date(familylist.birthDate);
          return {
            familyMemberTypeName: familylist.familyMemberTypeName ?? '',
            familyMemberName: familylist.familyMemberName,
            birthDate: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()), // date only, time zeroed
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
          console.log('Mapped familyTypes:', this.familyTypes); // Check content

      },
      error: (err) => {
        console.error('Error loading family member types:', err);
        Swal.fire({
          toast: true,
          text: 'Failed to load family member types.',
          position: 'top',
          timer: 3000,
          showConfirmButton: false,
        });
      },
    });
  }
  getFamilyMemberTypeName(typeId: any): string {
  const type = this.familyTypes.find((t) => t.id === +typeId); // Ensure number
  return type ? type.label : '';
}

//  saveEmployeeDetails(form: NgForm): void {
//   if (form.invalid) {
//     form.control.markAllAsTouched();
//     Swal.fire({
//       toast: true,
//       icon: 'error',
//       text: 'Please fill out all required fields correctly.',
//       position: 'top',
//       timer: 3000,
//       showConfirmButton: false,
//     });
//     return;
//   }

//   // Sync code from employee (readonly) to employees before saving
//   this.employees.code = this.employee.code;
//   this.employees.fk_GenderId = this.employees.fk_GenderId ?? this.employee.fk_GenderId;

//   console.log('Sending employee data to backend:', this.employees);

//   this.gmcService.saveEmployeeDetails(this.employees).subscribe({
//     next: (res) => {
//       Swal.fire({
//         toast: true,
//         icon: 'success',
//         text: 'Employee details are saved!',
//         position: 'top',
//         timer: 3000,
//         showConfirmButton: false,
//       });

//       // Reset only editable fields in employees, keep code/name/designation untouched (they are in employee)
//       this.employees = {
//         code: this.employee.code,      // keep original code
//         fk_GenderId: 0,               // reset gender selection
//         address: '',
//         panNumber: '',
//         aadharCardNo: '',
//         joinDate: '',
//         birthDate: '',
//         email: '',
//         emergencyNo: '',
//         age: 0,
//       };

//       // Reset form with new values for employees (excluding employee fields)
//       form.resetForm({
//         address: '',
//         panNumber: '',
//         aadharCardNo: '',
//         joinDate: '',
//         birthDate: '',
//         email: '',
//         emergencyNo: '',
//         age: 0,
//         fk_GenderId: 0,
//       });
//     },
//     error: (err) => {
//       console.error('Error saving employee:', err);
//       const backendMessage = err?.error?.message || err?.error?.title || 'Failed to save employee.';
//       Swal.fire({
//         toast: true,
//         icon: 'error',
//         text: backendMessage,
//         position: 'top',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     },
//   });
// }
getGenderLabel(genderId: number | undefined): string {
  switch (genderId) {
    case 1: return 'Male';
    case 2: return 'Female';
    case 3: return 'Other';
    default: return 'Unknown';
  }
}


  exportToExcel(): void {
    const employeeData = [
      {
        Name: this.employee.name,
        Code: this.employee.code,
        Address: this.employees.address,
        Designation: this.employee.designation,
      Gender: this.getGenderLabel(this.employees.fk_GenderId), // ⬅️ Use label
        PAN: this.employees.panNumber,
        'Join Date': this.employees.joinDate,
        'Birth Date': this.employees.birthDate,
        Age: this.employees.age,
        Email: this.employees.email,
        'Emergency Contact': this.employees.emergencyNo,
        Aadhar: this.employees.aadharCardNo,
      },
    ];

    const familyData = this.familyLists.map((f: any, index: number) => ({
      'Sr No': index + 1,
      'Family Member': f.familyMemberTypeName,
      Name: f.familyMemberName,
      'Birth Date': f.birthDate,
      Age: f.age,
      Relation: f.relationWithEmployee,
    }));

    const employeeSheet: XLSX.WorkSheet =
      XLSX.utils.json_to_sheet(employeeData);
    const familySheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(familyData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, employeeSheet, 'Employee Details');
    XLSX.utils.book_append_sheet(wb, familySheet, 'Family Details');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      'GMC_Details.xlsx'
    );
  }
}
  