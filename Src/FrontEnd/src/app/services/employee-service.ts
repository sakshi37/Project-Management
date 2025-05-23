import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EmployeeFull,
  EmployeeModel,
  EmployeeResponse,
} from '../Models/employee-model';
import { CreateModel } from '../Models/create-model';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7292/AllEmployees';

  private url = API_URL;

  constructor(private http: HttpClient) {}

  getPagedEmployees(
    page: number,
    size: number,
    search?: string
  ): Observable<any> {
    let params: any = { page, size };
    if (search) {
      params.search = search;
    }
    if (search && search.trim() !== '') {
      params.search = search.trim();
    }

    return this.http.get<any>(
      `${
        this.url
      }/Employee/AllEmployees?pageNumber=${page}&pageSize=${size}&search=${
        search ?? ''
      }`
    );
  }
  createEmployee(employee: CreateModel): Observable<any> {
    return this.http.post(this.url + '/Employee', employee);
  }
  getTeamLeaders(): Observable<any[]> {
    return this.http.get<any[]>(
      this.url + '/Employee/EmployeeByDesignation?did=6'
    );
  }

  getAllLocation() {
    return this.http.get<Location[]>(this.url + '/Location');
  }
  getAllEmployeeByIdName() {
    return this.http.get<EmployeeByIdName[]>(
      `${this.url}/Employee/GetAllEmployeeByIdName`
    );
  }
}

export type Location = {
  locationId: number;
  locationName: string;
};

export type EmployeeByIdName = {
  id: number;
  name: string;
};
