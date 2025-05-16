import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../constant";
import { Injectable } from "@angular/core";
import { UserGroup } from "../Models/get-user-group-dto";
import { Shift } from "../Models/get-shift-dto";
import { EmployeeType } from "../Models/get-employee-type-dto";
import { Gender } from "../Models/get-gender-dto";

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
     getAllUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${this.url}/UserGroup`);
     }

     getAllShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.url}/Shift`);
  }

     getAllGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${this.url}/Gender`);
  }

     getEmployeeTypes():Observable<EmployeeType[]>{
      return this.http.get<EmployeeType[]>(`${this.url}/EmployeeType`)
     }
  }
    

