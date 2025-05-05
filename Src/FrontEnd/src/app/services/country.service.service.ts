import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCountryDto } from '../features/Master/settings/country/Models/get-country.dto';
import { CreateCountryDto } from '../features/Master/settings/country/Models/create-country.dto';
import { UpdateCountryDto } from '../features/Master/settings/country/Models/update-country.dto';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = `${API_URL}/Country`;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<GetCountryDto[]> {
    return this.http.get<GetCountryDto[]>(`${this.apiUrl}`);
  }

  createCountry(dto: CreateCountryDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, dto);
  }

  updateCountry(updateDto: UpdateCountryDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, updateDto);
  }

  softDeleteCountry(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
