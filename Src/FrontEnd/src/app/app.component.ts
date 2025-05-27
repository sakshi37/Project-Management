import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LefSideNavComponent } from './shared/lef-side-nav/lef-side-nav.component';
import { LoginComponent } from './features/login/login.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';
import { CountryComponent } from './features/Master/settings/country/country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './features/Dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    LefSideNavComponent,
    CommonModule,
    ReactiveFormsModule,
    // DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  ngOnInit(): void {
    console.log((window as any).bootstrap); // Should log Bootstrap object
  }

  // hideLayout = false;
  // isSidebarVisible: boolean = true;

  // onSidebarToggled(visible: boolean) {
  //   this.isSidebarVisible = visible;
  // }
  hideLayout = true;
  currentRoute: string = '';
  // hideLayout = false;
  isSidebarVisible = true;
  paddingTop: string = '65px';


  onSidebarToggled(newState: boolean) {
    this.isSidebarVisible = newState;
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/', '/login', '/otp'];
        this.hideLayout = hiddenRoutes.includes(event.urlAfterRedirects);
  
        if (this.hideLayout) {
          this.isSidebarVisible = false;
        }
        this.paddingTop = this.hideLayout ? '0px' : '65px';

      });
  }  
}
