import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from '../Models/notification-model';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = `${API_URL}/Notification`;

  constructor(private http: HttpClient) {}

  getNotifications(empCode: string): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.baseUrl}/${empCode}`);
  }
}
