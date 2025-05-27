import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHolidayDto } from '../features/Master/holiday/Models/get-holiday.dto';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private apiUrl = `${API_URL}/Holiday`;

  constructor(private http: HttpClient) {}

  getAllHolidays(): Observable<GetHolidayDto[]> {
    return this.http.get<GetHolidayDto[]>(this.apiUrl);
  }

  // createHoliday(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.apiUrl}`, formData);
  // }

  // updateHoliday(formData: FormData): Observable<any> {
  //   return this.http.put(`${this.apiUrl}`, formData);
  // }

  // softDeleteHoliday(id: number, newStatus: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }


  createHoliday(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateHoliday(formData: FormData): Observable<any> {
    return this.http.put(this.apiUrl, formData);
  }

  softDeleteHoliday(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
