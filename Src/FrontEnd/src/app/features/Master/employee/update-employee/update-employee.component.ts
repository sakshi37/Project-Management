import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignationService } from '../../../../services/designation.service';
import { GetDesignationDto } from '../../settings/designation/Models/get-designation.dto';
import { UpdateService } from '../../../../services/update-service';
import { BranchService } from '../../../../services/branch-service';
import { Branch } from '../../../../Models/branch-model';
import { UserGroup } from '../../../../Models/get-user-group-dto';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  selectedEmployeeCode: string = '';
  designations: GetDesignationDto[] = [];
  imageBase64: string = '';
  signatureBase64: string = '';
  locations = [];
  shifts = [];
  employeeTypes = [];
  branches: Branch[] = [];
  divisions = [];
  userGroups: UserGroup[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private branchService: BranchService,
    private designationService: DesignationService,
    private updateService: UpdateService
  ) {
    this.employeeForm = this.fb.group({
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      skypeId: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      bccEmail: ['', [Validators.email]],
      panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)]],
      joinDate: ['', [Validators.required, this.noFutureDateValidator]],
      birthDate: ['', [Validators.required, this.noFutureDateValidator]],
      loginStatus: [false],
      leftCompany: [false],
      leaveCompany: ['', [this.noFutureDateValidator]],
      locationId: [0],
      designationId: [0],
      shiftId: [0],
      employeeTypeId: [0],
      userGroupId: [0],
      branchId: [0],
      divisionId: [0]
    });
  }

  ngOnInit(): void {
    const emp = history.state.employee;
    // Load all dropdown lists in parallel
    forkJoin({
      branches: this.branchService.getBranches(),
      designations: this.designationService.getAllDesignations(),
      userGroups: this.updateService.getAllUserGroups(),
      // shifts: this.updateService.getShifts(),
      // employeeTypes: this.updateService.getEmployeeTypes(),
      // locations: this.updateService.getLocations(),
    }).subscribe(({ branches, designations, userGroups }) => {
      // Filter/map branches
      this.branches = branches
        .filter(b => b.branchStatus)
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
      // this.shifts = shifts; 
      // this.employeeTypes = employeeTypes;
      // this.locations = locations;

      // Now that all lists are loaded, patch the form
      if (emp && emp.code) {
        this.selectedEmployeeCode = emp.code;
        this.populateEmployeeForm(emp);
      } else {
        console.warn('No employee data found in navigation state.');
      }
    });
  }

  // loadEmployeeDetails(code: string): void {
  //   this.http.get<any>('https://localhost:7292/api/Employee/AllEmployees?pageNumber=1&pageSize=1000')
  //     .subscribe({
  //       next: (res) => {
  //         const employee = res.find((emp: any) => emp.code === code);
  //         console.log('[DEBUG] Employee found:', employee);
  //         if (employee) {
  //           this.populateEmployeeForm(employee);
  //         } else {
  //           console.error('Employee not found with code:', code);
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error fetching employees:', err);
  //       }
  //     });
  // }

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
      divisionId:     emp.divisionId     || 0
      // note: we’ll set branchId below
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

  // ... rest of your component methods ...


  loadDesignations() {
    this.designationService.getAllDesignations().subscribe({
      next: (res) => {
        this.designations = res;
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

      if (this.imageBase64) updatedEmployee.image = this.imageBase64;
      if (this.signatureBase64) updatedEmployee.signature = this.signatureBase64;
      updatedEmployee.loginStatus = formValues.loginStatus === true || formValues.loginStatus === 'true';

      console.log('Payload:', updatedEmployee);

      this.updateService.updateEmployee(updatedEmployee).subscribe({
        next: (res) => {
          console.log('Employee updated successfully', res);
          alert('Employee updated successfully');
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          if (err.error && err.error.errors) {
            console.error('Validation errors:', err.error.errors);
          }
          alert('Failed to update employee');
        }
      });
    } else {
      alert('Please select an employee to update.');
    }
  }

  cancel() {
    // Implement navigation or form reset logic if needed
  }
}
