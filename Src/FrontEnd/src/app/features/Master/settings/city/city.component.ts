import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { City, State, Country } from 'country-state-city';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
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
  selectedSortColumn = '';
  sortDirectionAsc = true;
  validCities: string[] = [];
  cityDropdownList: string[] = [];


  private cityModal!: bootstrap.Modal;
  private modalElement: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private stateService: StateService,
    private countryService: CountryService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.loadStates();
    this.loadCities();

    this.cityForm.get('countryId')?.valueChanges.subscribe(() => {
      this.onCountryChange();
    });

    this.cityForm.get('stateId')?.valueChanges.subscribe(() => {
      this.onStateChange();
    });
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#cityModal');
    if (this.modalElement) {
      this.cityModal = new bootstrap.Modal(
        this.modalElement as unknown as Element
      );
    }
  }

  initForm(): void {
    this.cityForm = this.fb.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityName: ['', Validators.required],
      cityStatus: ['1', Validators.required],
    });
  }

  loadCountries(): void {
    this.countryService
      .getAllCountries()
      .subscribe({
        next: (res) => {
          this.countries = res;
          console.log('Countries loaded:', this.countries.length);
        },
        error: (err) => console.error('Error loading countries:', err)
      });
  }

  loadStates(): void {
    this.stateService.getAllStates().subscribe({
      next: (res) => {
        this.states = res;
        console.log('States loaded:', this.states.length);
        this.filterStates();
      },
      error: (err) => console.error('Error loading states:', err)
    });
  }

  loadCities(): void {
    this.cityService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data;
        this.filteredCities = [...data];
        console.log('Cities loaded from API:', this.cities.length);
      },
      error: (err) => console.error('Error loading cities:', err)
    });
  }

  loadValidCities(): void {
    console.log('Loading cities from country-state-city package...');

    const countryIdFromForm = this.cityForm.value.countryId;
    const stateIdFromForm = this.cityForm.value.stateId;

    if (!countryIdFromForm || !stateIdFromForm) {
      console.log('CountryId or StateId not selected yet.');
      this.validCities = [];
      this.cityDropdownList = [];
      return;
    }

    const selectedCountry = this.countries.find(
      (c) => String(c.countryId) === String(countryIdFromForm)
    );

    const selectedState = this.states.find(
      (s) => String(s.stateId) === String(stateIdFromForm)
    );

    if (!selectedCountry || !selectedState) {
      console.log('Country or State not found:', {
        countryIdFromForm,
        stateIdFromForm,
        selectedCountry,
        selectedState
      });
      this.validCities = [];
      this.cityDropdownList = [];
      return;
    }

    const countryCode = selectedCountry.countryCode.trim();
    const stateCode = selectedState.stateCode.trim();

    console.log('Fetching cities for:', {
      countryCode,
      stateCode,
      countryName: selectedCountry.countryName,
      stateName: selectedState.stateName
    });

    const cities = City.getCitiesOfState(countryCode, stateCode);
    console.log('Fetched cities:', cities.length);

    if (cities && cities.length > 0) {
      this.validCities = cities.map((city) => city.name.toLowerCase());
      this.cityDropdownList = cities.map((city) => city.name);
      console.log('City dropdown populated with', this.cityDropdownList.length, 'cities');
    } else {
      console.log('No cities found for the selected country/state combination');
      this.validCities = [];
      this.cityDropdownList = [];
    }
  }


  onCountryChange(): void {
    const countryId = this.cityForm.value.countryId;
    if (!countryId) {
      this.filteredStates = [];
      this.cityDropdownList = [];
      this.validCities = [];
      return;
    }

    this.filterStates();

    this.cityForm.patchValue({
      stateId: '',
      cityName: ''
    });

    this.cityDropdownList = [];
    this.validCities = [];
  }

  onStateChange(): void {
    const stateId = this.cityForm.value.stateId;
    if (!stateId) {
      this.cityDropdownList = [];
      this.validCities = [];
      this.cityForm.patchValue({ cityName: '' });
      return;
    }

    this.loadValidCities();

    this.cityForm.patchValue({ cityName: '' });
  }

  filterCities(): void {
    const search = this.searchText?.trim().toLowerCase();

    if (!search) {
      this.filteredCities = [...this.cities];
      return;
    }

    this.filteredCities = this.cities.filter((c) =>
      c.cityName.toLowerCase().includes(search)
    );
  }

  filterStates(): void {
    const countryId = +this.cityForm.get('countryId')?.value;
    console.log('Filtering states for CountryId:', countryId);
    this.filteredStates = this.states.filter((s) => s.countryId === countryId);
    console.log('Filtered states:', this.filteredStates.length);
  }

  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.cityModal.show();
  }

  onEdit(city: GetCityDto): void {
    console.log('Editing city:', city);
    this.selectedCityId = city.cityId;
    this.isEditMode = true;
  
    this.cityForm.patchValue({
      countryId: city.countryId,
      cityStatus: city.cityStatus ? '1' : '0',
    });
  
    setTimeout(() => {
      this.filterStates();
  
      this.cityForm.patchValue({ stateId: city.stateId });
  
      this.loadValidCities();
  
      setTimeout(() => {
        this.cityForm.patchValue({ cityName: city.cityName });
      }, 200); 
    }, 150); 
  
    this.cityModal.show();
  }

  private cleanUpModal(): void {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto'; // ✅ restore scrolling
    document.body.style.removeProperty('padding-right');
  
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.remove());
  }
  
  

  onSubmit(): void {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    const cityName = this.cityForm.value.cityName;
    if (!cityName) {
      Swal.fire({
        toast: true,
                      position: 'top',
                      timer: 3000,
                      timerProgressBar: true,
                      showConfirmButton: false,
        icon: 'error',
        title: 'Invalid City',
        text: 'Please select a valid city for the selected country and state.',
      });
      return;
    }

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
        updatedBy: 1,
      };

      this.cityService.updateCity(updateDto).subscribe({
        next: () => {
          this.loadCities();
          this.cityModal.hide();
          this.cleanUpModal();
          this.resetForm();
          Swal.fire({
            toast: true,
            position: 'top',
            timerProgressBar: true,
            icon: 'success',
            title: 'City updated successfully',
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.cleanUpModal();
          });
        },
        error: (err) => this.errorHandler.handleError(err),
      });
    } else {
      this.cityService.createCity(createDto).subscribe({
        next: () => {
          this.loadCities();
          this.cityModal.hide();
          this.cleanUpModal();
          this.resetForm();

          Swal.fire({
            toast: true,
            position: 'top',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            icon: 'success',
            title: 'Created',
            text: 'City created successfully!',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            this.cleanUpModal();
          });
        },
        error: (err) => this.errorHandler.handleError(err),
      });
    }
  }

  resetForm(): void {
    this.cityForm.reset({
      countryId: '',
      stateId: '',
      cityName: '',
      cityStatus: '1',
    });
    this.selectedCityId = null;
    this.cityDropdownList = [];
    this.validCities = [];
  }

  sortCities(column: string) {
    if (this.selectedSortColumn === column) {
      this.sortDirectionAsc = !this.sortDirectionAsc;
    } else {
      this.selectedSortColumn = column;
      this.sortDirectionAsc = true;
    }

    this.filteredCities.sort((a, b) => {
      const aValue = a[column]?.toString().toLowerCase() || '';
      const bValue = b[column]?.toString().toLowerCase() || '';

      if (aValue < bValue) return this.sortDirectionAsc ? -1 : 1;
      if (aValue > bValue) return this.sortDirectionAsc ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.selectedSortColumn !== column) return 'fa-sort';
    return this.sortDirectionAsc ? 'fa-sort-up' : 'fa-sort-down';
  }

  onStatusChange(city: GetCityDto): void {
    const confirmed = confirm(
      `Are you sure you want to mark "${city.cityName}" as ${city.cityStatus ? 'Inactive' : 'Active'
      }?`
    );

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
      },
    });
  }
}