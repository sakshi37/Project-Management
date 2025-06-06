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
import { RoleService } from '../../../services/role.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AnnouncementComponent } from '../../announcement/announcement.component';

function letterLengthValidator(minLength: number, maxLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    // Count only letters a-z, A-Z
    const lettersOnly = value.replace(/[^a-zA-Z]/g, '');

    if (lettersOnly.length < minLength) {
      return { minLetterLength: { requiredLength: minLength, actualLength: lettersOnly.length } };
    }

    if (lettersOnly.length > maxLength) {
      return { maxLetterLength: { requiredLength: maxLength, actualLength: lettersOnly.length } };
    }

    return null;
  };
}


// export function noPastDateValidator(control: AbstractControl): ValidationErrors | null {
//   if (!control.value) return null;

//   const selectedDate = new Date(control.value);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // normalize today
//   selectedDate.setHours(0, 0, 0, 0); // normalize selected date

//   return selectedDate < today ? { pastDate: true } : null;
// }

export function noPastDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    console.log('Validator: control empty');
    return null; // no error if no value
  }

  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  console.log('Validator:', { selectedDate, today });
  

  return selectedDate < today ? { pastDate: true } : null;
}
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
  itemsPerPage: number = 3; 
  selectedImageFile: File | null = null;
imagePreviewUrl: string | null = null;
viewModeToggle: boolean = false; // false = Table, true = user
userRole:string | null = null; 
existingImagePath: string | null = null;

today!: string;


viewMode: 'card' | 'table' = 'table';
activeCardHolidays: GetHolidayDto[] = [];
pastCardHolidays: GetHolidayDto[] = [];

