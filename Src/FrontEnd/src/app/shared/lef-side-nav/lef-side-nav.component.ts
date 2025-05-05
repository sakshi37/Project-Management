import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../../features/Dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-lef-side-nav',
  templateUrl: './lef-side-nav.component.html',
  styleUrls: ['./lef-side-nav.component.css'],
  standalone: true,
  imports: [RouterLink, HeaderComponent],
})
export class LefSideNavComponent {
  user = {
    name: 'Vaishnavi',
    department: 'HR',
    profileImage:
      'https://img.icons8.com/?size=100&id=52883&format=png&color=FFFFFF',
  };

  // Reference to the DOM elements
  @ViewChild('profileMenu') profileMenu: ElementRef | undefined;
  @ViewChild('mastersMenu') mastersMenu: ElementRef | undefined;
  @ViewChild('hrMenu') hrMenu: ElementRef | undefined;

  constructor(private renderer: Renderer2) {}

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
