import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Country } from 'country-state-city';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetCountryDto } from './Models/get-country.dto';
import { CountryService } from '../../../../services/country.service.service';
import { UpdateCountryDto } from './Models/update-country.dto';
import { CreateCountryDto } from './Models/create-country.dto';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap'; // Import Bootstrap for manual modal control
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit, AfterViewInit {
  validCountries: { name: string; code: string }[] = [];
  countryForm!: FormGroup;
  countries: GetCountryDto[] = [];
  isEditMode: boolean = false;
  selectedCountryId: number | null = null;
  searchText: string = '';
  filteredCountries: any[] = [];
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
  itemsPerPage: number = 3; // default value
  selectedSortColumn = '';
  sortDirectionAsc = true;
  private countryModal: bootstrap.Modal | undefined;
  private modalElement: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.validCountries = Country.getAllCountries().map((c) => ({
      name: c.name,
      code: c.isoCode,
    }));
    this.initForm();
    this.getCountries();
  }

  ngAfterViewInit(): void {
    this.modalElement = this.el.nativeElement.querySelector('#countryModal');
    console.log('Modal Element in ngAfterViewInit:', this.modalElement);
    if (this.modalElement) {
      this.countryModal = new bootstrap.Modal(
        this.modalElement as unknown as Element
      ); // Cast to Element
      console.log(
        'Country Modal Instance in ngAfterViewInit:',
        this.countryModal
      );
    } else {
      console.error(
        'Modal element with ID "countryModal" not found in the DOM.'
      );
    }
  }

  // Initialize the form
  private initForm(): void {
    // this.countryForm = this.fb.group({
    //   countryName: ['', [Validators.required, Validators.maxLength(15)]],
    //   countryCode: ['', [Validators.required, Validators.maxLength(3)]],
    //   status: ['1', Validators.required],
    // });
    this.countryForm = this.fb.group({
      countryName: ['', Validators.required],
      countryCode: [{ value: '', disabled: true }, Validators.required],
      status: ['1', Validators.required],
    });
  }
  // onCountrySelect(selectedName: string): void {
  //   const selected = this.validCountries.find(c => c.name === selectedName);
  //   if (selected) {
  //     this.countryForm.patchValue({ countryCode: selected.code });
  //   } else {
  //     this.countryForm.patchValue({ countryCode: '' });
  //   }
  // }
  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCountryName = target.value;

    const selectedCountry = this.validCountries.find(
      (c) => c.name === selectedCountryName
    );

    if (selectedCountry) {
      this.countryForm.patchValue({
        countryCode: selectedCountry.code,
      });
    } else {
      this.countryForm.patchValue({
        countryCode: '',
      });
    }
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

    this.filteredCountries = this.countries.filter((c) =>
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
  // onSubmit(): void {
  //   if (this.countryForm.invalid) {
  //     this.countryForm.markAllAsTouched();
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Invalid',
  //       text: 'Please fill all details!',
  //       confirmButtonColor: '#d33',
  //     });
  //     return;
  //   }

  //   const statusValue = this.countryForm.value.status === '1' ? true : false;

  //   const countryDto = {
  //     countryId: this.selectedCountryId,
  //     countryName: this.countryForm.value.countryName,
  //     countryCode: this.countryForm.value.countryCode.toUpperCase(),
  //     countryStatus: statusValue,
  //     updatedBy: 1,
  //   };

  //   if (this.isEditMode && this.selectedCountryId !== null) {
  //     // Update existing country
  //     const updateDto: UpdateCountryDto = {
  //       ...countryDto,
  //       countryId: this.selectedCountryId as number,
  //     };
  //     console.log('Update Payload:', updateDto);

  //     this.countryService.updateCountry(updateDto).subscribe({
  //       next: () => {
  //         this.getCountries();
  //         this.resetForm();
  //         this.countryModal?.hide();
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Updated',
  //           text: 'City updated successfully!',
  //           confirmButtonColor: '#3085d6',
  //         });
  //       },
  //       error: (err) => this.errorHandler.handleError(err),
  //     });
  //   } else {
  //     // Create new country
  //     const createDto: CreateCountryDto = {
  //       ...countryDto,
  //       createdBy: 1,
  //     };

  //     this.countryService.createCountry(createDto).subscribe({
  //       next: () => {
  //         this.getCountries();
  //         this.resetForm();
  //         this.countryModal?.hide();
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Created',
  //           text: 'City created successfully!',
  //           confirmButtonColor: '#3085d6',
  //         });
  //       },
  //       error: (err) => this.errorHandler.handleError(err),
  //     });
  //   }
  // }
  // onSubmit(): void {
  //   if (this.countryForm.invalid) {
  //     this.countryForm.markAllAsTouched(); // Show inline errors only
  //     return; // Don't close modal or show SweetAlert
  //   }

  //   const statusValue = this.countryForm.value.status === '1';

  //   const countryDto = {
  //     countryId: this.selectedCountryId,
  //     countryName: this.countryForm.value.countryName,
  //     countryCode: this.countryForm.value.countryCode,
  //     countryStatus: statusValue,
  //     updatedBy: 1,
  //   };

  //   if (this.isEditMode && this.selectedCountryId !== null) {
  //     const updateDto: UpdateCountryDto = {
  //       ...countryDto,
  //       countryId: this.selectedCountryId,
  //     };

  //     this.countryService.updateCountry(updateDto).subscribe({
  //       next: () => {
  //         this.getCountries();
  //         this.resetForm();
  //         this.countryModal?.hide();
  //         Swal.fire({
  //           toast: true,
  //           position: 'top',
  //           timer: 3000,
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //           icon: 'success',
  //           title: 'Updated',
  //           text: 'Country updated successfully!',
  //           confirmButtonColor: '#3085d6',
  //         });
  //       },
  //       error: (err) => this.errorHandler.handleError(err),
  //     });
  //   } else {
  //     const createDto: CreateCountryDto = {
  //       ...countryDto,
  //       createdBy: 1,
  //     };

  //     this.countryService.createCountry(createDto).subscribe({
  //       next: () => {
  //         this.getCountries();
  //         this.resetForm();
  //         this.countryModal?.hide();
  //         Swal.fire({
  //           toast: true,
  //           position: 'top',
  //           timer: 3000,
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //           icon: 'success',
  //           title: 'Created',
  //           text: 'Country created successfully!',
  //           confirmButtonColor: '#3085d6',
  //         });
  //       },
  //       error: (err) => this.errorHandler.handleError(err),
  //     });
  //   }
  // }
  onSubmit(): void {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched(); // Show inline errors only
      return;
    }

    const rawFormValue = this.countryForm.getRawValue(); // ✅ includes disabled fields

    const statusValue = rawFormValue.status === '1';

    const countryDto = {
      countryId: this.selectedCountryId,
      countryName: rawFormValue.countryName,
      countryCode: rawFormValue.countryCode,
      countryStatus: statusValue,
      updatedBy: 1,
    };

    if (this.isEditMode && this.selectedCountryId !== null) {
      const updateDto: UpdateCountryDto = {
        ...countryDto,
        countryId: this.selectedCountryId,
      };

      this.countryService.updateCountry(updateDto).subscribe({
        next: () => {
          this.getCountries();
          this.resetForm();
          this.countryModal?.hide();
          Swal.fire({
            toast: true,
            position: 'top',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            icon: 'success',
            title: 'Updated',
            text: 'Country updated successfully!',
            confirmButtonColor: '#3085d6',
          });
        },
        error: (err) => this.errorHandler.handleError(err),
      });
    } else {
      const createDto: CreateCountryDto = {
        ...countryDto,
        createdBy: 1,
      };

      this.countryService.createCountry(createDto).subscribe({
        next: () => {
          this.getCountries();
          this.resetForm();
          this.countryModal?.hide(); // Hide modal first

          setTimeout(() => {
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
              text: 'Country created successfully!',
              confirmButtonColor: '#3085d6',
            });
          }, 200);
        },
        error: (err) => this.errorHandler.handleError(err),
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
  sortCountries(column: string) {
    if (this.selectedSortColumn === column) {
      this.sortDirectionAsc = !this.sortDirectionAsc;
    } else {
      this.selectedSortColumn = column;
      this.sortDirectionAsc = true;
    }

    this.filteredCountries.sort((a, b) => {
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

  onStatusChange(country: GetCountryDto): void {
    const confirmed = confirm(
      `Are you sure you want to mark "${country.countryName}" as ${
        country.countryStatus ? 'Inactive' : 'Active'
      }?`
    );

    if (!confirmed) {
      this.getCountries();
      return;
    }

    const newStatus = country.countryStatus ? 0 : 1;

    this.countryService
      .softDeleteCountry(country.countryId, newStatus)
      .subscribe({
        next: () => {
          this.getCountries();
        },
        error: (err) => {
          console.error('Error updating country status:', err);
          this.getCountries();
        },
      });
  }
}
