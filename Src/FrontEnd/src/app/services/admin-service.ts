import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant';

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
  private apiUrl = `${API_URL}/Admin`;

  constructor(private http: HttpClient) {}

  getPendingRequests(): Observable<ActivationRequest[]> {
    return this.http.get<ActivationRequest[]>(this.apiUrl);
  }

  rejectRequest(requestId: number, empCode: string, comment: string) {
  const payload = {
    requestId,
    empCode,
    comment
  };

  return this.http.post<any>(this.apiUrl+'/rejectrequest', payload);
}

approveRequest(requestId: number, empCode: string, comment: string) {
  const payload = {
    requestId,
    empCode,
    comment
  };

  return this.http.post<any>(this.apiUrl+'/approverequest', payload);
}


 
}
