import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DesignationService } from '../../../../services/designation.service';
import { GetDesignationDto } from '../../settings/designation/Models/get-designation.dto';
import { UpdateService } from '../../../../services/update-service';
import { BranchService } from '../../../../services/branch-service';
import { Branch } from '../../../../Models/branch-model';
import { UserGroup } from '../../../../Models/get-user-group-dto';
import { forkJoin } from 'rxjs';
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

//import { LocationService } from '../../../../services/location.service';

@Component({
  selector: 'app-update-employee',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,NgxPaginationModule  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  selectedEmployeeCode: string = '';
  designations: GetDesignationDto[] = [];
  imageBase64: string = '';
  signatureBase64: string = '';
  locations:GetLocationDto[] =[];
  shifts : Shift[]=[];
  employeeTypes :EmployeeType[]=[];
  branches: Branch[] = [];
  userGroups: UserGroup[] = [];
  divisions: GetDivisionDto[] = [];
  cities: GetCityDto[] = [];
  countries: GetCountryDto[] = [];
  states:GetStateDto[]=[];
  filteredStates: GetStateDto[] = [];
  filteredCities: any[] = [];
  genders:Gender[]=[]



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private designationService: DesignationService,
    private updateService: UpdateService,
    private locationService:LocationService,
    private divisionService: DivisionService ,
    private cityService:CityService,
    private countryService:CountryService,
    private stateService:StateService
  ) {
    this.employeeForm = this.fb.group({
      address:[''],
      mobileNo: ['', [ Validators.pattern(/^\d{10}$/)]],
      skypeId: ['', [Validators.minLength(16), Validators.maxLength(32)]],
      email: ['', [ Validators.email]],
      bccEmail: ['', [Validators.email]],
      panNumber: ['', [ Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)]],
      joinDate: ['', [ this.noFutureDateValidator]],
      birthDate: ['', [ this.noFutureDateValidator]],
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
      divisionId: ['']
      
    });
  }

  ngOnInit(): void {
    const emp = history.state.employee;
   
    forkJoin({
      branches: this.branchService.getBranches(),
      designations: this.designationService.getAllDesignations(),
      userGroups: this.updateService.getAllUserGroups(),
      shifts: this.updateService.getAllShifts(),
      genders:this.updateService.getAllGenders(),
      employeeTypes: this.updateService.getEmployeeTypes(),
      cities:this.cityService.getAllCities(),
      countries:this.countryService.getAllCountries(),
      states:this.stateService.getAllStates(),
      locations: this.locationService.getAllLocations(),
      divisions:this.divisionService.getAllDivisions()
    }).subscribe(({ branches, designations, userGroups,shifts,employeeTypes,cities,countries,states,locations,divisions,genders}) => {
      // Filter/map branches
      this.branches = branches
        .filter(b => b.branchStatus==true)
        .map(b => ({
          branchId: b.branchId,
          branchName: b.branchName,
          cityId: b.cityId,
          cityName: b.cityName,
          stateName: b.stateName,
          branchStatus: b.branchStatus
        }));
        

      this.designations = designations;
      this.userGroups    = userGroups;
      this.shifts = shifts; 
      this.employeeTypes = employeeTypes;
      this.locations = locations;
      this.divisions=divisions;
      this.cities=cities;
      this.countries=countries;
      this.states=states;
      this.genders=genders
    
      
      if (emp && emp.code) {
        this.selectedEmployeeCode = emp.code;
        this.employeeForm.reset(); 
        this.populateEmployeeForm(emp);
      } else {
        console.warn('No employee data found in navigation state.');
      }
    });
    this.employeeForm.get('countryId')?.valueChanges.subscribe(() => {
  this.filterStates();
});
this.employeeForm.get('stateId')?.valueChanges.subscribe(() => {
  this.filterCities();
});
    
  }

  populateEmployeeForm(emp: any): void {
    // Simple fields
    this.employeeForm.patchValue({
      address:        emp.address        || '',
      mobileNo:       emp.mobileNo       || '',
      skypeId:        emp.skypeId        || '',
      email:          emp.email          || '',
      joinDate:       emp.joinDate?.split('T')[0] || '',
      bccEmail:       emp.bccEmail       || '',
      panNumber:      emp.panNumber      || '',
      birthDate:      emp.birthDate?.split('T')[0] || '',
      loginStatus:    emp.loginStatus    || false,
      leftCompany:    emp.leftCompany    || false,
      leaveCompany:   emp.leftDate?.split('T')[0] || '',
      locationId:     emp.locationId     || 0,
      designationId:  emp.designationId  || 0,
      shiftId:        emp.shiftId        || 0,
      employeeTypeId: emp.employeeTypeId || 0,
      userGroupId:    emp.userGroupId    || 0,
      divisionId:     emp.divisionId     || 0,
      aadharCardNo: emp.aadharCardNo || '',
      countryId: emp.countryId || '',
      stateId: emp.stateId || '',
      cityId: emp.cityId || '',
      genderId: emp.genderId || '',

    });

    // Map branchName → branchId
    const br = this.branches.find(b => b.branchName === emp.branchName);
    if (br) {
      this.employeeForm.get('branchId')!.setValue(br.branchId);
    }

    // Repeat for other dropdowns if needed:
    // const des = this.designations.find(d => d.designationName === emp.designationName);
    // if (des) this.employeeForm.get('designationId')!.setValue(des.designationId);

    // etc.
  }

  loadConutries(): void {
  this.countryService.getAllCountries().subscribe({
    next: (res) => {
      this.countries = res.filter(country => country.countryStatus === 1);
    },
    error: (err) => console.error('Error loading Countries', err)
  });
}

