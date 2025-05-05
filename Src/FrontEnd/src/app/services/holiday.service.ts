import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHolidayDto } from '../features/Master/holiday/Models/get-holiday.dto';
import { CreateHolidayDto } from '../features/Master/holiday/Models/create-holiday.dto';
import { UpdateHolidayDto } from '../features/Master/holiday/Models/update-holiday.dto';
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

  createHoliday(dto: CreateHolidayDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  updateHoliday(dto: UpdateHolidayDto): Observable<any> {
    return this.http.put(this.apiUrl, dto);
  }

  softDeleteHoliday(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
