import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LefSideNavComponent } from '../../../shared/lef-side-nav/lef-side-nav.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DashboardInfoComponent } from '../dashboard-info/dashboard-info.component';
import { ActivityTimesheetComponent } from '../activity-timesheet/activity-timesheet.component';
import { Announcement, AnnouncementService } from '../../../services/announcement.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardInfoComponent, ActivityTimesheetComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent  {
  products: any;
  private newAnnouncementSubscription?: Subscription;
  private alertQueue: Announcement[] = [];
  private isShowingAlert = false;

  constructor(
    private apiService: ApiService, 
    private announcementService: AnnouncementService
  ) {}

  // async ngOnInit(): Promise<void> {
  //   console.log('Dashboard component initializing');
    
  //   // Start SignalR connection
  //   await this.announcementService.startConnection();
    
  //   console.log('SignalR connection state:', this.announcementService.getConnectionState());

  //   // Subscribe to new announcements in real-time
  //   this.newAnnouncementSubscription = this.announcementService.newAnnouncement$.subscribe((announcement) => {
  //     console.log('New announcement received in dashboard:', announcement);
  //     this.queueAlert(announcement);
  //   });
  // }

  // ngOnDestroy(): void {
  //   console.log('Dashboard component destroying');
  //   // Clean up subscription
  //   if (this.newAnnouncementSubscription) {
  //     this.newAnnouncementSubscription.unsubscribe();
  //   }
  // }

  // private queueAlert(announcement: Announcement) {
  //   console.log('Queueing alert for announcement:', announcement.id);
  //   this.alertQueue.push(announcement);
  //   this.processAlertQueue();
  // }

  // private async processAlertQueue() {
  //   if (this.isShowingAlert || this.alertQueue.length === 0) {
  //     return;
  //   }

  //   this.isShowingAlert = true;
    
  //   while (this.alertQueue.length > 0) {
  //     const announcement = this.alertQueue.shift();
  //     if (announcement) {
  //       console.log('Showing alert for announcement:', announcement.id);
  //       await this.showAlert(announcement);
  //       this.announcementService.markAnnouncementAsShown(announcement.id);
        
  //       // Wait a bit before showing next alert
  //       await this.delay(1000);
  //     }
  //   }
    
  //   this.isShowingAlert = false;
  // }

  // private showAlert(announcement: Announcement): Promise<any> {
  //   return Swal.fire({
  //     title: announcement.title,
  //     text: announcement.message,
  //     icon: 'info',
  //     confirmButtonText: 'OK',
  //     timer: 10000,
  //     timerProgressBar: true,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false
  //   });
  // }

  // private delay(ms: number): Promise<void> {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
}