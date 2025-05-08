import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../constant";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
 private url = API_URL;
    constructor(private http: HttpClient) {}
  
    updateEmployee(updatedEmployee: any): Observable<any> {
      return this.http.put(this.url + '/Employee/Update', updatedEmployee, {
        responseType: 'text' as 'json'
      });
    }
    
}
