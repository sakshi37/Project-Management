import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LefSideNavComponent } from '../../../shared/lef-side-nav/lef-side-nav.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DashboardInfoComponent } from '../dashboard-info/dashboard-info.component';
import { ActivityTimesheetComponent } from '../activity-timesheet/activity-timesheet.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    LefSideNavComponent,
    HeaderComponent,
    DashboardInfoComponent,
    ActivityTimesheetComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  products: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  // * api call to get the list
  getProductList() {}
}
