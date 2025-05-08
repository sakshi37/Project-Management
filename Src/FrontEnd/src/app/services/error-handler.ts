
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandler {
  constructor() {}

  handleError(error: HttpErrorResponse): void {
    const message = error?.error?.message || 'An unexpected error occurred';

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#d33'
    });
  }
}
