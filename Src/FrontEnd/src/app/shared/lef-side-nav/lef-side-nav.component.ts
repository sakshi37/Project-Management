import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

import { ProfileService, UserProfile } from '../../services/profile-services';
import { RoleService } from '../../services/role.service';
import { NotificationModel } from '../../Models/notification-model';
import { NotificationService } from '../../services/notification-service';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-lef-side-nav',
  templateUrl: './lef-side-nav.component.html',
  styleUrls: ['./lef-side-nav.component.css'],
  standalone: true,
  imports: [RouterLink, HeaderComponent, CommonModule],
})
export class LefSideNavComponent {
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

  @Output() sidebarToggled = new EventEmitter<boolean>();

  @ViewChild('profileMenu') profileMenu: ElementRef | undefined;
  @ViewChild('mastersMenu') mastersMenu: ElementRef | undefined;
  @ViewChild('hrMenu') hrMenu: ElementRef | undefined;
  constructor(
    private renderer: Renderer2,
    private profileService: ProfileService,
    private router: Router,
    private roleService: RoleService,
    private notificationService: NotificationService,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      return;
    }

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

  logout() {
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
