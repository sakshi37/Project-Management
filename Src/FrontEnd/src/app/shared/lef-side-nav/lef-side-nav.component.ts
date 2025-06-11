import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

import { ProfileService, UserProfile } from '../../services/profile-services';
import { RoleService } from '../../services/role.service';
import { NotificationModel } from '../../Models/notification-model';
import { NotificationService } from '../../services/notification-service';
import { AnnouncementService } from '../../services/announcement.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-lef-side-nav',
  templateUrl: './lef-side-nav.component.html',
  styleUrls: ['./lef-side-nav.component.css'],
  standalone: true,
  imports: [RouterLink, HeaderComponent, CommonModule],
})
export class LefSideNavComponent {
  hasNewAnnouncement: boolean = false;
  unreadAnnouncements: any[] = [];
  unreadAnnouncementCount: number = 0;


  userRole: string | null = null;
  user: UserProfile = {
    image: '',
    name: '',
    designationName: '',
  };
  imageSrc: string | null = null;
  hasUnreadNotifications = false;
  unreadCount: number = 0;
  sidebarVisible: boolean = true;
  code: string = '';
  icon: string = 'fa fa-eye-slash ms-2';

  @Output() sidebarToggled = new EventEmitter<boolean>();

  @ViewChild('profileMenu') profileMenu: ElementRef | undefined;
  @ViewChild('mastersMenu') mastersMenu: ElementRef | undefined;
  @ViewChild('hrMenu') hrMenu: ElementRef | undefined;
  @ViewChild('announcementMenu') announcementMenu: ElementRef | undefined;

  constructor(
    private renderer: Renderer2,
    private profileService: ProfileService,
    private router: Router,
    private roleService: RoleService,
    private notificationService: NotificationService,
    private announcementService: AnnouncementService,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      return;
    }
    // this.announcementService.newAnnouncement$.subscribe((announcement) => {
    //     console.log('🔴 New announcement received in sidebar');

    //   this.hasNewAnnouncement = true; // show red dot
    // });
    // this.router.events.subscribe((event: any) => {
    //   if (event.url === '/announcements') {
    //     this.hasNewAnnouncement = false; // hide red dot on visiting announcement page
    //   }
    // });

    this.announcementService.newAnnouncement$.subscribe((announcement) => {
      this.unreadAnnouncements.unshift(announcement); // Add to preview list
      this.unreadAnnouncementCount = this.unreadAnnouncements.length;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/announcements') {
        this.unreadAnnouncements = [];
        this.unreadAnnouncementCount = 0;
      }
    });


    const decodedToken = jwtDecode<any>(token);
    const code = decodedToken?.sub;
    this.userRole = decodedToken?.role || null;

    if (!code) {
      console.error('No code found. User might not be logged in.');
      return;
    }

    // Get user profile
    this.profileService.getUserProfile(code).subscribe({
      next: (profile) => {
        this.user = profile;
        if (profile.image) {
          this.imageSrc = `data:image/png;base64,${profile.image}`;
        }
      },
      error: (err) => console.error('Error loading profile', err),
    });

    // Get notifications
    // Listen to unread count updates
    this.notificationService.unreadCount$.subscribe((count) => {
      this.unreadCount = count;
      this.hasUnreadNotifications = count > 0;
    });

    // Initial load
    this.notificationService.updateUnreadCount(code);
  }
  toggleAnnouncementMenu() {
    if (this.announcementMenu) {
      const classList = this.announcementMenu.nativeElement.classList;

      if (classList.contains('show')) {
        this.renderer.removeClass(this.announcementMenu.nativeElement, 'show');
        this.icon = 'fa fa-eye-slash ms-2';
      } else {
        this.renderer.addClass(this.announcementMenu.nativeElement, 'show');
        this.icon = 'fa fa-eye ms-2';

        // Clear unread
        this.unreadAnnouncementCount = 0;
      }
    }
  }
  goToAnnouncements() {
    this.router.navigate(['/announcements']);
    this.unreadAnnouncements = [];
    this.unreadAnnouncementCount = 0;
  }

  logout() {
    const appRef = this.injector.get(AppComponent);
    appRef.clearAnnouncementStream();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.announcementService.clear();

  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarToggled.emit(this.sidebarVisible);
  }

  toggleProfileMenu() {
    if (this.profileMenu) {
      const classList = this.profileMenu.nativeElement.classList;
      classList.contains('show')
        ? this.renderer.removeClass(this.profileMenu.nativeElement, 'show')
        : this.renderer.addClass(this.profileMenu.nativeElement, 'show');
    }
  }

  toggleMastersMenu() {
    if (this.mastersMenu) {
      const classList = this.mastersMenu.nativeElement.classList;
      classList.contains('show')
        ? this.renderer.removeClass(this.mastersMenu.nativeElement, 'show')
        : this.renderer.addClass(this.mastersMenu.nativeElement, 'show');
    }
  }

  toggleHrMenu() {
    if (this.hrMenu) {
      const classList = this.hrMenu.nativeElement.classList;
      classList.contains('show')
        ? this.renderer.removeClass(this.hrMenu.nativeElement, 'show')
        : this.renderer.addClass(this.hrMenu.nativeElement, 'show');
    }
  }
  toggleMessage(item: any): void {
    item.showMessage = !item.showMessage;

    if (item.showMessage && !item.isRead) {
      item.isRead = true;

      this.notificationService.markAsRead(item.notificationId).subscribe({
        next: () => {
          console.log(`Notification ${item.notificationId} marked as read.`);

          this.notificationService.updateUnreadCount(this.code);
        },
        error: (err) => console.error('Error marking as read:', err),
      });
    }
  }
}
