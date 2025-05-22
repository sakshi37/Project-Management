import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { GetHolidayDto } from './Models/get-holiday.dto';
import { HolidayService } from '../../../services/holiday.service';
import { UpdateHolidayDto } from './Models/update-holiday.dto';
import { CreateHolidayDto } from './Models/create-holiday.dto';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DatePickerModule, NgxPaginationModule],
})
export class HolidayComponent implements OnInit, AfterViewInit {
  holidayForm!: FormGroup;
  holidays: GetHolidayDto[] = [];
  filteredResults: GetHolidayDto[] = [];
  searchText: string = '';
  filteredHolidays: any[] = [];

  selectedHolidayId: number | null = null;
  isEditMode = false;
  private modal!: bootstrap.Modal;
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10, 25, 50];
  itemsPerPage: number = 5; 
  selectedImageFile: File | null = null;
imagePreviewUrl: string | null = null;
viewMode: 'card' | 'table' = 'table';


  filter = {
    listType: '',
    year: new Date().getFullYear()
  };

  filterYear: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private holidayService: HolidayService,
    private el: ElementRef,
    private errorHandler: ErrorHandlerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHolidays();
  }

  ngAfterViewInit(): void {
    const modalEl = this.el.nativeElement.querySelector('#holidayModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
    }
  }

  initForm(): void {
    this.holidayForm = this.fb.group({
      holidayName: ['', [Validators.required, Validators.maxLength(100)]],
      holidayDate: ['', Validators.required],
      holidayListType: ['1', Validators.required],
      holidayStatus: ['1', Validators.required]
    });
  }

  // loadHolidays(): void {
  //   this.holidayService.getAllHolidays().subscribe(res => {
  //     this.holidays = res.map(h => ({
  //       ...h,
  //       dayName: this.getDayName(h.holidayDate),
  //       formattedDate: this.formatHolidayDate(h.holidayDate),
  //       year: new Date(h.holidayDate).getFullYear()
  //     }));
  //     this.filterHolidays();
  //   });
  // }
  loadHolidays(): void {
    this.holidayService.getAllHolidays().subscribe(res => {
      this.holidays = res.map(h => ({
        ...h,
        dayName: this.getDayName(h.holidayDate),
        formattedDate: this.formatHolidayDate(h.holidayDate),
        year: new Date(h.holidayDate).getFullYear()
      }));
      this.filteredResults = [...this.holidays];
    }, error => {
      this.errorHandler.handleError(error);
    });
  }
  

  filterHolidays(): void {
    console.log(this.filterYear);
    if (this.filterYear === null) {
      this.filteredResults = [...this.holidays]; 
    } else {
      this.filteredResults = this.holidays.filter(h =>
        (this.filter.listType === '' || h.holidayListType === (this.filter.listType === '1')) &&
        h.year === +this.filter.year
      );
    }
  }

  formatHolidayDate(date: string): string {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return d.toLocaleDateString('en-GB', options);
  }
  getYear(date: string): number {
    return new Date(date).getFullYear();
  }

  getDayName(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', { weekday: 'long' });
  }
  isPastDate(holidayDate: string): boolean {
    const today = new Date();
    const holiday = new Date(holidayDate);
    // Reset time to ignore time part

    today.setHours(0, 0, 0, 0);
    holiday.setHours(0, 0, 0, 0);
    return holiday < today;
  }
  filterHolidaysbyName(): void {
    const searchTerm = this.searchText.toLowerCase();
  
    this.filteredResults = this.holidays.filter(h =>
      h.holidayName.toLowerCase().includes(searchTerm)
    );
  
    this.currentPage = 1;
  }
  
  

  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.modal.show();
  }

  onEdit(h: GetHolidayDto): void {
    this.holidayForm.patchValue({
      holidayName: h.holidayName,
      holidayDate: h.holidayDate.split('T')[0],
      holidayListType: h.holidayListType ? 'true' : 'false',
      holidayStatus: h.holidayStatus ? 'true' : 'false'
    });
    this.selectedHolidayId = h.holidayId;
    this.isEditMode = true;
    this.imagePreviewUrl = h.imagePath ? 'http://127.0.0.1:8080/' + h.imagePath : null;
    this.modal.show();
  }
  handleSuccess(type: string): void {
    this.loadHolidays();
    this.modal.hide();
    Swal.fire({
      toast: true,
      position: 'top',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
      title: type,
      text: `Holiday ${type.toLowerCase()} successfully!`
    });
  }
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImageFile = input.files[0];
      const objectUrl = URL.createObjectURL(this.selectedImageFile);
      this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl) as string;
    }
  }
    

  // onSubmit(): void {
  //   if (this.holidayForm.invalid){
  //     this.holidayForm.markAllAsTouched();
  //     return;
  //   }
  //   const listTypeBool = this.holidayForm.value.holidayStatus === '1' ? true : false;
  //   const payload = {
  //     holidayName: this.holidayForm.value.holidayName,
  //     holidayDate: this.holidayForm.value.holidayDate,
  //     holidayListType: this.holidayForm.value.holidayListType === '1',
  //     holidayStatus: listTypeBool
  //   };

  //   if (this.isEditMode && this.selectedHolidayId) {
  //     const dto: UpdateHolidayDto = { ...payload, holidayId: this.selectedHolidayId, updatedBy: 1 };
      
  //     this.holidayService.updateHoliday(dto).subscribe({
  //       next: () => {
  //         this.loadHolidays();
  //         this.modal.hide();
          
  //                   Swal.fire({
  //                     toast: true,
  //                     position: 'top',
  //                     timer: 1000,
  //                     timerProgressBar: true,
  //                     showConfirmButton: false,
  //                     icon: 'success',
  //                     title: 'Updated',
  //                     text: 'Holiday updated successfully!',
  //                     confirmButtonColor: '#3085d6',
  //                   });
  //       },
  //       error: (err) => this.errorHandler.handleError(err)
  //     });
  //   } else {
  //     const dto: CreateHolidayDto = { ...payload, createdBy: 1 };
  //     this.holidayService.createHoliday(dto).subscribe({
  //       next: () => {
  //         this.loadHolidays();
  //         this.modal.hide();
          
  //                   Swal.fire({
  //                     toast: true,
  //                     position: 'top',
  //                     timer: 1000,
  //                     timerProgressBar: true,
  //                     showConfirmButton: false,
  //                     icon: 'success',
  //                     title: 'Created',
  //                     text: 'Holiday created successfully!',
  //                     confirmButtonColor: '#3085d6',
  //                   });
  //       },
  //       error: (err) => this.errorHandler.handleError(err)
  //     });
  //   }
  // }
  onSubmit(): void {
    if (this.holidayForm.invalid) {
      this.holidayForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    formData.append('holidayName', this.holidayForm.value.holidayName);
    formData.append('holidayDate', this.holidayForm.value.holidayDate);
    formData.append('holidayListType', this.holidayForm.value.holidayListType);
    formData.append('holidayStatus', this.holidayForm.value.holidayStatus);
  
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
  
    if (this.isEditMode && this.selectedHolidayId) {
      formData.append('holidayId', this.selectedHolidayId.toString());
      formData.append('updatedBy', '1');
      this.holidayService.updateHoliday(formData).subscribe({
        next: () => this.handleSuccess('Updated'),
        error: err => this.errorHandler.handleError(err)
      });
    } else {
      formData.append('createdBy', '1');
      this.holidayService.createHoliday(formData).subscribe({
        next: () => this.handleSuccess('Created'),
        error: err => this.errorHandler.handleError(err)
      });
    }
  }
  
  // resetForm(): void {
  //   this.holidayForm.reset({
  //     holidayName: '',
  //     holidayDate: '',
  //     holidayListType: '1',
  //     holidayStatus: '1'
  //   });
  //   this.selectedHolidayId = null;
  // }
  resetForm(): void {
    this.holidayForm.reset({
      holidayName: '',
      holidayDate: '',
      holidayListType: '1',
      holidayStatus: '1'
    });
    this.selectedHolidayId = null;
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
  }
  
  onStatusChange(holiday: GetHolidayDto): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark "${holiday.holidayName}" as ${holiday.holidayStatus ? 'Inactive' : 'Active'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = holiday.holidayStatus ? 0 : 1;
  
        this.holidayService.softDeleteHoliday(holiday.holidayId, newStatus).subscribe({
          next: () => {
            this.loadHolidays();
            Swal.fire({
              icon: 'success',
              title: 'Status Updated',
              text: `"${holiday.holidayName}" is now ${newStatus ? 'Active' : 'Inactive'}.`,
              confirmButtonColor: '#3085d6'
            });
          },
          error: (err) => {
            this.errorHandler.handleError(err);
            this.loadHolidays();
          }
        });
      } else {
        this.loadHolidays(); 
      }
    });
  }

  onYearSelect(event: Date): void {
    const selectedYear = event.getFullYear();
    this.filter.year = selectedYear;
    // this.filterHolidays();
  }
}
