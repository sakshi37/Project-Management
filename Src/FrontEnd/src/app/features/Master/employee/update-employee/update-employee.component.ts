import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignationService } from '../../../../services/designation.service';
import { GetDesignationDto } from '../../settings/designation/Models/get-designation.dto';
import { UpdateService } from '../../../../services/update-service';
import { BranchService } from '../../../../services/branch-service';
import { Branch } from '../../../../Models/branch-model';



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
  userGroups = [];
  branches : Branch[]=[];
  divisions = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private designationService: DesignationService,
    private updateService: UpdateService,
    private branchService: BranchService 
  ) {
    this.employeeForm = this.fb.group({
      address: [''],
      mobileNo: [''],
      skypeId: [''],
      email: [''],
      joinDate: [''],
      bccEmail: [''],
      panNumber: [''],
      birthDate: [''],
      loginStatus: [false],
      leftCompany: [false],
      leaveCompany: [''],
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
    this.route.queryParams.subscribe(params => {
      this.selectedEmployeeCode = params['code'] || '';
    });
    this.loadDesignations();
    this.loadBranches();
  }

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
        // Ensure that each branch has a branchId field
        this.branches = res.filter(branch => branch.branchStatus === true).map(branch => {
          // Map the response to ensure branchId is assigned correctly
          return {
            branchId: branch.branchId,  // Assuming the correct field name is branchId
            branchName: branch.branchName,
            cityId: branch.cityId,
            cityName: branch.cityName,
            stateName: branch.stateName,
            branchStatus: branch.branchStatus
          };
        });
        
        console.log('[DEBUG] Filtered active branches:', this.branches);
      },
      error: (err) => {
        console.error('Error loading branches:', err);
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

  onSubmit() {
    if (this.selectedEmployeeCode) {
      const formValues = this.employeeForm.value;
      const updatedEmployee: any = {
        code: this.selectedEmployeeCode
      };
  
      // Include only non-empty / meaningful values
      Object.keys(formValues).forEach(key => {
        const value = formValues[key];
        // You can customize this condition depending on your defaults
        if (
          value !== null &&
          value !== '' &&
          !(typeof value === 'number' && value === 0) &&
          !(typeof value === 'boolean' && value === false)
        ) {
          updatedEmployee[key] = value;
        }
      });
  
      // Include image and signature only if provided
      if (this.imageBase64) updatedEmployee.image = this.imageBase64;
      if (this.signatureBase64) updatedEmployee.signature = this.signatureBase64;
      // for login whoch is taken in string 
      updatedEmployee.loginStatus = formValues.loginStatus === true || formValues.loginStatus === 'true' ? true : false;

      console.log('Payload:', updatedEmployee);
      // console.log('Base64 Image:', this.imageBase64);

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
    // Implement navigation or reset logic if needed
  }
}
