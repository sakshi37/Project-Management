import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LefSideNavComponent } from '../../../shared/lef-side-nav/lef-side-nav.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DashboardInfoComponent } from '../dashboard-info/dashboard-info.component';
import { ActivityTimesheetComponent } from '../activity-timesheet/activity-timesheet.component';
import { Announcement, AnnouncementService } from '../../../services/announcement.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardInfoComponent, ActivityTimesheetComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  products: any;
  latestAnnouncement: Announcement | null = null;
  private shownAnnouncementIds = new Set<number>();



  constructor(private apiService: ApiService, private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    // this.announcementService.announcements$.subscribe((announcements) => {
    //   if (announcements.length > 0) {
    //     this.latestAnnouncement = announcements[0]; // only show the newest one
    //     // Optional: Hide alert after some time
    //     setTimeout(() => {
    //       this.latestAnnouncement = null;
    //     }, 5000);
    //   }
    // });
    this.announcementService.startConnection();

    // this.announcementService.announcements$.subscribe((announcements) => {
    //   if (announcements.length > 0) {
    //     const latest = announcements[0];
    //     this.latestAnnouncement = latest;

    //     // 👇 Show SweetAlert
    //     Swal.fire({
    //       title: latest.title,
    //       text: latest.message,
    //       icon: 'info',
    //       confirmButtonText: 'OK',
    //       timer: 10000,
    //       timerProgressBar: true
    //     });
    //   }
    // });
    this.announcementService.startConnection();

    this.announcementService.announcements$.subscribe((announcements) => {
      announcements.forEach((announcement) => {
        if (!this.shownAnnouncementIds.has(announcement.id)) {
          this.shownAnnouncementIds.add(announcement.id);
          this.showAlert(announcement);
        }
      });
    });
  }

  private showAlert(announcement: Announcement) {
    Swal.fire({
      title: announcement.title,
      text: announcement.message,
      icon: 'info',
      confirmButtonText: 'OK',
      timer: 10000,
      timerProgressBar: true
    });
  }
  }
  


