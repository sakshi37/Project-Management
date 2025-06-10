import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnouncementService, Announcement } from '../../services/announcement.service';
import { Subscription, timer, forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { RouterLink, RouterModule } from '@angular/router';
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
  private pollingSubscription!: Subscription;
  userRole!: string | null;

  constructor(
    private announcementService: AnnouncementService,
    private roleService: RoleService,
    private errorHandler: ErrorHandler
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

  filterAnnouncements(): void {
    if (this.activeFilter === 'all') {
      this.filteredAnnouncements = [...this.announcements];
    } else if (this.activeFilter === 'userGroup') {
      // Show all announcements targeted to UserGroups
      this.filteredAnnouncements = this.announcements.filter(a =>
        a.targetType === 'UserGroup'
      );
    } else if (this.activeFilter === 'employee') {
      // Show all announcements targeted to Employees
      this.filteredAnnouncements = this.announcements.filter(a =>
        a.targetType === 'Employee'
      );
    } else {
      this.filteredAnnouncements = [];
    }
  }

  // Add filtering method for admin announcements
  filterAdminAnnouncements(): void {
    if (this.adminActiveFilter === 'all') {
      this.filteredAdminAnnouncements = [...this.adminannouncements];
    } else if (this.adminActiveFilter === 'userGroup') {
      // Show all announcements targeted to UserGroups
      this.filteredAdminAnnouncements = this.adminannouncements.filter(a =>
        a.targetType === 'UserGroup'
      );
    } else if (this.adminActiveFilter === 'employee') {
      // Show all announcements targeted to Employees
      this.filteredAdminAnnouncements = this.adminannouncements.filter(a =>
        a.targetType === 'Employee'
      );
    } else {
      this.filteredAdminAnnouncements = [];
    }
  }

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