loadStates(): void {
  this.stateService.getAllStates().subscribe({
    next: (res) => {
      console.log('[DEBUG] Raw state data:', res);
      this.states = res.filter(state => state.stateStatus === true);
      this.filterStates(); // call only once after setting this.states
    },
    error: (err) => console.error('Error loading States', err)
  });
}

 filterStates(): void {
  const countryId = +this.employeeForm.get('countryId')?.value;
  console.log('[DEBUG] Selected countryId:', countryId);
  console.log('[DEBUG] Available states:', this.states);

  this.filteredStates = this.states.filter(
    state => state.countryId === countryId && state.stateStatus === true
  );

  console.log('[DEBUG] Filtered states:', this.filteredStates);
}




   loadCities(): void {
  this.cityService.getAllCities().subscribe({
    next: (res) => {
      this.cities = res.filter(city => city.cityStatus === true);
    },
    error: (err) => console.error('Error loading cities', err)
  });
}
filterCities(): void {
  const stateId = +this.employeeForm.get('stateId')?.value;
  this.filteredCities = this.cities.filter(c => c.stateId === stateId);
}
  loadShifts(): void {
    this.updateService.getAllShifts().subscribe(data => {
      this.shifts = data;
    });
  }

  loadGenders():void{
    this.updateService.getAllGenders().subscribe((data: Gender[]) => {
  this.genders = data;
});   
  }

  loadEmployeeTypes():void{
    this.updateService.getEmployeeTypes().subscribe(data=>{
      this.employeeTypes=data;
    });
  }

  loadDesignations() {
    this.designationService.getAllDesignations().subscribe({
      next: (res) => {
        this.designations = res.filter(designation=>designation.designationStatus===true);
      },
      error: (err) => {
        console.error('Error loading designations:', err);
      }
    });
  }

  loadBranches() {
    this.branchService.getBranches().subscribe({
      next: (res) => {
        this.branches = res.filter(branch => branch.branchStatus === true).map(branch => ({
          branchId: branch.branchId,
          branchName: branch.branchName,
          cityId: branch.cityId,
          cityName: branch.cityName,
          stateName: branch.stateName,
          branchStatus: branch.branchStatus
        }));
        console.log('[DEBUG] Filtered active branches:', this.branches);
         console.log("im not working");
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      }
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
      }
    });
  }

  loadDivisions():void{
    this.divisionService.getAllDivisions().subscribe({
      next: (res) => {
        this.divisions = res.filter(division=>division.divisionStatus===true);
      },
      error: (err) => {
        console.error('Error loading division:', err);
      }
    })
  }

  loadLocations(): void {
  this.locationService.getAllLocations().subscribe({
    next: (res) => {
      // Filter here for locationStatus = 1
      this.locations = res.filter((location: any) => location.locationStatus === 1);
      console.log("Filtered location array:", this.locations);
      this.filterLocations();
    },
    error: (err) => {
      console.log(err);
    }
  });
}
filterLocations(){

}
 

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSignatureSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.signatureBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
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

  if (this.selectedEmployeeCode) {
    const formValues = this.employeeForm.value;
    const updatedEmployee: any = {
      code: this.selectedEmployeeCode
    };

    Object.keys(formValues).forEach(key => {
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
    if (this.signatureBase64) updatedEmployee.signature = this.signatureBase64;

    // Ensure boolean fields are explicitly set (since false might be filtered out above)
    updatedEmployee.loginStatus = formValues.loginStatus;
    updatedEmployee.leftCompany = formValues.leftCompany;

    // Submit the update (assuming updateService has updateEmployee method)
    this.updateService.updateEmployee(updatedEmployee).subscribe({
      next: () => {
        alert('Employee details updated successfully.');
        this.router.navigate(['/employee']); // adjust route as needed
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update employee. Please try again.');
      }
    });
  }
}


  cancel() {
   this.employeeForm.reset();
  this.router.navigate(['/employee']); 
  }
}
