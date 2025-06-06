import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    private hubConnection!: signalR.HubConnection;
  constructor(private roleService: RoleService) { }
  // startConnection() {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:7292/announcementHub')
  //     .build();

  //   this.hubConnection.start().then(() => {
  //     console.log('SignalR Connected');

  //     this.hubConnection.on('ReceiveAnnouncement', (announcement) => {
  //       alert(`📢 ${announcement.title}: ${announcement.message}`);
  //       // Optionally push to a notification panel
  //     });
  //   });
  // }
  startConnection() {
  this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7292/announcementHub', {
      accessTokenFactory: () => this.roleService.getToken() || ''
    })
    .build();

  this.hubConnection.start()
    .then(() => {
      console.log('SignalR Connected');
      this.hubConnection.on('ReceiveAnnouncement', (announcement) => {
        console.log('Received announcement:', announcement);
        alert(`📢 ${announcement.title}: ${announcement.message}`);
      });
    })
    .catch(err => console.error('Error while starting connection: ' + err));
}

}
