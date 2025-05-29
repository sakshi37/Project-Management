import { Component, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from '../../../../services/designation.service';
import { GetDesignationDto } from '../../settings/designation/Models/get-designation.dto';
import { UpdateService } from '../../../../services/update-service';
import { BranchService } from '../../../../services/branch-service';
import { Branch } from '../../../../Models/branch-model';
import { UserGroup } from '../../../../Models/get-user-group-dto';
import { count, forkJoin } from 'rxjs';
import { Shift } from '../../../../Models/get-shift-dto';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../../Models/gmc-model';
import { EmployeeType } from '../../../../Models/get-employee-type-dto';
import { GetCityDto } from '../../settings/city/Models/get-city.dto';
import { CityService } from '../../../../services/city.service';
import { CityComponent } from '../../settings/city/city.component';
import { GetCountryDto } from '../../settings/country/Models/get-country.dto';
import { CountryService } from '../../../../services/country.service.service';
import { StateService } from '../../../../services/state.service';
import { GetStateDto } from '../../settings/state/Models/get-state.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import { LocationService } from '../../../../services/location-service';
import { GetLocationDto } from '../../settings/location/Models/get-location-dto';
import { DivisionService } from '../../../../services/division.service';
import { GetDivisionDto } from '../../settings/division/division/Models/get-division.dto.service';
import { Gender } from '../../../../Models/get-gender-dto';
import Swal from 'sweetalert2';

//import { LocationService } from '../../../../services/location.service';

@Component({
  selector: 'app-update-employee',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  selectedEmployeeCode: string = '';
  selectedEmployeeName: string = '';
  designations: GetDesignationDto[] = [];
  imageBase64: string = '';
  signatureBase64: string = '';
  locations: GetLocationDto[] = [];
  shifts: Shift[] = [];
  employeeTypes: EmployeeType[] = [];
  branches: Branch[] = [];
  userGroups: UserGroup[] = [];
  divisions: GetDivisionDto[] = [];
  cities: GetCityDto[] = [];
  countries: GetCountryDto[] = [];
  states: GetStateDto[] = [];
  filteredStates: GetStateDto[] = [];
  filteredCities: any[] = [];
  genders: Gender[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private designationService: DesignationService,
    private updateService: UpdateService,
    private locationService: LocationService,
    private divisionService: DivisionService,
    private cityService: CityService,
    private countryService: CountryService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    
    this.employeeForm = this.fb.group(
      {
        Name: [{ value: '', disabled: true }], 
        address: [''],
        mobileNo: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
        skypeId: ['', [Validators.minLength(10), Validators.maxLength(32)]],
        email: [
          '',
          [
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/
            ),
          ],
        ],
        bccEmail: [
          '',
          [
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/
            ),
          ],
        ],
        panNumber: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)]],
        joinDate: ['', [this.noFutureDateValidator]],
        birthDate: ['', [this.noFutureDateValidator]],
        aadharCardNo: ['', [Validators.pattern(/^\d{12}$/)]],
        genderId: [''],
        countryId: [''],
        stateId: [''],
        cityId: [''],
        loginStatus: [false],
        leftCompany: [false],
        leaveCompany: ['', [this.noFutureDateValidator]],
        locationId: [''],
        designationId: [''],
        shiftId: [''],
        employeeTypeId: [''],
        userGroupId: [''],
        branchId: [''],
        divisionId: [''],
      },
      { validators: this.validateAgeValidator.bind(this) }
    );
    const emp = history.state.employee;
    console.log("Origin of emp : ", emp)
    const empName = history.state.name;
    if (empName) {
  this.selectedEmployeeName = empName;
}

    forkJoin({
      branches: this.branchService.getBranches(),
      designations: this.designationService.getAllDesignations(),
      userGroups: this.updateService.getAllUserGroups(),
      shifts: this.updateService.getAllShifts(),
      genders: this.updateService.getAllGenders(),
      employeeTypes: this.updateService.getEmployeeTypes(),
      cities: this.cityService.getAllCities(),
      countries: this.countryService.getAllCountries(),
      states: this.stateService.getAllStates(),
      locations: this.locationService.getAllLocations(),
      divisions: this.divisionService.getAllDivisions(),
    }).subscribe(
      ({
  branches,
  designations,
  userGroups,
  shifts,
  employeeTypes,
  cities,
  countries,
  states,
  locations,
  divisions,
  genders,
}) => {
  // Filter/map branches
  this.branches = branches
    .filter((b) => b.branchStatus === true)
    .map((b) => ({
      branchId: b.branchId,
      branchName: b.branchName,
      cityId: b.cityId,
      cityName: b.cityName,
      stateName: b.stateName,
      branchStatus: b.branchStatus,
    }));

  // Map and trim countries
 this.countries = countries.map(c => ({
  countryId: c.countryId,
  countryName: c.countryName?.trim(),
  countryCode: c.countryCode,      // Add this
  countryStatus: c.countryStatus,  // Add this
}));
  // Map and trim states
 this.states = states.map(s => ({
  stateId: s.stateId,
  stateName: s.stateName?.trim(),
  stateCode: s.stateCode,  
  stateStatus: s.stateStatus,    
  countryId: s.countryId,
  countryName: s.countryName,     
}));

  // Map and trim cities
 this.cities = cities.map(c => ({
  cityId: c.cityId,
  cityName: c.cityName?.trim(),
  cityStatus: c.cityStatus,        // Add this
  stateId: c.stateId,
  stateName: c.stateName,          
  countryId: c.countryId,          // Add this if required
  countryName: c.countryName,      // Add this if required
}));


  this.designations = designations;
  this.userGroups = userGroups;
  this.shifts = shifts;
  this.employeeTypes = employeeTypes;
  this.locations = locations;
  this.divisions = divisions;
  this.genders = genders;

  if (emp && emp.code) {
    this.selectedEmployeeCode = emp.code;
    this.employeeForm.reset();
    this.populateEmployeeForm(emp);
  } else {
    console.warn('No employee data found in navigation state.');
  }
}

    );
    this.employeeForm.get('countryId')?.valueChanges.subscribe(() => {
      this.filterStates();
    });
    this.employeeForm.get('stateId')?.valueChanges.subscribe(() => {
      this.filterCities();
    });
  }

  populateEmployeeForm(emp: any): void {
    this.employeeForm.patchValue({
Name: emp.name || this.selectedEmployeeName || '',
      address: emp.address || '',
      mobileNo: emp.mobileNo || '',
      skypeId: emp.skypeId || '',
      email: emp.email || '',
      joinDate: emp.joinDate?.split('T')[0] || '',
      bccEmail: emp.bccEmail || '',
      panNumber: emp.panNumber || '',
      birthDate: emp.birthDate?.split('T')[0] || '',
      loginStatus: emp.loginStatus || false,
      leftCompany: emp.leftCompany || false,
      leaveCompany: emp.leftDate?.split('T')[0] || '',
      locationId: emp.locationId || '',
      designationId: emp.designationId || '',
      shiftId: emp.shiftId || '',
      employeeTypeId: emp.employeeTypeId || '',
      userGroupId: emp.userGroupId || '',
      divisionId: emp.divisionId || '',
      aadharCardNo: emp.aadharCardNo || '',
      countryId: emp.countryId || '',
      stateId: emp.stateId || '',
      cityId: emp.cityId || '',
      genderId: emp.genderId || '',
    });

    // Map branchName → branchId
    const br = this.branches.find((b) => b.branchName === emp.branchName);
    if (br) {
      this.employeeForm.get('branchId')!.setValue(br.branchId);
    }
    // Country Name → countryId
const country = this.countries.find(c => c.countryName?.trim().toLowerCase() === emp.countryName?.trim().toLowerCase());
if(!country){console.log('emp.countryName:', emp.countryName);
console.log('Available countries:', this.countries.map(c => c.countryName));}
if(country){
  this.employeeForm.get('countryId')!.setValue(country.countryId);
  
}

// State Name → stateId
const state = this.states.find((s) => s.stateName === emp.stateName);
if (state) {
  this.employeeForm.get('stateId')!.setValue(state.stateId);
}

// City Name → cityId
const city = this.cities.find((c) => c.cityName === emp.cityName);
if (city) {
  this.employeeForm.get('cityId')!.setValue(city.cityId);
}
// Gender Name → genderId
const gender = this.genders.find((g) => g.genderType === emp.genderType);
if (gender) {
  this.employeeForm.get('genderId')!.setValue(gender.genderId);
}

// Designation Name → designationId
const designation = this.designations.find((d) => d.designationName === emp.designationName);
if (designation) {
  this.employeeForm.get('designationId')!.setValue(designation.designationId);
}

// Division Name → divisionId
const division = this.divisions.find((d) => d.divisionName === emp.divisionName);
if (division) {
  this.employeeForm.get('divisionId')!.setValue(division.divisionId);
  console.log("seleted division" ,division.divisionId)
}
// User Group Name → userGroupId
const userGroup = this.userGroups.find((g) => g.userGroupName === emp.userGroupName);
if (userGroup) {
  this.employeeForm.get('userGroupId')!.setValue(userGroup.userGroupId);
}
//shift
const shift=this.shifts.find((sf)=> sf.shiftType=== emp.shiftType);
if(shift){
  this.employeeForm.get('shiftId')!.setValue(shift.shiftId)
}
//employee type
console.log('[DEBUG] emp object:', emp);
console.log('[DEBUG] emp.employeeTypeId:', emp?.employeeTypeId);
console.log('[DEBUG] this.employeeTypes:', this.employeeTypes);

const emptype = this.employeeTypes.find(
  (et) => et.employeeType.trim().toLowerCase() === emp.employeeType?.trim().toLowerCase()
);

if (emptype) {
  this.employeeForm.get('employeeTypeId')!.setValue(emptype.employeeTypeId);
  console.log(`Selected employeeType ID: ${emptype.employeeTypeId}`);
} else {
  console.warn(`EmployeeType '${emp.employeeType}' not found in employeeTypes list`);
}

//location
const location = this.locations.find((l) => l.locationName === emp.locationName);

if (location) {
  this.employeeForm.get('locationId')!.setValue(location.locationId);
  console.log(`Selected location ID: ${location.locationId}`);
}


  }

  calculateAge(birthDate: Date, joinDate: Date): number {
    let age = joinDate.getFullYear() - birthDate.getFullYear();
    const m = joinDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && joinDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  validateAgeValidator(group: FormGroup): ValidationErrors | null {
    const birthDateValue = group.get('birthDate')?.value;
    const joinDateValue = group.get('joinDate')?.value;

    if (!birthDateValue || !joinDateValue) return null;

    const birthDate = new Date(birthDateValue);
    const joinDate = new Date(joinDateValue);

    // Use your existing calculateAge method
    const ageDiff = this.calculateAge(birthDate, joinDate);

    return ageDiff >= 18 ? null : { minAgeGap: true };
  }

  loadConutries(): void {
    this.countryService.getAllCountries().subscribe({
      next: (res) => {
        this.countries = res.filter((country) => country.countryStatus === 1);
      },
      error: (err) => console.error('Error loading Countries', err),
    });
  }

  loadStates(): void {
    this.stateService.getAllStates().subscribe({
      next: (res) => {
        console.log('[DEBUG] Raw state data:', res);
        this.states = res.filter((state) => state.stateStatus === true);
        this.filterStates(); // call only once after setting this.states
      },
      error: (err) => console.error('Error loading States', err),
    });
  }

  filterStates(): void {
    const countryId = +this.employeeForm.get('countryId')?.value;
    console.log('[DEBUG] Selected countryId:', countryId);
    console.log('[DEBUG] Available states:', this.states);

    this.filteredStates = this.states.filter(
      (state) => state.countryId === countryId && state.stateStatus === true
    );

    console.log('[DEBUG] Filtered states:', this.filteredStates);
  }

  loadCities(): void {
    this.cityService.getAllCities().subscribe({
      next: (res) => {
        this.cities = res.filter((city) => city.cityStatus === true);
      },
      error: (err) => console.error('Error loading cities', err),
    });
  }
  filterCities(): void {
    const stateId = +this.employeeForm.get('stateId')?.value;
    console.log("Selected state",stateId)
    this.filteredCities = this.cities.filter((c) => c.stateId === stateId);
  }
  loadShifts(): void {
    this.updateService.getAllShifts().subscribe((data) => {
      this.shifts = data;
    });
  }

  loadGenders(): void {
    this.updateService.getAllGenders().subscribe((data: Gender[]) => {
      this.genders = data;
    });
  }

  loadEmployeeTypes(): void {
    this.updateService.getEmployeeTypes().subscribe((data) => {
      this.employeeTypes = data;
    });
  }

  loadDesignations() {
    this.designationService.getAllDesignations().subscribe({
      next: (res) => {
        this.designations = res.filter(
          (designation) => designation.designationStatus === true
        );
      },
      error: (err) => {
        console.error('Error loading designations:', err);
      },
    });
  }

  loadBranches() {
    this.branchService.getBranches().subscribe({
      next: (res) => {
        this.branches = res
          .filter((branch) => branch.branchStatus === true)
          .map((branch) => ({
            branchId: branch.branchId,
            branchName: branch.branchName,
            cityId: branch.cityId,
            cityName: branch.cityName,
            stateName: branch.stateName,
            branchStatus: branch.branchStatus,
          }));
        console.log('[DEBUG] Filtered active branches:', this.branches);
        console.log('im not working');
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      },
    });
  }

  loadUserGroups(): void {
    this.updateService.getAllUserGroups().subscribe({
      next: (res) => {
        this.userGroups = res;
        console.log('[DEBUG] Loaded user groups:', this.userGroups);
      },
      error: (err) => {
        console.error('Error loading user groups:', err);
      },
    });
  }

  loadDivisions(): void {
    this.divisionService.getAllDivisions().subscribe({
      next: (res) => {
        this.divisions = res.filter(
          (division) => division.divisionStatus === true
        );
      },
      error: (err) => {
        console.error('Error loading division:', err);
      },
    });
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (res) => {
        // Filter here for locationStatus = 1
        this.locations = res.filter(
          (location: any) => location.locationStatus === 1
        );
        console.log('Filtered location array:', this.locations);
        this.filterLocations();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  filterLocations() { }
  imagePreview: string | ArrayBuffer | null = null;
  signaturePreview: string | ArrayBuffer | null = null;

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // For preview
        this.imageBase64 = reader.result as string; // For base64
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
      (event.target as HTMLInputElement).value = ''; // Clear invalid input
    }
  }

  onSignatureSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.signaturePreview = reader.result; // For preview
        this.signatureBase64 = reader.result as string; // For base64
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
      (event.target as HTMLInputElement).value = ''; // Clear invalid input
    }
  }

  // Validator to disallow future dates
  noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (!val) return null;
    const date = new Date(val);
    return date > new Date() ? { futureDate: true } : null;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    console.log(this.employeeForm.value);

    if (this.selectedEmployeeCode) {
      const formValues = this.employeeForm.value;
      const updatedEmployee: any = {
        code: this.selectedEmployeeCode,
      };

      Object.keys(formValues).forEach((key) => {
        const value = formValues[key];
        if (
          value !== null &&
          value !== '' &&
          !(typeof value === 'number' && value === 0) &&
          !(typeof value === 'boolean' && value === false)
        ) {
          updatedEmployee[key] = value;
        }
      });

      // Attach base64 image and signature if selected
      if (this.imageBase64) updatedEmployee.image = this.imageBase64;
      if (this.signatureBase64)
        updatedEmployee.signature = this.signatureBase64;

      // Ensure boolean fields are explicitly set (since false might be filtered out above)
      updatedEmployee.loginStatus = formValues.loginStatus;
      updatedEmployee.leftCompany = formValues.leftCompany;

      // Submit the update (assuming updateService has updateEmployee method)
      this.updateService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          Swal.fire({
            toast: true,
            icon: 'success',
            text: 'Employee details updated successfully.',
            position: 'top',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            // Save updatedCode to sessionStorage as fallback
            sessionStorage.setItem('updatedCode', this.selectedEmployeeCode);

            this.router.navigate(['/employee'], {
              state: { updatedCode: this.selectedEmployeeCode },
            });
          });
        }, 
        error: (err) => {
          console.error('Update failed:', err);
          Swal.fire({
            toast: true,
            icon: 'error',
            text: 'Failed to update employee. Please try again.',
            position: 'top',
            timer: 3000,
            showConfirmButton: false,
          });
        },
      });

    }
  }

  cancel() {
    this.employeeForm.reset();
    this.router.navigate(['/employee']);
  }
}
