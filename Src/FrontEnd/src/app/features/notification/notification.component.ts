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
  notification: (NotificationModel & { showMessage?: boolean })[] = [];
  empCode: string = '';

  constructor(private notificationService: NotificationService) {}

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
            isDeleted: item.isDeleted ?? item.IsDeleted,
            showMessage: false // initially hidden
          }));
        },
        error: (err) => console.error('Error', err)
      });
    } else {
      console.warn('No empCode found');
    }
  }

  toggleMessage(item: NotificationModel & { showMessage?: boolean }): void {
  item.showMessage = !item.showMessage;

  if (item.showMessage && !item.isRead) {
    item.isRead = true;
    this.notificationService.markAsRead(item.notificationId).subscribe({
      next: () => {
        console.log(`Notification ${item.notificationId} marked as read.`);
        // 🔄 Refresh unread count for sidebar
        this.notificationService.updateUnreadCount(this.empCode);
      },
      error: (err) => console.error('Error marking as read:', err)
    });
  }
}


 readAndDeleteNotification(notificationId: number): void {
  this.notificationService.readAndDelNotifications(notificationId).subscribe({
    next: (res) => {
      console.log(res.message);
      this.notification = this.notification.filter(n => n.notificationId !== notificationId);

      // 🔄 Refresh unread count for sidebar
      this.notificationService.updateUnreadCount(this.empCode);
    },
    error: (err) => {
      console.error('Error deleting notification:', err);
    }
  });
}
}

