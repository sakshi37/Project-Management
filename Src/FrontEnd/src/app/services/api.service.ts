import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getListOfPorducts() : Observable<any>{
    return this.http.get('https://fakestoreapi.com/products').pipe(
      catchError(async (err) => this.handleError(err))
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Something went wrong!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMsg = `Server Error ${error.status}: ${error.message}`;
    }
  }
}
