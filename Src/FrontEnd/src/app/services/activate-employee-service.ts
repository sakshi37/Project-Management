import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivateEmployeeModel } from "../Models/activate-employee-model";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
  })

export class ActivateEmployeeService {
    private baseUrl = 'https://localhost:7292'; // Adjust if needed

    constructor(private http: HttpClient) {}
  
    activateEmployee(code: string): Observable<ActivateEmployeeModel> {
      const sanitizedCode = code.replace('%09', '');
      console.log('Activating employee with code:', code); // Log code for debugging
      return this.http.put<ActivateEmployeeModel>(`${this.baseUrl}/api/Employee/Activate/${code}`, {}, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
}
