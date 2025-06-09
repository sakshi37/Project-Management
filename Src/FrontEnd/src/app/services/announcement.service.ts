
import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { RoleService } from './role.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../../constant';

export interface Announcement {
  id: number;
  title: string;
  message: string;
  fromDate: string;
  toDate: string;
  targetType: string;
  targetValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    private apiUrl = `${API_URL}/BroadcastAnnouncement/get-by-user`;
  
  private hubConnection!: signalR.HubConnection;

  // Subject for individual new announcements
  private newAnnouncementSubject = new Subject<Announcement>();
  newAnnouncement$: Observable<Announcement> = this.newAnnouncementSubject.asObservable();
  
  // Track shown announcements globally (persists across components)
  private shownAnnouncementIds = new Set<number>();

  constructor(private roleService: RoleService, private http: HttpClient) {}
  getAnnouncements(employeeCode: string, userGroup: string): Observable<Announcement[]> {
  console.log('Fetching announcements for employeeCode:', employeeCode, 'and userGroup:', userGroup);
  const params = new HttpParams()
    .set('employeeCode', employeeCode)
    .set('userGroup', userGroup);

  return this.http.get<Announcement[]>(this.apiUrl, { params });
}


  async startConnection() {
    // If connection exists and is connected, don't start again
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      console.log('SignalR already connected');
      return;
    }

    // If connection exists but not connected, stop it first
    if (this.hubConnection) {
      await this.stopConnection();
    }

    const token = this.roleService.getToken();
    if (!token) {
      console.warn('No token available, cannot start SignalR connection');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7292/announcementHub', {
        accessTokenFactory: () => this.roleService.getToken() || ''
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      console.log('SignalR Connected');

      this.hubConnection.on('ReceiveAnnouncement', (announcement: Announcement) => {
        console.log('Received announcement from SignalR:', announcement);
        // if i dont want to mark else ccomment this line
          this.newAnnouncementSubject.next(announcement);

        
        // Check if we've already shown this announcement
        // if (!this.shownAnnouncementIds.has(announcement.id)) {
        //   console.log('New announcement, emitting:', announcement.id);
        //   this.newAnnouncementSubject.next(announcement);
        // } else {
        //   console.log('Announcement already shown:', announcement.id);
        // }
      });

      // Handle reconnection
      this.hubConnection.onreconnected(() => {
        console.log('SignalR Reconnected');
      });

      this.hubConnection.onclose(() => {
        console.log('SignalR connection closed');
      });

    } catch (err) {
      console.error('SignalR connection error: ' + err);
    }
  }

  async stopConnection() {
    if (this.hubConnection) {
      try {
        await this.hubConnection.stop();
        console.log('SignalR Disconnected');
      } catch (err) {
        console.error('Error stopping SignalR connection:', err);
      }
    }
  }

  // Method to restart connection after login
  async restartConnection() {
    console.log('Restarting SignalR connection');
    await this.stopConnection();
    await this.startConnection();
  }

  // Check if announcement was already shown
  isAnnouncementShown(id: number): boolean {
    return this.shownAnnouncementIds.has(id);
  }

  // Mark announcement as shown
  markAnnouncementAsShown(id: number) {
    console.log('Marking announcement as shown:', id);
    this.shownAnnouncementIds.add(id);
  }

  // Clear announcements and reset shown IDs
  clear() {
    this.shownAnnouncementIds.clear();
    console.log('Cleared all shown announcement IDs');
  }

  // Clear only shown announcement IDs (useful for testing)
  clearShownIds() {
    this.shownAnnouncementIds.clear();
    console.log('Cleared shown announcement IDs');
  }

  // Get connection state
  getConnectionState(): string {
    if (!this.hubConnection) return 'Not initialized';
    return signalR.HubConnectionState[this.hubConnection.state];
  }
}
