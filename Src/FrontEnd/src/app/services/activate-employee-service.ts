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
  
    activateEmployee(Code: string): Observable<ActivateEmployeeModel> {
      return this.http.put<ActivateEmployeeModel>(`${this.baseUrl}/Activate/${Code}`, {},// empty body
        { headers: { 'Content-Type': 'application/json' } });
    }
}
