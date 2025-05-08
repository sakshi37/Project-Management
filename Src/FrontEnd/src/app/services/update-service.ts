import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class UpdateService {
    private apiUrl = 'https://localhost:7292/api/Employee/Update';

    constructor(private http: HttpClient) {}
  
    updateEmployee(updatedEmployee: any): Observable<any> {
      return this.http.put(this.apiUrl, updatedEmployee);
    }
}
