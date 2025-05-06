import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetCountryDto } from './Models/get-country.dto';
import { CountryService } from '../../../../services/country.service.service';
import { UpdateCountryDto } from './Models/update-country.dto';
import { CreateCountryDto } from './Models/create-country.dto';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap'; // Import Bootstrap for manual modal control
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NgxPaginationModule],
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, AfterViewInit {

  countryForm!: FormGroup;
  countries: GetCountryDto[] = [];
  isEditMode: boolean = false;
  selectedCountryId: number | null = null;
  searchText: string = '';
  filteredCountries: any[] = [];
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
  itemsPerPage: number = 5; // default value
  private countryModal: bootstrap.Modal | undefined;
  private modalElement: ElementRef | undefined;

  constructor(private fb: FormBuilder, private countryService: CountryService, private el: ElementRef) { }

  ngOnInit(): void {
    this.initForm();
    this.getCountries();
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#countryModal');
    console.log('Modal Element in ngAfterViewInit:', this.modalElement);
    if (this.modalElement) {
      this.countryModal = new bootstrap.Modal(this.modalElement as unknown as Element); // Cast to Element
      console.log('Country Modal Instance in ngAfterViewInit:', this.countryModal);
    } else {
      console.error('Modal element with ID "countryModal" not found in the DOM.');
    }
  }

  // Initialize the form
  private initForm(): void {
    this.countryForm = this.fb.group({
      countryName: ['', Validators.required],
      countryCode: ['', Validators.required],
      status: ['1', Validators.required],
    });
  }

  // Get the list of countries
  // getCountries(): void {
  //   this.countryService.getAllCountries().subscribe({
  //     next: (countries: GetCountryDto[]) => {
  //       this.countries = countries;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching countries:', err);
  //     }
  //   });
  // }
  getCountries(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.countries = data;
      this.filteredCountries = [...data]; 
    });
  }

  filterCountries(): void {
    const search = this.searchText?.trim().toLowerCase();
  
    if (!search) {
      this.filteredCountries = [...this.countries];
      return;
    }
  
    this.filteredCountries = this.countries.filter(c =>
      c.countryName.toLowerCase().includes(search)
    );
  }

  // Open the add modal
  openAddModal(): void {
    this.isEditMode = false;
    this.resetForm();
    this.countryModal?.show();
  }

  // Reset the form
  resetForm(): void {
    this.countryForm.reset({
      countryName: '',
      countryCode: '',
      status: '1', // Default to 'Active'
    });
    this.selectedCountryId = null;
    this.isEditMode = false;
  }

  // Submit the form (create or update)
  onSubmit(): void {
    if (this.countryForm.invalid) return;

    const statusValue = this.countryForm.value.status === '1' ? true : false;

    const countryDto = {
      countryId: this.selectedCountryId,
      countryName: this.countryForm.value.countryName,
      countryCode: this.countryForm.value.countryCode,
      countryStatus: statusValue,
      updatedBy: 1
    };

    if (this.isEditMode && this.selectedCountryId !== null) {
      // Update existing country
      const updateDto: UpdateCountryDto = {
        ...countryDto,
        countryId: this.selectedCountryId as number
      };
      console.log('Update Payload:', updateDto);

      this.countryService.updateCountry(updateDto).subscribe({
        next: () => {
          this.getCountries();
          this.resetForm();
          this.countryModal?.hide();
        },
        error: (err) => console.error('Error updating country:', err),
      });
    } else {
      // Create new country
      const createDto: CreateCountryDto = {
        ...countryDto,
        createdBy: 1
      };

      this.countryService.createCountry(createDto).subscribe({
        next: () => {
          this.getCountries();
          this.resetForm();
          this.countryModal?.hide();
        },
        error: (err) => console.error('Error creating country:', err),
      });
    }
  }

  // Edit an existing country
  onEdit(country: GetCountryDto): void {
    this.countryForm.patchValue({
      countryName: country.countryName,
      countryCode: country.countryCode,
      status: country.countryStatus ? '1' : '0',
    });

    this.selectedCountryId = country.countryId;
    this.isEditMode = true;
    this.countryModal?.show();
  }

  onStatusChange(country: GetCountryDto): void {
    const confirmed = confirm(`Are you sure you want to mark "${country.countryName}" as ${country.countryStatus ? 'Inactive' : 'Active'}?`);

    if (!confirmed) {
      this.getCountries();
      return;
    }

    const newStatus = country.countryStatus ? 0 : 1; 

    this.countryService.softDeleteCountry(country.countryId, newStatus).subscribe({
      next: () => {
        this.getCountries();
      },
      error: (err) => {
        console.error('Error updating country status:', err);
        this.getCountries();
      }
    });
  }
}