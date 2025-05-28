import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetDivisionDto } from '../features/Master/settings/division/division/Models/get-division.dto.service';
import { CreateDivisionDto } from '../features/Master/settings/division/division/Models/create-division.dto.service';
import { UpdateDivisionDto } from '../features/Master/settings/division/division/Models/update-division.dto.service';
import { Observable } from 'rxjs';
import { DivisionDto } from '../Models/division-dto';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private apiUrl= "https://localhost:7292/api/Division";

  constructor(private http:HttpClient) { }  
  getAllDivisions(): Observable<GetDivisionDto[]> {
      return this.http.get<GetDivisionDto[]>(this.apiUrl);
    }
  
    createDivisions(dto: CreateDivisionDto): Observable<DivisionDto> {
      return this.http.post<DivisionDto>(this.apiUrl, dto);
    }
  
    updateDivisions(dto: UpdateDivisionDto): Observable<any> {
      return this.http.put(this.apiUrl, dto);
    }
    softDeleteDivisions(id: number, newStatus: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  getProjectManagers() : Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllPM`);
  }
}
