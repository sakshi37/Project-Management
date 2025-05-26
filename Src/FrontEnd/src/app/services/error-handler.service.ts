import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: HttpErrorResponse): void {
    const message = error?.error?.message || 'An unexpected error occurred';

    Swal.fire({
      toast: true,
      position: 'top',
      timerProgressBar : true,
      timer: 3000,
      icon: 'error',
      title: 'Error',
      showConfirmButton: false,
      text: message
    });
    console.error(error.error)
  }
}
