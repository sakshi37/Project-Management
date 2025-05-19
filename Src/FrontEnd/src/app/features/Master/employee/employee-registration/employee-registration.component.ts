import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
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
import { CityService } from '../../../../services/city.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationService } from '../../../../services/location-service';

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
  countries: { id: number; name: string }[] = [];
  states: { id: number; name: string; countryId: number }[] = [];
  cities: { id: number; name: string; stateId: number }[] = [];
  locations: { id: number; name: string }[] = [];
  filteredStates: { id: number; name: string }[] = [];
  filteredCities: { id: number; name: string }[] = [];

  selectedImage: string | null = null;
  selectedSignature: string | null = null;

  fileErrors = {
    image: false,
    signature: false,
  };

  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.loadStates();
    this.loadCities();
    this.getLocation();

    // Filter states on country change
    this.employeeForm.get('CountryId')?.valueChanges.subscribe((countryId) => {
      this.filterStates(countryId);
    });

    // Filter cities on state change
    this.employeeForm.get('StateId')?.valueChanges.subscribe((stateId) => {
      this.filterCities(stateId);
    });
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
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
      joinDate: ['', [Validators.required, this.noFutureDateValidator]],
      birthDate: ['', [Validators.required, this.minAgeValidator(18)]],
      bccEmail: [''],
      panNumber: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)]],
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
  getLocation() {
    this.locationService.getAllLocations().subscribe({
      next: (data) => {
        this.locations = data.map((m) => ({
          id: m.locationId,
          name: m.locationName,
        }));
      },
      error: (e) => console.log(e),
    });
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data.map((country) => ({
          id: country.countryId,
          name: country.countryName,
        }));
      },
    });
  }

  loadStates(): void {
    this.stateService.getAllStates().subscribe({
      next: (data) => {
        this.states = data.map((state) => ({
          id: state.stateId,
          name: state.stateName,
          countryId: state.countryId,
        }));
        this.filterStates(this.employeeForm.get('CountryId')?.value);
      },
    });
  }

  loadCities(): void {
    this.cityService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data.map((city) => ({
          id: city.cityId,
          name: city.cityName,
          stateId: city.stateId,
        }));
        this.filterCities(this.employeeForm.get('StateId')?.value);
      },
    });
  }

  filterStates(countryId: any): void {
    const id = Number(countryId);
    this.filteredStates = this.states.filter((state) => state.countryId === id);
  }

  filterCities(stateId: number): void {
    const id = Number(stateId);
    this.filteredCities = this.cities.filter((c) => c.stateId === id);
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (!val) return null;
    const inputDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today ? { futureDate: true } : null;
  }

  minAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age < minAge
        ? { minAge: { requiredAge: minAge, actualAge: age } }
        : null;
    };
  }

  onFileChange(event: any, controlName: 'image' | 'signature') {
    const file = event.target.files[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];

      if (!validTypes.includes(file.type)) {
        this.fileErrors[controlName] = true;
        this.employeeForm.patchValue({ [controlName]: null });
        event.target.value = '';
        return;
      }

      this.fileErrors[controlName] = false;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        this.employeeForm.patchValue({ [controlName]: base64 });
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    this.employeeForm.reset({
      loginStatus: false,
    });
    this.selectedImage = null;
    this.selectedSignature = null;
    this.filteredStates = [];
    this.filteredCities = [];
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const emp: CreateModel = {
      ...this.employeeForm.value,
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
  cancel() {
    this.employeeForm.reset();
    this.router.navigate(['/employee']);
  }
}
