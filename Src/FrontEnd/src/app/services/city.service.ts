import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCityDto } from '../features/Master/settings/city/Models/get-city.dto';
import { Observable } from 'rxjs';
import { CreateCityDto } from '../features/Master/settings/city/Models/create-city.dto';
import { UpdateCityDto } from '../features/Master/settings/city/Models/update-city.dto';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = `${API_URL}/City`;

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<GetCityDto[]> {
    return this.http.get<GetCityDto[]>(this.apiUrl);
  }

  createCity(dto: CreateCityDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  updateCity(dto: UpdateCityDto): Observable<any> {
    return this.http.put(this.apiUrl, dto);
  }
  softDeleteCity(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
