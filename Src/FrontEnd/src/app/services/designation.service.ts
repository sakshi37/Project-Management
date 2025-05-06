import { Injectable } from '@angular/core';
import { GetDesignationDto } from '../features/Master/settings/designation/Models/get-designation.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDesignationDto } from '../features/Master/settings/designation/Models/create-designation.dto';
import { UpdateDesignationDto } from '../features/Master/settings/designation/Models/update-designation.dto';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  private apiUrl = `${API_URL}/Designation`;

  constructor(private http: HttpClient) {}

  getAllDesignations(): Observable<GetDesignationDto[]> {
    return this.http.get<GetDesignationDto[]>(this.apiUrl);
  }

  createDesignation(dto: CreateDesignationDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  updateDesignation(dto: UpdateDesignationDto): Observable<any> {
    return this.http.put(this.apiUrl, dto);
  }

  softDeleteDesignation(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
