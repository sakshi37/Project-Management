import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private announcementService: AnnouncementService, private injector: Injector) {}

  logout() {
    // Clear session or token
    const appRef = this.injector.get(AppComponent);
appRef.clearAnnouncementStream();
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
