import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class EmployeeInfoService {
    constructor(private http: HttpClient) {}
    private apiUrl = 'https://localhost:7292/api/Employee_info';

    
    getTotalEmployees(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total-count`);
      }
      
}
