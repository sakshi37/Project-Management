import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateModel } from '../../../../Models/create-model';
import { EmployeeService } from '../../../../services/employee-service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CountryService } from '../../../../services/country.service.service';
import { StateService } from '../../../../services/state.service';
import { CityComponent } from '../../settings/city/city.component';
import { CityService } from '../../../../services/city.service';

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
    RouterModule,
  ],
})
export class EmployeeRegistrationComponent implements OnInit {
  employeeForm!: FormGroup;
  locations: { id: number; name: string }[] = [];
  countries: { id: number; name: string }[] = [];
  states: { id: number; name: string; countryId: number }[] = [];
  cities: { id: number; name: string }[] = [];
  selectedImage: string | null = null;
  selectedSignature: string | null = null;
  filteredStates: { id: number; name: string }[] = [];
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLocation();
    this.getState();
    this.getCountry();
    this.getCity();

    // Trigger filtering of states when CountryId changes
    this.employeeForm.get('CountryId')?.valueChanges.subscribe((countryId) => {
      this.filterStates(countryId); // Update filtered states based on countryId
    });
  }

  getLocation() {
    this.employeeService.getAllLocation().subscribe({
      next: (data) => {
        this.locations = data.map((m) => ({
          id: m.locationId,
          name: m.locationName,
        }));
      },
      error: (e) => console.log(e),
    });
  }

  getState() {
    this.stateService.getAllStates().subscribe({
      next: (data) => {
        this.states = data.map((state) => ({
          id: state.stateId,
          name: state.stateName,
          countryId: state.countryId,
        }));
        this.filterStates(this.employeeForm.get('CountryId')?.value);
      },
      error: (err) => console.error('Error fetching states:', err),
    });
  }

  getCity() {
    this.cityService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data.map((city) => ({
          id: city.cityId,
          name: city.cityName,
        }));
      },
    });
  }
  getCountry() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data.map((country) => ({
          id: country.countryId,
          name: country.countryName,
        }));
      },
    });
  }

  filterStates(countryId: number): void {
    this.filteredStates = this.states.filter(
      (state) => state.countryId === countryId
    );
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      code: [''],
      address: ['Vikroli (w)', Validators.required],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      skypeId: ['dgcgdecfy'],
      email: ['', [Validators.required, Validators.email]],
      joinDate: [
        '',
        [Validators.required, this.noFutureDateValidator.bind(this)],
      ],
      bccEmail: [''],
      panNumber: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)]],
      birthDate: [
        '',
        [Validators.required, Validators.required, this.minAgeValidator(18)],
      ],
      image: [''],
      signature: [''],
      loginStatus: [false],
      locationId: [1],
      designationId: [2],
      shiftId: [1],
      employeeTypeId: [1],
      usergroupId: [1],
      branchId: [1],
      divisionId: [1],
      CountryId: [1],
      StateId: [1],
      CityId: [1],
      GenderId: [1],
    });
  }

  resetForm(): void {
    this.employeeForm.reset({
      loginStatus: false,
      leftCompany: false,
      leaveCompany: false,
    });
    this.selectedImage = null;
    this.selectedSignature = null;
    this.filteredStates = [];
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
      image: this.selectedImage || null,
      signature: this.selectedSignature || null,
    };

    this.employeeService.createEmployee(emp).subscribe({
      next: () => {
        this.resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Employee created successfully!',

          confirmButtonColor: '#3085d6',
        });
        this.router.navigate(['/employee']);
      },
      error: (err) => {
        console.error('Error creating employee:', err);
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
  minAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      if (!control.value) return null;

      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      const isBirthdayPassed =
        m > 0 || (m === 0 && today.getDate() >= birthDate.getDate());
      const actualAge = isBirthdayPassed ? age : age - 1;

      return actualAge < minAge
        ? { minAge: { requiredAge: minAge, actualAge } }
        : null;
    };
  }

  noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (!val) return null;
    const inputDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    return inputDate > today ? { futureDate: true } : null;
  }

  formatDate(date: string | Date): string {
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0];
  }

  onFileChange(event: any, field: 'image' | 'signature'): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (field === 'image') {
          this.selectedImage = base64String;
          this.employeeForm.patchValue({ image: this.selectedImage });
        } else if (field === 'signature') {
          this.selectedSignature = base64String;
          this.employeeForm.patchValue({ signature: this.selectedSignature });
        }
      };
    }
  }
  cancel() {
    this.employeeForm.reset();
    this.router.navigate(['/employee']);
  }
}
