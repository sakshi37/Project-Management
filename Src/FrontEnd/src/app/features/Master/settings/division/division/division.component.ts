import { AfterViewInit, Component, ElementRef, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetDivisionDto } from './Models/get-division.dto.service';
import { CommonModule } from '@angular/common';
import { DivisionService } from '../../../../../services/division.service';
import { UpdateDivisionDto } from './Models/update-division.dto.service';
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateDivisionDto } from './Models/create-division.dto.service';
import Swal from 'sweetalert2';
import { DivisionDto } from '../../../../../Models/division-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

@Component({
  selector: 'app-division',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './division.component.html',
  styleUrl: './division.component.css',
  standalone: true,
})
export class DivisionComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  divisionForm!: FormGroup;
  divisions: GetDivisionDto[] = [];
    filteredDivisions: any[] = [];
  projectManagerNames: any[] = [];

  isEditMode = false;
  selectedDivisionId: number | null = null;
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
  itemsPerPage: number = 5;
  selectedSortColumn = '';
  sortDirectionAsc = true;
  private modal!: bootstrap.Modal;
  private modalElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private divisionService: DivisionService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getDivisions();
    this.getProjectManagers();
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#divisionModal');
    if (this.modalElement) {
      this.modal = new bootstrap.Modal(this.modalElement as unknown as Element);
    }
    else {
      console.warn('Modal element not found');
    }
  }
  initForm(): void {
    this.divisionForm = this.fb.group({
      divisionName: ['', Validators.required],
      projectManagerName: ['', Validators.required],
      prefixName: ['', Validators.required],
      manHours: ['', Validators.required],
      holidayListType: ['', Validators.required],
      divisionStatus: ['', Validators.required]
    });
  }


  getProjectManagers() {
    this.divisionService.getProjectManagers().subscribe({
      next: (response: any[]) => {
        this.projectManagerNames = response;
      }, error: (error) => {
        console.error(error.error);
      }
    })
  }
  getDivisions(): void {
    this.divisionService.getAllDivisions().subscribe((data) => {
      console.log("Raw divisions from API:", data);

      this.divisions = data.filter(d => !!d.divisionName);
      this.filteredDivisions = [...this.divisions];
      console.log("This is division array : ", this.filteredDivisions)
    });
  }
  filterDivisions(): void {
    const search = this.searchText?.trim().toLowerCase();
    if (!search) {
      this.filteredDivisions = [...this.divisions];
      return;
    }
    this.filteredDivisions = this.divisions.filter(d =>
      d.divisionName?.toLowerCase().includes(search)
    );
  }
  openAddModal(): void {
    // this.resetForm();
    this.isEditMode = false;
    if (this.modal) {
      this.modal.show();
    } else {
      console.error('Modal not initialized.');
    }
  }
  onEdit(division: GetDivisionDto): void {
    this.divisionForm.patchValue({
      divisionName: division.divisionName,
      projectManagerName: division.projectManagerName,
      prefixName: division.prefixName,
      manHours: division.manHours,
      holidayListType: division.holidayListType ? "1" : "0",
      divisionStatus: division.divisionStatus ? "1" : "0"
    });
    
    this.selectedDivisionId = division.divisionId;
    console.log(this.selectedDivisionId, division);
    
    this.isEditMode = true;
    this.modal.show();
  }

  onSubmit(): void {
    if (this.divisionForm.invalid) {
      console.log("hello world")
      return;
    }
    
    const statusBool = this.divisionForm.value.locationStatus === '1' ? true : false;
    const payload = {
      divisionName: this.divisionForm.value.divisionName,
      projectManagerName: this.divisionForm.value.projectManagerName,
      prefixName: this.divisionForm.value.prefixName,
      manHours: this.divisionForm.value.manHours,
      fk_HolidayId: this.divisionForm.value.holidayListType,
      divisionStatus: this.divisionForm.value.divisionStatus == 1 ? true : false
    };
    console.log(payload.divisionStatus);
    
    if (this.isEditMode) {
      const updateDto: UpdateDivisionDto = {
        ...payload, divisionId: this.selectedDivisionId != null ? this.selectedDivisionId : 0, updatedBy: "1",
      };
      console.log("payload", updateDto);
      this.divisionService.updateDivisions(updateDto).subscribe({
        next: () => {
          this.getDivisions();
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Division updated successfully!',
            confirmButtonColor: '#3085d6'
          });
          console.log(updateDto);
          
        },
        error: (err) => this.errorHandler.handleError(err)

      });

    }
    else {
      const createDto: CreateDivisionDto = { ...payload, createdBy: '1' };
      console.log(createDto);
      this.divisionService.createDivisions(createDto).subscribe({
        next: (res: DivisionDto) => {
          this.getDivisions();
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Created',
            text: 'Division created successfully!',
            confirmButtonColor: '#3085d6'
          });
        },
        error: (err) => this.errorHandler.handleError(err)
      });

    }
  }

  resetForm(): void {
    this.divisionForm.reset({ divisionName: '', status: '1' });
    this.selectedDivisionId = null;
  }
  onStatusChange(division: GetDivisionDto): void {
    const confirmed = confirm(`Are you sure you want to mark "${division.divisionName}" as ${division.divisionStatus ? 'Inactive' : 'Active'}?`);

    if (!confirmed) {
      this.getDivisions();
      return;
    }

    const newStatus = division.divisionStatus ? 0 : 1;

    this.divisionService.softDeleteDivisions(division.divisionId, newStatus).subscribe({
      next: () => {
        this.getDivisions();
      },
      error: (err) => {
        console.error('Error updating Division status:', err);
        this.getDivisions();
      }
    });
  }
  
  sortDivisions(column: string): void {
    if (this.selectedSortColumn === column) {
      this.sortDirectionAsc = !this.sortDirectionAsc;
    } else {
      this.selectedSortColumn = column;
      this.sortDirectionAsc = true;
    }

    this.filteredDivisions.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handle null/undefined
      if (valueA == null || valueB == null) return 0;

      // Check if both values are numeric
      const isNumeric = !isNaN(valueA) && !isNaN(valueB);

      if (isNumeric) {
        const numA = Number(valueA);
        const numB = Number(valueB);
        return this.sortDirectionAsc ? numA - numB : numB - numA;
      } else {
        const strA = valueA.toString().toLowerCase();
        const strB = valueB.toString().toLowerCase();
        return this.sortDirectionAsc
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
    });
  }

  getSortIcon(column: string): string {
    if (this.selectedSortColumn !== column) return 'fa-sort';
    return this.sortDirectionAsc ? 'fa-sort-up' : 'fa-sort-down';
  }
}

