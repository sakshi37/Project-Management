import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private announcementService: AnnouncementService) {}

  logout() {
    // Clear session or token
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
     this.announcementService.clear();
  }
  @Output() sidebarToggle = new EventEmitter<void>();
  sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarToggle.emit(); // Notify parent to toggle sidebar visibility
  }
}
