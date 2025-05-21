import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ActivationRequest {
  id: number;
  employeeName: string;
  requestByName: string;
  reason: string;
  action: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = 'https://localhost:7292/api/Admin';

  constructor(private http: HttpClient) {}

  getPendingRequests(): Observable<ActivationRequest[]> {
    return this.http.get<ActivationRequest[]>(this.apiUrl);
  }

  approveRequest(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Approve/${id}`, null);
  }

  rejectRequest(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Reject/${id}`, null);
  }
}
