
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InactiveEmployeeModel } from '../Models/inactive-employee-model';


@Injectable({
  providedIn: 'root'
})
export class InactiveEmployeeService {
    private baseUrl = 'https://localhost:7292'; // Adjust if needed

    constructor(private http: HttpClient) {}
  
    deactivateEmployee(code: string): Observable<InactiveEmployeeModel> {
      return this.http.post<InactiveEmployeeModel>(`${this.baseUrl}/Inactivate/${code}`, {});
    }
}
