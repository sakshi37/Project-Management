import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignationService } from '../../../../services/designation.service';
import { GetDesignationDto } from '../../settings/designation/Models/get-designation.dto';

@Component({
  selector: 'app-update-employee',
  imports: [  ReactiveFormsModule
    ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent  implements OnInit {
  employeeForm: FormGroup;
  selectedEmployeeCode: string = '';
  designations: GetDesignationDto[] = [];
    constructor(private fb: FormBuilder,private route: ActivatedRoute,private designationService: DesignationService) {
    this.employeeForm = this.fb.group({
      designationId: [''],
    });
    
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedEmployeeCode = params['code'] || '';
    });
    this.loadDesignations();
  }
 
  cancel(){

  }
  onSubmit(){

  }
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      console.log('Selected image:', file);
      // Handle image logic here
    }
  }
  
  onSignatureSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      console.log('Selected signature:', file);
      // Handle signature logic here
    }
  }
  loadDesignations() {
    this.designationService.getAllDesignations().subscribe({
      next: (res) => {
        console.log('Designations:', res); 
        this.designations = res;
      },
      error: (err) => {
        console.error('Error loading locations:', err);
      }
    });
  }
}
