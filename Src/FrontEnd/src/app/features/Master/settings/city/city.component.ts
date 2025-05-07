import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CityService } from '../../../../services/city.service';
import { CountryService } from '../../../../services/country.service.service';
import { StateService } from '../../../../services/state.service';
import { GetCountryDto } from '../country/Models/get-country.dto';
import { GetStateDto } from '../state/Models/get-state.dto';
import { GetCityDto } from './Models/get-city.dto';
import { UpdateCityDto } from './Models/update-city.dto';
import { CreateCityDto } from './Models/create-city.dto';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NgxPaginationModule],
  standalone: true,
})
export class CityComponent implements OnInit, AfterViewInit {
  cityForm!: FormGroup;
  countries: GetCountryDto[] = [];
  states: GetStateDto[] = [];
  filteredStates: GetStateDto[] = [];
  cities: GetCityDto[] = [];
  searchText: string = '';
  filteredCities: any[] = [];
  selectedCityId: number | null = null;
  isEditMode = false;
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
  itemsPerPage: number = 5; // default value

  private cityModal!: bootstrap.Modal;
  private modalElement: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private stateService: StateService,
    private countryService: CountryService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.loadStates();
    this.loadCities();
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#cityModal');
    if (this.modalElement) {
      this.cityModal = new bootstrap.Modal(this.modalElement as unknown as Element);
    }
  }

  initForm(): void {
    this.cityForm = this.fb.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityName: ['', Validators.required],
      cityStatus: ['1', Validators.required]
    });
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe(res => this.countries = res);
  }

  loadStates(): void {
    this.stateService.getAllStates().subscribe(res => {
      this.states = res;
      // console.log('States:', this.states);
      this.filterStates();
    });
  }

  loadCities(): void {
    this.cityService.getAllCities().subscribe((data) => {
      this.cities = data;
      this.filteredCities = [...data];
    });
  }
  
  filterCities(): void {
    const search = this.searchText?.trim().toLowerCase();
  
    if (!search) {
      this.filteredCities = [...this.cities];
      return;
    }
  
    this.filteredCities = this.cities.filter(c =>
      c.cityName.toLowerCase().includes(search)
    );
  }

  
  filterStates(): void {
    const countryId = +this.cityForm.get('countryId')?.value;
    console.log('Selected CountryId:', countryId);
    console.log('All States:', this.states);
    this.filteredStates = this.states.filter(s => s.countryId === countryId);
  }

  onCountryChange(): void {
    this.filterStates();
    this.cityForm.patchValue({ stateId: '' });
  }

  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.cityModal.show();
  }

  // onEdit(city: GetCityDto): void {
  //   this.cityForm.patchValue({
  //     countryId: city.countryId,
  //     stateId: city.stateId,
  //     cityName: city.cityName,
  //     status: city.cityStatus ? '1' : '0',
  //   });
  //   this.selectedCityId = city.cityId;
  //   this.isEditMode = true;
  //   this.filterStates();
  //   this.cityModal.show();
  // }
  onEdit(city: GetCityDto): void {
    this.cityForm.patchValue({
      countryId: city.countryId,
      cityName: city.cityName,
      cityStatus: city.cityStatus ? '1' : '0',
    });
  
    this.selectedCityId = city.cityId;
    this.isEditMode = true;
  
    this.filterStates();
  
    setTimeout(() => {
      this.cityForm.patchValue({ stateId: city.stateId });
    }, 0);
  
    this.cityModal.show();
  }
  
  
  

  // onSubmit(): void {
  //   if (this.cityForm.invalid) return;
  //   const statusBool = this.cityForm.value.cityStatus === '1' ? true : false;

  //   const payload = {
  //     cityName: this.cityForm.value.cityName,
  //     stateId: this.cityForm.value.stateId,
  //     cityStatus: statusBool,

  //   };
  //   console.log('City status:', statusBool);

  //   const createcitypayload = {
  //     cityName: this.cityForm.value.cityName,
  //     stateId: this.cityForm.value.stateId,
  //   };
  //   if (this.isEditMode && this.selectedCityId) {
  //     const updateDto: UpdateCityDto = { ...payload, cityId: this.selectedCityId, updatedBy: 1 };
  //     this.cityService.updateCity(updateDto).subscribe(() => {
  //       this.loadCities();
  //       // this.cityModal.hide();
  //       this.resetForm();
  //     });
  //   }
  //    else {
  //     const createDto: CreateCityDto = { ...createcitypayload, createdBy: 1 };
  //     this.cityService.createCity(createDto).subscribe(() => {
  //       this.loadCities();
  //       // this.cityModal.hide();
  //       this.resetForm();
  //     });
  //   }
  // }
  onSubmit(): void {
    if (this.cityForm.invalid) return;
  
    const statusBool = this.cityForm.value.cityStatus === '1';
    const payload = {
      cityName: this.cityForm.value.cityName,
      stateId: this.cityForm.value.stateId,
      cityStatus: statusBool,
    };
  
    const createDto: CreateCityDto = {
      cityName: this.cityForm.value.cityName,
      stateId: this.cityForm.value.stateId,
      createdBy: 1,
    };
  
    if (this.isEditMode && this.selectedCityId) {
      const updateDto: UpdateCityDto = {
        ...payload,
        cityId: this.selectedCityId,
        updatedBy: 1
      };
  
      this.cityService.updateCity(updateDto).subscribe({
        next: () => {
          this.loadCities();
          this.cityModal.hide();
          this.resetForm();
  
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'City updated successfully!',
            confirmButtonColor: '#3085d6'
          });
        },
        error: (err) => this.errorHandler.handleError(err)
      });
  
    } else {
      this.cityService.createCity(createDto).subscribe({
        next: () => {
          this.loadCities();
          this.cityModal.hide();
          this.resetForm();
  
          Swal.fire({
            icon: 'success',
            title: 'Created',
            text: 'City created successfully!',
            confirmButtonColor: '#3085d6'
          });
        },
        error: (err) => this.errorHandler.handleError(err)
      });
    }
  }
  

  resetForm(): void {
    this.cityForm.reset({ countryId: '', stateId: '', cityName: '', cityStatus: '1' });
    this.selectedCityId = null;
  }

  // onStatusChange(city: GetCityDto): void {
  //   const confirmed = confirm(`Change status for "${city.cityName}"?`);
  //   if (confirmed) {
  //     this.cityService.softDeleteCity(city.cityId, city.cityStatus ? 0 : 1).subscribe(() => {
  //       this.loadCities();
  //     });
  //   }
  // }
  onStatusChange(city: GetCityDto): void {
    const confirmed = confirm(`Are you sure you want to mark "${city.cityName}" as ${city.cityStatus ? 'Inactive' : 'Active'}?`);

    if (!confirmed) {
      this.loadCities(); 
      return;
    }

    const newStatus = city.cityStatus ? 0 : 1; 

    this.cityService.softDeleteCity(city.cityId, newStatus).subscribe({
      next: () => {
        this.loadCities(); 
      },
      error: (err) => {
        console.error('Error updating City status:', err);
        this.loadCities(); 
      }
    });
  }
}