splitCardHolidays(): void {
  this.activeCardHolidays = this.filteredResults.filter(h => !this.isPastDate(h.holidayDate));
  this.pastCardHolidays = this.filteredResults.filter(h => this.isPastDate(h.holidayDate));
}



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
    private sanitizer: DomSanitizer,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHolidays();
    this.userRole = this.roleService.getUserRole();
    this.today = new Date().toISOString().split('T')[0]; 
    if (this.userRole !== 'HR') {
      this.viewModeToggle = true; 
    }
  }

  ngAfterViewInit(): void {
    const modalEl = this.el.nativeElement.querySelector('#holidayModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
    }
  }

  initForm(): void {
    this.holidayForm = this.fb.group({
      holidayName: ['', [Validators.required,Validators.required,letterLengthValidator(3, 20), Validators.pattern('^[a-zA-Z ]+$')]],
      holidayDate: ['', [Validators.required,noPastDateValidator]],
      holidayListType: ["", Validators.required],
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
      this.splitCardHolidays();
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
    this.splitCardHolidays();
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

  // onEdit(h: GetHolidayDto): void {
  //   this.holidayForm.patchValue({
  //     holidayName: h.holidayName,
  //     holidayDate: h.holidayDate.split('T')[0],
  //     holidayListType: h.holidayListType ? 'true' : 'false',
  //     holidayStatus: h.holidayStatus ? 'true' : 'false'
  //   });
  //   this.selectedHolidayId = h.holidayId;
  //   this.isEditMode = true;
  //   this.imagePreviewUrl = h.imagePath ? 'http://127.0.0.1:8080/' + h.imagePath : null;
  //   this.modal.show();
  // }
  onEdit(h: GetHolidayDto): void {

    this.holidayForm.patchValue({
      holidayName: h.holidayName,
      holidayDate: h.holidayDate.split('T')[0],
      holidayListType: h.holidayListType ? '1' : '0',
      holidayStatus: h.holidayStatus ? 'true' : 'false'
    });
    console.log('listType:', h.holidayListType);
    console.log('status:', h.holidayStatus);
    this.selectedHolidayId = h.holidayId;
    this.isEditMode = true;

    this.existingImagePath = h.imagePath || null;
    this.imagePreviewUrl = this.existingImagePath ? 'http://127.0.0.1:8080/' + this.existingImagePath : null;
    this.selectedImageFile = null; 
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
  // onImageChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input?.files?.length) {
  //     this.selectedImageFile = input.files[0];
  //     const objectUrl = URL.createObjectURL(this.selectedImageFile);
  //     this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl) as string;
  //   }
  // }
  imageError: string | null = null;
  
 onImageChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const file = input.files[0];
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      this.imageError = 'Only JPG and PNG images are allowed.';
      input.value = ''; // Reset input
      this.selectedImageFile = null;
      this.imagePreviewUrl = null;
      return;
    }

    this.imageError = null; // Clear any previous errors
    this.selectedImageFile = file;

    const objectUrl = URL.createObjectURL(file);
    this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl) as string;
  }
}


    

  onSubmit(): void {
    if (this.holidayForm.invalid) {
      this.holidayForm.markAllAsTouched();
      return;
    }
    this.holidayForm.get('holidayDate')?.statusChanges.subscribe(status => {
  console.log('holidayDate status:', status);
  console.log('Errors:', this.holidayForm.get('holidayDate')?.errors);
});
const statusValue = this.holidayForm.value.holidayStatus;
const ListTypeValue = this.holidayForm.value.holidayListType;

// If it comes as string 'true'/'false', convert to boolean:
const holidayStatusBool = statusValue === true || statusValue === 'true';
const holidayListTypeBool = ListTypeValue == 1 || ListTypeValue == '1';
  
    const formData = new FormData();
    formData.append('holidayName', this.holidayForm.value.holidayName);
    formData.append('holidayDate', this.holidayForm.value.holidayDate);
    formData.append('holidayListType', holidayListTypeBool ? 'true' : 'false'); // Convert to string 'true'/'false'
    formData.append('holidayStatus', holidayStatusBool ? 'true' : 'false'); // Convert to string 'true'/'false'

    if (this.selectedImageFile) {
      console.log('Appending new image file:', this.selectedImageFile);
      formData.append('image', this.selectedImageFile);
    } else if (this.isEditMode) {
      // Always send existingImagePath in edit mode (even empty)
      const existingPathToSend = this.existingImagePath ? this.existingImagePath : '';
      console.log("after submiting",this.holidayForm.value)
      console.log('Appending existingImagePath:', existingPathToSend);
      formData.append('existingImagePath', existingPathToSend);
    }
  
    if (this.isEditMode && this.selectedHolidayId) {
      formData.append('holidayId', this.selectedHolidayId.toString());
      formData.append('updatedBy', '1');
      this.holidayService.updateHoliday(formData).subscribe({
        next: () => this.handleSuccess('Updated'),
        error: err => this.errorHandler.handleError(err)
      });
    } else {
            console.log("after again submiting",this.holidayForm.value)

      formData.append('createdBy', '1');
      this.holidayService.createHoliday(formData).subscribe({
        next: () => this.handleSuccess('Created'),
        error: err => this.errorHandler.handleError(err)
      });
    }
  }
  
  


  resetForm(): void {
    this.holidayForm.reset({
      holidayName: '',
      holidayDate: '',
      holidayListType: '',
      holidayStatus: '1'
    });
    this.selectedHolidayId = null;
    this.selectedImageFile = null;
    this.existingImagePath = null;
    this.imagePreviewUrl = null;
  }

  
  onStatusChange(holiday: GetHolidayDto): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to Remove "${holiday.holidayName}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = holiday.holidayStatus ? 0 : 1;
  
        this.holidayService.softDeleteHoliday(holiday.holidayId, newStatus).subscribe({
          next: () => {
            this.loadHolidays();
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Status Updated',
            //   text: `"${holiday.holidayName}" is now ${newStatus ? 'Active' : 'Inactive'}.`,
            //   confirmButtonColor: '#3085d6'
            // });
            this.handleSuccess('Deleted');
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
