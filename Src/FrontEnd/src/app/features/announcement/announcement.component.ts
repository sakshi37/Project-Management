import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnouncementService, Announcement } from '../../services/announcement.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-announcement',
  imports: [RouterLink, CommonModule, RouterModule, TableModule],
  standalone: true,
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
