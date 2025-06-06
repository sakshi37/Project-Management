import { Component,OnInit,OnDestroy} from '@angular/core';
import { AnnouncementService , Announcement } from '../../services/announcement.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement',
  imports: [RouterLink,CommonModule,RouterModule],
  standalone: true,
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
  private subscription!: Subscription;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    // Start SignalR connection
    this.announcementService.startConnection();

    // Subscribe to new announcements
    this.subscription = this.announcementService.announcements$.subscribe(ann => {
      // Add new announcement to the beginning (or end) of the array
      this.announcements.unshift(ann);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
