import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../Models/notification-model';
import { NotificationService } from '../../services/notification-services';
import { CommonModule } from '@angular/common';

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
    const storedCode=localStorage.getItem('userName')
    if(storedCode){
      this.empCode=storedCode;

      this.notificationService.getNotifications(this.empCode).subscribe({
        next:data=>this.notification=data,
        error:err =>console.error('Error',err)
                 
      })
    } else{
      console.warn('No empCode found')
    }
  }

}
