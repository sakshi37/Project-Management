import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MissPushOutModel } from '../Models/daily-report';
import { API_URL } from '../../constant';


@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  private apiUrl = `${API_URL}/Attendance`;

  constructor(private http: HttpClient) {}

  getMissPunchOut(startDate: string): Observable<MissPushOutModel[]> {
    return this.http.get<MissPushOutModel[]>(`${this.apiUrl}/miss-punch-out?startDate=${startDate}`);
  }

  getHalfDay(startDate :string):Observable<[]>{
    return this.http.get<[]>(`${this.apiUrl}/halfdate?startDate=${startDate}`)
  }
}
