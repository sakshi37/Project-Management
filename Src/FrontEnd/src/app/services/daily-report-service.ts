import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MissPushOutModel } from '../Models/daily-report';


@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  private apiUrl = 'https://localhost:7292';

  constructor(private http: HttpClient) {}

  getMissPunchOut(startDate: string): Observable<MissPushOutModel[]> {
    return this.http.get<MissPushOutModel[]>(`${this.apiUrl}/miss-punch-out?startDate=${startDate}`);
  }
}
