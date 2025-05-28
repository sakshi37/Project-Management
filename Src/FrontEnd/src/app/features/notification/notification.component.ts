import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../Models/notification-model';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notification:NotificationModel[]=[];
  empCode:string=''
  constructor(private notificationService: NotificationService){}
  ngOnInit(): void {
  const decodedToken = jwtDecode(String(localStorage.getItem('token')));
  const storedCode = decodedToken.sub;

  if (storedCode) {
    this.empCode = storedCode;

    this.notificationService.getNotifications(this.empCode).subscribe({
      next: (data) => {
        this.notification = data.map((item: any) => ({
          notificationId: item.notificationId || item.NotificationId,
          subject: item.subject || item.Subject,
          message: item.message || item.Message,
          isRead: item.isRead ?? item.IsRead,
          isDeleted: item.isDeleted ?? item.IsDeleted
        }));
      },
      error: (err) => console.error('Error', err)
    });
  } else {
    console.warn('No empCode found');
  }
}

  readAndDeleteNotification(notificationId: number): void {
  this.notificationService.readAndDelNotifications(notificationId).subscribe({
    next: (res) => {
      console.log(res.message);
      
      this.notification = this.notification.filter(n => n.notificationId !== notificationId);
    },
    error: (err) => {
      console.error('Error deleting notification:', err);
    }
  });
}


}
