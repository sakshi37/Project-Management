import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

import { StateService } from '../../../../services/state.service';
import { CountryService } from '../../../../services/country.service.service';
import { GetStateDto } from './Models/get-state.dto';
import { GetCountryDto } from '../country/Models/get-country.dto';
import { UpdateStateDto } from './Models/update-state.dto';
import { CreateStateDto } from './Models/create-state.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

import { Country, State } from 'country-state-city';
import { timer } from 'rxjs';

@Component({
  selector: 'app-state',
  templateUrl: './state-component.component.html',
  standalone: true,
  styleUrls: ['./state-component.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class StateComponent implements OnInit, AfterViewInit {
  stateForm!: FormGroup;
  states: GetStateDto[] = [];
  countries: GetCountryDto[] = [];
  countryList: any[] = []; // From country-state-city
  validStateList: any[] = []; // Valid states based on selected country

  isEditMode = false;
  selectedStateId: number | null = null;
  searchText: string = '';
  filteredStates: any[] = [];
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25];
  itemsPerPage: number = 5;
  selectedSortColumn = '';
  sortDirectionAsc = true;

  private stateModal!: bootstrap.Modal;
  private modalElement: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private countryService: CountryService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStates();
    this.loadCountries();
    this.countryList = Country.getAllCountries();
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#stateModal');
    if (this.modalElement) {
      this.stateModal = new bootstrap.Modal(
        this.modalElement as unknown as Element
      );
    }
  }

  initForm(): void {
    this.stateForm = this.fb.group({
      countryId: ['', Validators.required],
      stateName: ['', Validators.required],
      stateCode: ['', Validators.required],
      stateStatus: ['1', Validators.required],
    });
  }

  loadStates(): void {
    this.stateService.getAllStates().subscribe((data) => {
      this.states = data;
      this.filteredStates = [...data];
    });
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error loading countries:', err),
    });
  }

  filterStates(): void {
    const search = this.searchText?.trim().toLowerCase();
    this.filteredStates = !search
      ? [...this.states]
      : this.states.filter((s) => s.stateName.toLowerCase().includes(search));
  }

  // onCountryChange(event: Event): void {
  //   const countryIdStr = (event.target as HTMLSelectElement).value;
  //   const countryId = Number(countryIdStr);
  //   if (isNaN(countryId)) {
  //     this.validStateList = [];
  //     this.stateForm.patchValue({ stateName: '', stateCode: '' });
  //     return;
  //   }

  //   const backendCountry = this.countries.find(c => c.countryId === countryId);
  //   if (!backendCountry) {
  //     this.validStateList = [];
  //     this.stateForm.patchValue({ stateName: '', stateCode: '' });
  //     return;
  //   }

  //   const selectedCountry = this.countryList.find(
  //     c => c.name.toLowerCase() === backendCountry.countryName.toLowerCase()
  //   );

  //   if (selectedCountry) {
  //     this.validStateList = State.getStatesOfCountry(selectedCountry.isoCode);
  //   } else {
  //     this.validStateList = [];
  //   }

  //   this.stateForm.patchValue({ stateName: '', stateCode: '' });
  // }

  // onStateNameChange(event: Event): void {
  //   const stateName = (event.target as HTMLSelectElement).value;

  //   const selectedState = this.validStateList.find(s => s.name === stateName);
  //   if (selectedState) {
  //     this.stateForm.patchValue({ stateCode: selectedState.isoCode });
  //   } else {
  //     this.stateForm.patchValue({ stateCode: '' });
  //   }
  // }
  onCountryChange(eventOrCountryId: Event | number): void {
    let countryId: number;

    if (typeof eventOrCountryId === 'number') {
      countryId = eventOrCountryId;
    } else {
      countryId = Number((eventOrCountryId.target as HTMLSelectElement).value);
    }

    if (isNaN(countryId)) {
      this.validStateList = [];
      this.stateForm.patchValue({ stateName: '', stateCode: '' });
      return;
    }

    const backendCountry = this.countries.find(
      (c) => c.countryId === countryId
    );
    if (!backendCountry) {
      this.validStateList = [];
      this.stateForm.patchValue({ stateName: '', stateCode: '' });
      return;
    }

    const selectedCountry = this.countryList.find(
      (c) => c.name.toLowerCase() === backendCountry.countryName.toLowerCase()
    );

    if (selectedCountry) {
      this.validStateList = State.getStatesOfCountry(selectedCountry.isoCode);
    } else {
      this.validStateList = [];
    }

    this.stateForm.patchValue({ stateName: '', stateCode: '' });
  }

  onStateNameChange(eventOrStateName: Event | string): void {
    let stateName: string;

    if (typeof eventOrStateName === 'string') {
      stateName = eventOrStateName;
    } else {
      stateName = (eventOrStateName.target as HTMLSelectElement).value;
    }

    const selectedState = this.validStateList.find((s) => s.name === stateName);
    if (selectedState) {
      this.stateForm.patchValue({ stateCode: selectedState.isoCode });
    } else {
      this.stateForm.patchValue({ stateCode: '' });
    }
  }

  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.stateModal.show();
  }

  resetForm(): void {
    this.stateForm.reset({
      countryId: '',
      stateName: '',
      stateCode: '',
      stateStatus: '1',
    });
    this.selectedStateId = null;
    this.validStateList = [];
    this.isEditMode = false;
  }

  // onEdit(state: GetStateDto): void {
  //   this.stateForm.patchValue({
  //     countryId: state.countryId,
  //     stateName: state.stateName,
  //     stateCode: state.stateCode,
  //     stateStatus: state.stateStatus ? '1' : '0',
  //   });
  //   this.selectedStateId = state.stateId;
  //   this.isEditMode = true;

  //   this.onCountryChange(state.countryId);
  //   this.onStateNameChange(state.stateName);
  //   this.stateModal.show();
  // }
  onEdit(state: GetStateDto): void {
    this.isEditMode = true;
    this.selectedStateId = state.stateId;
  
    // 1. Update validStateList first (so dropdown options are ready)
    this.onCountryChange(state.countryId);
  
    // 2. Patch the form after validStateList updated
    this.stateForm.patchValue({
      countryId: state.countryId,
      stateName: state.stateName,
      stateCode: state.stateCode,
      stateStatus: state.stateStatus ? '1' : '0',
    });
  
    // 3. Optionally call onStateNameChange to update stateCode if needed
    this.onStateNameChange(state.stateName);
  
    this.stateModal.show();
  }
  

  onSubmit(): void {
    if (this.stateForm.invalid) {
      this.stateForm.markAllAsTouched();
      return;
    }

    const statusBool = this.stateForm.value.stateStatus === '1';
    const statePayload = {
      stateId: this.selectedStateId!,
      countryId: this.stateForm.value.countryId,
      stateName: this.stateForm.value.stateName,
      stateCode: this.stateForm.value.stateCode.toUpperCase(),
      stateStatus: statusBool,
      updatedBy: 1,
    };

    const createDto: CreateStateDto = {
      countryId: this.stateForm.value.countryId,
      stateName: this.stateForm.value.stateName,
      stateCode: this.stateForm.value.stateCode,
      createdBy: 1,
    };

    if (this.isEditMode && this.selectedStateId !== null) {
      this.stateService.updateState(statePayload).subscribe({
        next: () => {
          this.loadStates();
          this.resetForm();
          this.stateModal?.hide(); // Hide modal first
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
                      text: 'State updated successfully!',
                      confirmButtonColor: '#3085d6',
                    });
        },
        error: (err) => this.errorHandler.handleError(err),
      });
    } else {
      this.stateService.createState(createDto).subscribe({
        next: () => {
          this.loadStates();
          this.resetForm();
          this.stateModal?.hide(); // Hide modal first
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
                        text: 'State created successfully!',
                        confirmButtonColor: '#3085d6',
                      });
        },
        error: (err) => this.errorHandler.handleError(err),
      });
    }
  }

  sortStates(column: string): void {
    if (this.selectedSortColumn === column) {
      this.sortDirectionAsc = !this.sortDirectionAsc;
    } else {
      this.selectedSortColumn = column;
      this.sortDirectionAsc = true;
    }

    this.filteredStates.sort((a, b) => {
      const aVal = a[column]?.toString().toLowerCase() || '';
      const bVal = b[column]?.toString().toLowerCase() || '';
      return this.sortDirectionAsc
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }

  getSortIcon(column: string): string {
    return this.selectedSortColumn !== column
      ? 'fa-sort'
      : this.sortDirectionAsc
      ? 'fa-sort-up'
      : 'fa-sort-down';
  }

  onStatusChange(state: GetStateDto): void {
    const confirmed = confirm(
      `Are you sure you want to mark "${state.stateName}" as ${
        state.stateStatus ? 'Inactive' : 'Active'
      }?`
    );
    if (!confirmed) return;

    const newStatus = state.stateStatus ? 0 : 1;
    this.stateService.softDeleteState(state.stateId, newStatus).subscribe({
      next: () => this.loadStates(),
      error: (err) => {
        console.error('Error updating state status:', err);
        this.loadStates();
      },
    });
  }
}
