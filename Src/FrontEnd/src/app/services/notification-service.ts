import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  NotificationModel,
  ReadAndDelNotifications,
} from '../Models/notification-model';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = `${API_URL}/Notification`;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getNotifications(empCode: string): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.baseUrl}/${empCode}`);
  }

  readAndDelNotifications(
    notificationId: number
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.baseUrl}/DeletAndReadNotification?notificationId=${notificationId}`,
      {}
    );
  }
  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/make-read?notificationId=${notificationId}`,
      {}
    );
  }
  updateUnreadCount(code: string) {
    this.getNotifications(code).subscribe({
      next: (data) => {
        const count = data.filter((n) => !n.isRead).length;
        this.unreadCountSubject.next(count); // 👈 this triggers the update
      },
      error: (err) => console.error('Error updating unread count', err),
    });
  }
}
