import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnouncementService, Announcement } from '../../services/announcement.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

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

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.startConnection();

    this.subscription = this.announcementService.announcements$.subscribe(data => {
      this.announcements = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
