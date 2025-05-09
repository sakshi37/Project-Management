import { Component, OnInit } from '@angular/core';
import autoTable from 'jspdf-autotable';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateModel } from '../../../../Models/create-model';
import { EmployeeService } from '../../../../services/employee-service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    FormsModule,
  ],
})
export class EmployeeRegistrationComponent implements OnInit {
  employeeForm!: FormGroup;
  employees: CreateModel[] = [];
  locations: { id: number; name: string }[] = [];
  selectedImage: string | null = null;
  selectedSignature: string | null = null;
  isDisable: boolean = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLocation();
  }

  generateEmployeeCode(): string {
    const now = new Date();
    const yearMonth = now.getFullYear().toString().slice(-2);
    const random = Math.floor(100 + Math.random() * 900);
    return `EMP${yearMonth}${random}`;
  }

  getLocation() {
    this.employeeService.getAllLocation().subscribe({
      next: (data) => {
        const transeformdata = data.map((m) => {
          const id = m.locationId;
          console.log(id);

          const name = m.locationName;
          console.log(name);
          return { id: id, name: name };
        });
        console.log(transeformdata);
        this.locations = transeformdata;
      },

      error: (e) => {
        console.log(e);
      },
    });
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      code: [this.generateEmployeeCode()],
      address: ['', Validators.required],
      mobileNo: ['', Validators.required],
      skypeId: [''],
      email: ['', [Validators.required, Validators.email]],
      joinDate: ['', Validators.required],
      bccEmail: [''],
      panNumber: [''],
      birthDate: ['', Validators.required],
      image: [''],
      signature: [''],
      loginStatus: [],

      locationId: [0],
      designationId: [1],
      shiftId: [1],
      employeeTypeId: [1],
      usergroupId: [1],
      branchId: [1],
      divisionId: [1],
    });
  }

  resetForm(): void {
    this.employeeForm.reset({
      code: this.generateEmployeeCode(),
      loginStatus: true,
      leftCompany: false,
      leaveCompany: false,
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const emp: CreateModel = {
      ...this.employeeForm.value,

      locationId: parseInt(this.employeeForm.value.locationId),
      birthDate: this.formatDate(this.employeeForm.value.birthDate),
      joinDate: this.formatDate(this.employeeForm.value.joinDate),
      // image: this.employeeForm.value.image?.replace(/['"]/g, '').trim() || null,
      // signature:
      //   this.employeeForm.value.signature?.replace(/['"]/g, '').trim() || null,
      image: this.selectedImage || null, // or the file path if you're saving the image path
      signature: this.selectedSignature || null,
    };

    // if (emp.leftCompany && !emp.leaveCompany) {
    //   emp.leaveCompany = new Date();
    // }

    console.log(emp);
    this.employeeService.createEmployee(emp).subscribe({
      next: () => {
        this.resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Employee created successfully!',
          confirmButtonColor: '#3085d6',
        });
      },
      error: (err) => {
        console.error('Error creating employee:', err);
        console.log(err);

        let errorMsg = 'Failed to create employee. Please try again.';
        if (err instanceof HttpErrorResponse && typeof err.error === 'string') {
          errorMsg = err.error;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMsg,
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  formatDate(date: string | Date): string {
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0];
  }

  // loadCountries(): void {
  //   this.countryService.getAllCountries().subscribe(res => this.countries = res);
  // }

  // loadStates(): void {
  //   this.stateService.getAllStates().subscribe(res => {
  //     this.states = res;
  //     // console.log('States:', this.states);

  //   });
  // }

  // getCountries(): void {
  //   this.countryService.getAllCountries().subscribe({
  //     next: (countries: GetCountryDto[]) => {
  //       this.countries = countries;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching countries:', err);
  //     }
  //   });
  // }

  // loadCountries(): void {
  //   this.countryService.getAllCountries().subscribe(res => this.countries = res);
  // }

  // loadStates(): void {
  //   this.stateService.getAllStates().subscribe(res => {
  //     this.states = res;
  //     // console.log('States:', this.states);
  //     this.filterStates();
  //   });
  // }

  // loadCities(): void {
  //   this.cityService.getAllCities().subscribe(res => this.cities = res);
  // }

  onFileChange(event: any, field: 'image' | 'signature'): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Extract only the Base64 part

        if (field === 'image') {
          this.selectedImage = base64String;
          this.employeeForm.patchValue({
            image: this.selectedImage,
          });
        } else if (field === 'signature') {
          this.selectedSignature = base64String;
          this.employeeForm.patchValue({
            signature: this.selectedSignature,
          });
        }
      };
    }
  }
}
