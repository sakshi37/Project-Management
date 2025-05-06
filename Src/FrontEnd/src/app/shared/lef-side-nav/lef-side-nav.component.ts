import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../../features/Dashboard/dashboard/dashboard.component';
import { ProfileService, UserProfile } from '../../services/profile-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lef-side-nav',
  templateUrl: './lef-side-nav.component.html',
  styleUrls: ['./lef-side-nav.component.css'],
  standalone: true,
  imports: [RouterLink, HeaderComponent,CommonModule],
})
export class LefSideNavComponent {
  user: UserProfile = {
    image: '',
    name: '',
    designationName: ''
  };
  imageSrc: string | null = null;

  // Reference to the DOM elements
  @ViewChild('profileMenu') profileMenu: ElementRef | undefined;
  @ViewChild('mastersMenu') mastersMenu: ElementRef | undefined;
  @ViewChild('hrMenu') hrMenu: ElementRef | undefined;

  constructor(private renderer: Renderer2,private profileService: ProfileService) {}

ngOnInit(): void {
  const code = localStorage.getItem('userName');  // Changed empId to code

  if (code) {
    this.profileService.getUserProfile(code).subscribe(profile => {
      this.user = profile;

      if (profile.image) {
        this.imageSrc = `data:image/png;base64,${profile.image}`;
      }
    });
  } else {
    console.error('No code found. User might not be logged in.');
  
  }
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
