import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    private hubConnection!: signalR.HubConnection;
  constructor() { }
  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7292/announcementHub')
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR Connected');

      this.hubConnection.on('ReceiveAnnouncement', (announcement) => {
        alert(`📢 ${announcement.title}: ${announcement.message}`);
        // Optionally push to a notification panel
      });
    });
  }

}
