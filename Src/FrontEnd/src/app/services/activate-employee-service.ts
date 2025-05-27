import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivateEmployeeModel } from "../Models/activate-employee-model";
import { Injectable } from "@angular/core";
import { API_URL } from "../../constant";
import { jwtDecode } from "jwt-decode";
@Injectable({
    providedIn: 'root'
  })

export class ActivateEmployeeService {
    private apiUrl = `${API_URL}`; // Adjust if needed

    constructor(private http: HttpClient) {}
  
    // activateEmployee(code: string): Observable<ActivateEmployeeModel> {
    //   const sanitizedCode = code.replace('%09', '');
    //   console.log('Activating employee with code:', code); // Log code for debugging
    //   return this.http.put<ActivateEmployeeModel>(`${this.baseUrl}/api/Employee/Activate/${code}`, {}, {
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }
    
    activateEmployee(forEmpCode: string, reason: string): Observable<any> {
  const decodedToken = jwtDecode(String(localStorage.getItem('token')));
        const requestByEmpCode = decodedToken.sub; 

  if (!requestByEmpCode) {
    throw new Error('Logged-in user employee code not found in localStorage.');
  }

  const body = {
    forEmpCode,
    requestByEmpCode,
    reason
  };

  return this.http.post<any>(this.apiUrl+'/RequestByHr', body, {
    headers: { 'Content-Type': 'application/json' }
  });
}

}
