import { Component, Renderer2, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../../features/Dashboard/dashboard/dashboard.component';
import { ProfileService, UserProfile } from '../../services/profile-services';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { NotificationModel } from '../../Models/notification-model';
import { NotificationService } from '../../services/notification-services';

@Component({
  selector: 'app-lef-side-nav',
  templateUrl: './lef-side-nav.component.html',
  styleUrls: ['./lef-side-nav.component.css'],
  standalone: true,
  imports: [RouterLink, HeaderComponent,CommonModule],
})
export class LefSideNavComponent {
  logout() {
    
    // Clear session or token
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  user: UserProfile = {
    image: '',
    name: '',
    designationName: ''
  };
  imageSrc: string | null = null;
    hasUnreadNotifications = false;

  // Reference to the DOM elements
  @ViewChild('profileMenu') profileMenu: ElementRef | undefined;
  @ViewChild('mastersMenu') mastersMenu: ElementRef | undefined;
  @ViewChild('hrMenu') hrMenu: ElementRef | undefined;

  constructor(private renderer: Renderer2,private profileService: ProfileService, private router:Router,private notificationService:NotificationService) {}

ngOnInit(): void {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found.');
    return;
  }

  const decodedToken = jwtDecode<any>(token);
  const code = decodedToken?.sub;

  if (!code) {
    console.error('No code found. User might not be logged in.');
    return;
  }

  // Get profile
  this.profileService.getUserProfile(code).subscribe({
    next: (profile) => {
      this.user = profile;
      if (profile.image) {
        this.imageSrc = `data:image/png;base64,${profile.image}`;
      }
    },
    error: err => console.error('Error loading profile', err)
  });

  // Get notifications
  this.notificationService.getNotifications(code).subscribe({
    next: (data: NotificationModel[]) => {
      this.hasUnreadNotifications = data.some(n => !n.isRead);
    },
    error: err => console.error('Error loading notifications', err)
  });
}

// sidebarVisible: boolean = true;

//   @Output() sidebarToggled = new EventEmitter<boolean>();

//   toggleSidebar() {
//     this.sidebarVisible = !this.sidebarVisible;
//     this.sidebarToggled.emit(this.sidebarVisible);
//   }
@Output() sidebarToggled = new EventEmitter<boolean>();
sidebarVisible: boolean = true;

toggleSidebar() {
  this.sidebarVisible = !this.sidebarVisible;
  this.sidebarToggled.emit(this.sidebarVisible);
}
  // Method to toggle profile menu
  toggleProfileMenu() {
    if (this.profileMenu) {
      const classList = this.profileMenu.nativeElement.classList;
      if (classList.contains('show')) {
        this.renderer.removeClass(this.profileMenu.nativeElement, 'show');
      } else {
        this.renderer.addClass(this.profileMenu.nativeElement, 'show');
      }
    }
  }

  // Method to toggle masters menu
  toggleMastersMenu() {
    if (this.mastersMenu) {
      const classList = this.mastersMenu.nativeElement.classList;
      if (classList.contains('show')) {
        this.renderer.removeClass(this.mastersMenu.nativeElement, 'show');
      } else {
        this.renderer.addClass(this.mastersMenu.nativeElement, 'show');
      }
    }
  }

  // Method to toggle HR menu
  toggleHrMenu() {
    if (this.hrMenu) {
      const classList = this.hrMenu.nativeElement.classList;
      if (classList.contains('show')) {
        this.renderer.removeClass(this.hrMenu.nativeElement, 'show');
      } else {
        this.renderer.addClass(this.hrMenu.nativeElement, 'show');
      }
    }
  }
}
