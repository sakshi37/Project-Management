import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnouncementService, Announcement } from '../../services/announcement.service';
import { Subscription, timer, forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-announcement',
  imports: [RouterLink, CommonModule, RouterModule, TableModule, FormsModule],
  standalone: true,
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  adminannouncements: Announcement[] = [];
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  filteredAdminAnnouncements: Announcement[] = []; // Add this for admin filtering
  searchTerm: string = '';
  adminSearchTerm: string = '';
  private pollingSubscription!: Subscription;
  userRole!: string | null;

  constructor(
    private announcementService: AnnouncementService,
    private roleService: RoleService,
    private errorHandler: ErrorHandler,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.roleService.getUserRole();
    this.userGroup = this.roleService.getUserRole();
    this.employeeCode = this.roleService.getEmpCode();
    this.startPolling();
  }
  
  activeFilter: 'all' | 'userGroup' | 'employee' = 'all';
  adminActiveFilter: 'all' | 'userGroup' | 'employee' = 'all'; // Add separate filter for admin

  employeeCode!: string | null;
  userGroup!: string | null;

  setFilter(filter: 'all' | 'userGroup' | 'employee'): void {
    this.activeFilter = filter;
    this.filterAnnouncements();
  }

  // Add separate method for admin filter
  setAdminFilter(filter: 'all' | 'userGroup' | 'employee'): void {
    this.adminActiveFilter = filter;
    this.filterAdminAnnouncements();
  }

  // Add search methods
  onSearchChange(): void {
    this.filterAnnouncements();
  }

  onAdminSearchChange(): void {
    this.filterAdminAnnouncements();
  }

  filterAnnouncements(): void {
    let filtered: Announcement[] = [];
    
    // First apply filter by type
    if (this.activeFilter === 'all') {
      filtered = [...this.announcements];
    } else if (this.activeFilter === 'userGroup') {
      // Show all announcements targeted to UserGroups
      filtered = this.announcements.filter(a =>
        a.targetType === 'UserGroup'
      );
    } else if (this.activeFilter === 'employee') {
      // Show all announcements targeted to Employees
      filtered = this.announcements.filter(a =>
        a.targetType === 'Employee'
      );
    }

    // Then apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(a =>
        a.title?.toLowerCase().includes(searchLower) ||
        a.message?.toLowerCase().includes(searchLower) ||
        a.targetType?.toLowerCase().includes(searchLower) ||
        a.targetValue?.toLowerCase().includes(searchLower)
      );
    }

    this.filteredAnnouncements = filtered;
  }


  // Add filtering method for admin announcements
  filterAdminAnnouncements(): void {
    let filtered: Announcement[] = [];
    
    // First apply filter by type
    if (this.adminActiveFilter === 'all') {
      filtered = [...this.adminannouncements];
    } else if (this.adminActiveFilter === 'userGroup') {
      // Show all announcements targeted to UserGroups
      filtered = this.adminannouncements.filter(a =>
        a.targetType === 'UserGroup'
      );
    } else if (this.adminActiveFilter === 'employee') {
      // Show all announcements targeted to Employees
      filtered = this.adminannouncements.filter(a =>
        a.targetType === 'Employee'
      );
    }

    // Then apply search filter
    if (this.adminSearchTerm.trim()) {
      const searchLower = this.adminSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(a =>
        a.title?.toLowerCase().includes(searchLower) ||
        a.message?.toLowerCase().includes(searchLower) ||
        a.targetType?.toLowerCase().includes(searchLower) ||
        a.targetValue?.toLowerCase().includes(searchLower)
      );
    }

    this.filteredAdminAnnouncements = filtered;
  }

  // Helper methods for display names
  getFilterDisplayName(): string {
    switch (this.activeFilter) {
      case 'all': return 'All';
      case 'userGroup': return 'UserGroup wise';
      case 'employee': return 'For You';
      default: return '';
    }
  }

  getAdminFilterDisplayName(): string {
    switch (this.adminActiveFilter) {
      case 'all': return 'All';
      case 'userGroup': return 'UserGroup wise';
      case 'employee': return 'For You';
      default: return '';
    }
  }
// announcement-list.component.ts
editAnnouncement(announcement: Announcement) {
  this.announcementService.setEditAnnouncement(announcement);
    this.router.navigate(['/announcement-form']);

}
createAnnouncement(): void {
  this.announcementService.clearEditAnnouncement();
  this.router.navigate(['/announcement-form']);
}
// editAnnouncement(announcement: Announcement) {
//   this.announcementService.editAnnouncement$.next(announcement);
//   this.router.navigate(['/announcement-form']);
// }
  startPolling(): void {
    const employeeCode = this.roleService.getEmpCode();
    const userGroup = this.roleService.getUserRole();

    this.pollingSubscription = timer(0, 60000) // Start immediately, then every 60 seconds
      .pipe(
        switchMap(() => {
          const requests = [];

          if (employeeCode && userGroup) {
            requests.push(
              this.announcementService.getAnnouncements(employeeCode, userGroup)
                .pipe(
                  catchError(err => {
                    console.error('Error fetching announcements:', err);
                    return of([]);
                  })
                )
            );
          }

          requests.push(
            this.announcementService.gettodayAnnouncements()
              .pipe(
                catchError(err => {
                  this.errorHandler.handleError(err);
                  return of([]);
                })
              )
          );

          return forkJoin(requests);
        })
      )
      .subscribe(([announcements, adminAnnouncements]) => {
        this.announcements = announcements || [];
        this.adminannouncements = adminAnnouncements || [];
        this.filterAnnouncements();
        this.filterAdminAnnouncements(); // Add this line
      });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}