import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { DesignationService } from '../../../../services/designation.service';
import { GetDesignationDto } from './Models/get-designation.dto';
import { UpdateDesignationDto } from './Models/update-designation.dto';
import { CreateDesignationDto } from './Models/create-designation.dto';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NgxPaginationModule],
  standalone: true,
})

export class DesignationComponent implements OnInit, AfterViewInit {
  designationForm!: FormGroup;
  designations: GetDesignationDto[] = [];
  isEditMode = false;
  selectedDesignationId: number | null = null;
  searchText: string = '';
  filteredDesignations: any[] = [];
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
  itemsPerPage: number = 5; // default value
  private modal!: bootstrap.Modal;
  private modalElement!: ElementRef;
  
  

  constructor(
    private fb: FormBuilder,
    private designationService: DesignationService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService
    

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getDesignations();
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#designationModal');
    if (this.modalElement) {
      this.modal = new bootstrap.Modal(this.modalElement as unknown as Element);
    }
  }

  initForm(): void {
    this.designationForm = this.fb.group({
      designationName: ['', [Validators.required, Validators.maxLength(100)]],
      designationStatus: ['1', Validators.required]
    });
  }

  // getDesignations(): void {
  //   this.designationService.getAllDesignations().subscribe(res => this.designations = res);
  // }
  getDesignations(): void {
    this.designationService.getAllDesignations().subscribe((data) => {
      this.designations = data;
      this.filteredDesignations = [...data]; 
    });
  }
  filterDesignations(): void {
    const search = this.searchText?.trim().toLowerCase();
  
    if (!search) {
      this.filteredDesignations = [...this.designations];
      return;
    }
  
    this.filteredDesignations = this.designations.filter(d =>
      d.designationName.toLowerCase().includes(search)
    );
  }
  
  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.modal.show();
  }

  onEdit(designation: GetDesignationDto): void {
    this.designationForm.patchValue({
      designationName: designation.designationName,
      designationStatus: designation.designationStatus? '1' : '0' 
    });
    this.selectedDesignationId = designation.designationId;
    this.isEditMode = true;
    this.modal.show();
  }

  onSubmit(): void {
    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      return;
    }
    const statusBool = this.designationForm.value.designationStatus === '1' ? true : false;

    const payload = {
      designationName: this.designationForm.value.designationName,
      designationStatus: statusBool
    };
    const createdesignationpayload = {
      designationName: this.designationForm.value.designationName,
    };
    console.log('designationStatus', statusBool);
    console.log('payload', payload);


    if (this.isEditMode && this.selectedDesignationId) {
      const dto: UpdateDesignationDto = { ...payload, designationId: this.selectedDesignationId, updatedBy: 1 };
      this.designationService.updateDesignation(dto).subscribe({next:() => {
        this.getDesignations();
        this.modal.hide();
        this.resetForm();
          document.body.classList.remove('modal-open');
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach((el) => el.remove());
        Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Updated',
                    text: 'Designation updated successfully!',
                    confirmButtonColor: '#3085d6',
                  });
      },
      error: (err) => this.errorHandler.handleError(err),});
    } 
    else {
      const dto: CreateDesignationDto = { ...createdesignationpayload, createdBy: 1 };
      this.designationService.createDesignation(dto).subscribe({next: () => {
        this.getDesignations();
        this.modal.hide();
        this.resetForm();
          document.body.classList.remove('modal-open');
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach((el) => el.remove());
        Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Created',
                    text: 'Designation created successfully!',
                    confirmButtonColor: '#3085d6',
                  });
      },
      error: (err) => this.errorHandler.handleError(err),
    });
    }
  }

  resetForm(): void {
    this.designationForm.reset({ designationName: '', designationStatus: '1' });
    this.selectedDesignationId = null;
  }

  onStatusChange(designation: GetDesignationDto): void {
      const confirmed = confirm(`Are you sure you want to mark "${designation.designationName}" as ${designation.designationStatus ? 'Inactive' : 'Active'}?`);
  
      if (!confirmed) {
        this.getDesignations(); 
        return;
      }
  
      const newStatus = designation.designationStatus ? 0 : 1; 
  
      this.designationService.softDeleteDesignation(designation.designationId, newStatus).subscribe({
        next: () => {
          this.getDesignations(); 
        },
        error: (err) => {
          console.error('Error updating Designation status:', err);
          this.getDesignations(); 
        }
      });
    }
}
