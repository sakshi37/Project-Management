// import * as signalR from '@microsoft/signalr';
// import { Injectable } from '@angular/core';
// import { RoleService } from './role.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AnnouncementService {
//     private hubConnection!: signalR.HubConnection;
//   constructor(private roleService: RoleService) { }
//   // startConnection() {
//   //   this.hubConnection = new signalR.HubConnectionBuilder()
//   //     .withUrl('https://localhost:7292/announcementHub')
//   //     .build();

//   //   this.hubConnection.start().then(() => {
//   //     console.log('SignalR Connected');

//   //     this.hubConnection.on('ReceiveAnnouncement', (announcement) => {
//   //       alert(`📢 ${announcement.title}: ${announcement.message}`);
//   //       // Optionally push to a notification panel
//   //     });
//   //   });
//   // }
//   startConnection() {
//   this.hubConnection = new signalR.HubConnectionBuilder()
//     .withUrl('https://localhost:7292/announcementHub', {
//       accessTokenFactory: () => this.roleService.getToken() || ''
//     })
//     .build();

//   this.hubConnection.start()
//     .then(() => {
//       console.log('SignalR Connected');
//       this.hubConnection.on('ReceiveAnnouncement', (announcement) => {
//         console.log('Received announcement:', announcement);
//         alert(`📢 ${announcement.title}: ${announcement.message}`);
//       });
//     })
//     .catch(err => console.error('Error while starting connection: ' + err));
// }

// }
import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { RoleService } from './role.service';
import { Subject, Observable } from 'rxjs';

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
  private hubConnection!: signalR.HubConnection;
  private announcementsSubject = new Subject<Announcement>();

  // Expose announcements as Observable
  announcements$: Observable<Announcement> = this.announcementsSubject.asObservable();

  constructor(private roleService: RoleService) {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7292/announcementHub', {
        accessTokenFactory: () => this.roleService.getToken() || ''
      })
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        this.hubConnection.on('ReceiveAnnouncement', (announcement: Announcement) => {
          console.log('Received announcement:', announcement);
          // Push announcement to subscribers
          this.announcementsSubject.next(announcement);
        });
      })
      .catch(err => console.error('Error while starting connection: ' + err));
  }
}
