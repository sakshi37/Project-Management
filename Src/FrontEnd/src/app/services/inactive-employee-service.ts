
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InactiveEmployeeModel } from '../Models/inactive-employee-model';
import { API_URL } from '../../constant';


@Injectable({
  providedIn: 'root'
})
export class InactiveEmployeeService {
      private apiUrl = `${API_URL}/Employee`;

    constructor(private http: HttpClient) {}
  
    deactivateEmployee(code: string): Observable<InactiveEmployeeModel> {
      const sanitizedCode = code.replace('%09', ''); // Remove any unwanted tab characters
      return this.http.post<InactiveEmployeeModel>(`${this.apiUrl}/Inactivate/${code}`, {});
    }
}
