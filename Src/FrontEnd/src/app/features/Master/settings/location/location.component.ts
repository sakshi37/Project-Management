import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as bootstrap from 'bootstrap';

import { GetCityDto } from '../../settings/city/Models/get-city.dto';
import { CityService } from '../../../../services/city.service';
import { StateService } from '../../../../services/state.service';
import { CountryService } from '../../../../services/country.service.service';
import { GetCountryDto } from '../country/Models/get-country.dto';
import { GetStateDto } from '../state/Models/get-state.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { GetLocationDto } from './Models/get-location-dto';
import { UpdateLocationDto } from './Models/update-location-dto';
import { CreateLocationDto } from './Models/create-location-dto';
import { LocationService } from '../../../../services/location-service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NgxPaginationModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit, AfterViewInit {

  locationForm!: FormGroup;
    countries: GetCountryDto[] = [];
    states: GetStateDto[] = [];
    cities: GetCityDto[] = [];
    locations:GetLocationDto[] =[];
    filteredStates: GetStateDto[] = []; 
    filteredCities: GetCityDto[] = []; 
    filteredLocations: GetLocationDto[] = []; 
    selectedlocationId: number | null = null;
    searchText: string = '';
    isEditMode = false;
    currentPage: number = 1;
    itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
    itemsPerPage: number = 5;
    selectedSortColumn = '';
    sortDirectionAsc = true;
    private locationModal!: bootstrap.Modal ;
    private modalElement: ElementRef | undefined;
    cityForm!:FormGroup;
    
  ;


  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private cityService: CityService,
    private stateService: StateService,
    private countryService: CountryService,
    private errorHandler: ErrorHandlerService,
    private el: ElementRef
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.loadStates();
    this.loadCities();
    this.loadLocations();
  }


  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#locationModal');
    if (this.modalElement) {
      this.locationModal = new bootstrap.Modal(this.modalElement as unknown as Element);
    }
  }

  initForm(): void {
    this.locationForm = this.fb.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      locationName: ['', Validators.required],
      locationStatus: ['1', Validators.required],
    });   
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe(res => this.countries = res);
  }
  loadStates(): void {
    this.stateService.getAllStates().subscribe(res => this.states = res);
  }

  loadCities(): void {
    this.cityService.getAllCities().subscribe(res => { this.cities = res;
      console.log("This is response: ",this.cities);
      this.filterStates();


    });

  }
  loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next:(res)=>{
        this.locations = res;
        console.log("This is the location array : ", this.locations);
        this.filterLocations();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  
  filterStates(): void {
    const countryId = +this.locationForm.get('countryId')?.value;
    // console.log('Selected CountryId:', countryId);
    this.filteredStates = this.states.filter(s => s.countryId === countryId);
  }

filterCities(): void {
  const stateId = +this.locationForm.get('stateId')?.value;
  // console.log('Selected StateId:', stateId);
  this.filteredCities = this.cities.filter(c => c.stateId === stateId);
}
// filterLocations(): void {
//   const cityId = +this.locationForm.get('cityId')?.value;
  
//   console.log('Selected cityId:', cityId);
//   this.filteredLocations = this.locations.filter(l => l.cityId === cityId);
//   console.log(this.filteredLocations);
// }
filterLocations():void{
  const search = this.searchText?.trim().toLowerCase();
  
    if (!search) {
      this.filteredLocations = [...this.locations];
      
      return;
    }
  
    this.filteredLocations = this.locations.filter(c =>
      c.locationName?.toLowerCase().includes(search)
    );
}


onStateChange(): void {
  this.filterCities();
  this.locationForm.patchValue({ cityId: '' });
  
}


  onCountryChange(): void {
    this.filterStates();
    this.locationForm.patchValue({ stateId: '', cityId: '' });
    this.filteredCities = [];
  }

  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.locationModal.show();
  }
  
   onEdit(location: GetLocationDto): void {
      this.locationForm.patchValue({
        countryId: location.countryId,
        stateId: location.stateId,
        cityId: location.cityId,
        locationName: location.locationName,
        // locationCode:location.locationCode,
        locationStatus: location.locationStatus ? '1' : '0',

      });
      this.selectedlocationId = location.locationId;
      this.isEditMode = true;
      this.filterStates();
      this.filterCities();
      this.locationModal.show();
      // console.log(location.cityName);  
    }

  

    onSubmit(): void {
        if (this.locationForm.invalid) {
          console.log("hello world")
          return;
        }
        
        const statusBool = this.locationForm.value.locationStatus === '1' ? true : false;
        const cityid = +this.locationForm.value.cityId;
        const payload = {
          locationName: this.locationForm.value.locationName,
          cityId:cityid,
          locationStatus: statusBool,
    
        };
        if (this.isEditMode && this.selectedlocationId) {
          const updateDto: UpdateLocationDto = {
            ...payload, locationId: this.selectedlocationId, updatedBy: 1,
            stateId: 0
          };
          console.log("payload",updateDto);
          this.locationService.updateLocation(updateDto).subscribe({
            next:()=>{
                this.loadLocations();
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

        }
         else {
          const createDto: CreateLocationDto = {...payload, createdBy: 1 };
          console.log(createDto);
          this.locationService.createLocation(createDto).subscribe({
            next:(res:CreateLocationDto)=>{
              this.loadLocations();
              this.resetForm();
              Swal.fire({
                          icon: 'success',
                          title: 'Created',
                          text: 'City created successfully!',
                          confirmButtonColor: '#3085d6'
                        });
          },
          error:(err) => this.errorHandler.handleError(err)       
          });
          
        }
        }
      

      resetForm(): void {
        this.locationForm.reset({ countryId: '', stateId: '',cityId:'', loationName: '', locationStatus:'1' });
        this.selectedlocationId = null;
      }
      sortLocations(column: keyof GetLocationDto) {
        if (this.selectedSortColumn === column) {
          this.sortDirectionAsc = !this.sortDirectionAsc;
        } else {
          this.selectedSortColumn = column;
          this.sortDirectionAsc = true;
        }
      
        this.filteredLocations.sort((a, b) => {
          const aValue = a[column];
          const bValue = b[column];
      
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            const aStr = aValue.toLowerCase();
            const bStr = bValue.toLowerCase();
            if (aStr < bStr) return this.sortDirectionAsc ? -1 : 1;
            if (aStr > bStr) return this.sortDirectionAsc ? 1 : -1;
          } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return this.sortDirectionAsc
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue);
          }
          return 0;
        });
      }
      
    
      getSortIcon(column: string): string {
        if (this.selectedSortColumn !== column) return 'fa-sort';
        return this.sortDirectionAsc ? 'fa-sort-up' : 'fa-sort-down';
      
      }
      onStatusChange(location: GetLocationDto): void {
          const confirmed = confirm(`Are you sure you want to mark "${location.locationName}" as ${location.locationStatus ? 'Inactive' : 'Active'}?`);
      
          if (!confirmed) {
            this.loadLocations(); 
            return;
          }
      
          const newStatus = location.locationStatus ? 0 : 1; 
      
          this.locationService.softDeleteLocation(location.locationId, newStatus).subscribe({
            next: () => {
              this.loadLocations(); 
            },
            error: (err) => {
              console.error('Error updating Location status:', err);
              this.loadCities(); 
            }
          });
        }
      }
      