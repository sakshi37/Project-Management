import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LefSideNavComponent } from './shared/lef-side-nav/lef-side-nav.component';
import { LoginComponent } from './features/login/login.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';
import { CountryComponent } from './features/Master/settings/country/country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './features/Dashboard/dashboard/dashboard.component';
import { Subscription } from 'rxjs';
import { Announcement, AnnouncementService } from './services/announcement.service';
import Swal from 'sweetalert2';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    LefSideNavComponent,
    CommonModule,
    ReactiveFormsModule,
    // DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private newAnnouncementSubscription?: Subscription;
  private alertQueue: Announcement[] = [];
  private isShowingAlert = false;
// async ngOnInit(): Promise<void> {
//   console.log('Dashboard component initializing');

//   // Start SignalR only if token exists
//   if (this.roleService.getToken()) {
//     await this.announcementService.startConnection(); // ✅ Only once

//     console.log('SignalR connection state:', this.announcementService.getConnectionState());

//     // Subscribe to announcements only once
//     this.newAnnouncementSubscription = this.announcementService.newAnnouncement$.subscribe((announcement) => {
//       console.log('New announcement received in dashboard:', announcement);
//       this.queueAlert(announcement);
//     });
//   }
// }
async ngOnInit(): Promise<void> {
  if (this.roleService.getToken()) {
    await this.announcementService.startConnection();
    this.subscribeToAnnouncements();
  }
}

  subscribeToAnnouncements(): void {
  if (this.newAnnouncementSubscription) {
    this.newAnnouncementSubscription.unsubscribe();
  }

  this.newAnnouncementSubscription = this.announcementService.newAnnouncement$.subscribe((announcement) => {
    console.log('New announcement received in AppComponent:', announcement);
    this.queueAlert(announcement);
  });
}


  ngOnDestroy(): void {
    console.log('Dashboard component destroying');
    // Clean up subscription
    if (this.newAnnouncementSubscription) {
      this.newAnnouncementSubscription.unsubscribe();
    }
  }

  private queueAlert(announcement: Announcement) {
    console.log('Queueing alert for announcement:', announcement.id);
    this.alertQueue.push(announcement);
    this.processAlertQueue();
  }

  private async processAlertQueue() {
    if (this.isShowingAlert || this.alertQueue.length === 0) {
      return;
    }

    this.isShowingAlert = true;

    while (this.alertQueue.length > 0) {
      const announcement = this.alertQueue.shift();
      if (announcement) {
        console.log('Showing alert for announcement:', announcement.id);
        await this.showAlert(announcement);
        this.announcementService.markAnnouncementAsShown(announcement.id);

        // Wait a bit before showing next alert
        await this.delay(1000);
      }
    }

    this.isShowingAlert = false;
  }

  public clearAnnouncementStream(): void {
  if (this.newAnnouncementSubscription) {
    this.newAnnouncementSubscription.unsubscribe();
    this.newAnnouncementSubscription = undefined;
  }
  this.announcementService.stopConnection();
  this.alertQueue = [];
  this.isShowingAlert = false;
}

  private showAlert(announcement: Announcement): Promise<any> {
    // return Swal.fire({
    //   title: announcement.title,
    //   text: announcement.message,
    //   icon: 'info',
    //   toast: true,
    //   position: 'top',
    //   confirmButtonText: 'Okay',

    //   // timer: 10000,
    //   timerProgressBar: true,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false
    // });
    return Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      confirmButtonText: 'Okay',
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'swal2-toast-custom'
      },
      html: `
    <div style="display: flex; align-items: center;">
      <img src="images/announcement.png" alt="Announcement" style="width: 40px; height: 40px; margin-right: 10px;">
      <div style="text-align: left;">
        <div style="font-weight: bold;">${announcement.title}</div>
        <div style="font-size: 0.875rem;">${announcement.message}</div>
      </div>
    </div>
  `
    });

  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ngOnInit(): void {
  //   console.log((window as any).bootstrap); // Should log Bootstrap object
  // }

  // hideLayout = false;
  // isSidebarVisible: boolean = true;

  // onSidebarToggled(visible: boolean) {
  //   this.isSidebarVisible = visible;
  // }
  hideLayout = true;
  currentRoute: string = '';
  // hideLayout = false;
  isSidebarVisible = true;
  paddingTop: string = '65px';


  onSidebarToggled(newState: boolean) {
    this.isSidebarVisible = newState;
  }
  constructor(
    private router: Router,
    private announcementService: AnnouncementService,
    private roleService: RoleService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/', '/login', '/otp'];
        this.hideLayout = hiddenRoutes.includes(event.urlAfterRedirects);

        if (this.hideLayout) {
          this.isSidebarVisible = false;
        }
        this.paddingTop = this.hideLayout ? '0px' : '65px';

      });
  }
}

