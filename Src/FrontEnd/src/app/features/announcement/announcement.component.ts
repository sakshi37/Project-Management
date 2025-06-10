import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnouncementService, Announcement } from '../../services/announcement.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-announcement',
  imports: [RouterLink, CommonModule, RouterModule, TableModule ,FormsModule ],
  standalone: true,
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
  filteredAnnouncements: any[] = [];
  searchTerm: string = '';
  private subscription!: Subscription;

  constructor(
    private announcementService: AnnouncementService,
    private roleService: RoleService,
  ) {}
  

  ngOnInit(): void {
    const employeeCode = this.roleService.getEmpCode();
    const userGroup = this.roleService.getUserRole();

    if (employeeCode && userGroup) {
      this.subscription = this.announcementService
        .getAnnouncements(employeeCode, userGroup)
        .subscribe({
          next: (data) => (this.announcements = data),
          error: (err) => console.error('Error fetching announcements:', err)
        });
    }

  }
  onSearch() {
    this.filterAnnouncements();
  }
  private filterAnnouncements() {
    let filtered = [...this.announcements];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(announcement => 
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.message.toLowerCase().includes(searchLower) ||
        announcement.targetType?.toLowerCase().includes(searchLower) ||
        announcement.targetValue?.toLowerCase().includes(searchLower)
      );
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
