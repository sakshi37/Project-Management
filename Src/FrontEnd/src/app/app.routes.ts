 import { Routes } from '@angular/router';
import { DashboardComponent } from './features/Dashboard/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { OtpComponent } from './features/otp/otp.component';
import { SettingsComponent } from './features/Master/settings/settings.component';
import { ChangePasswordComponent } from './features/Profile/change-password/change-password.component';
import { LefSideNavComponent } from './shared/lef-side-nav/lef-side-nav.component';
import { GmcComponent } from './features/Master/gmc/gmc.component';


import { TimesheetUpdateComponent } from './features/Hr/timesheet-update/timesheet-update.component';

import { EmployeeComponent } from './features/Master/employee/employee.component';
import { EmployeeRegistrationComponent } from './features/Master/employee/employee-registration/employee-registration.component';

import { CountryComponent } from './features/Master/settings/country/country.component';
import { StateComponent } from './features/Master/settings/state/state-component.component';
import { HolidayComponent } from './features/Master/holiday/holiday.component';
import { TeamCompositionComponent } from './features/Master/team-composition/team-composition.component';
import { AuthGuard } from './services/authguard';
import { RoleGuard } from './services/role.guard'; 

import { UpdateEmployeeComponent } from './features/Master/employee/update-employee/update-employee.component';
import { EmployeeAttendanceReportComponent } from './features/Hr/employee-attendance-report/employee-attendance-report.component';
import { DailyReportComponent } from './features/Hr/daily-report/daily-report.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sidebar', component: LefSideNavComponent, canActivate: [AuthGuard] },
  {
    path: 'team-composition',
    component: TeamCompositionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR','Admin'] } 
  },

  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGuard,RoleGuard],data: { roles: ['HR','Admin'] } },
  { path: 'country', component: CountryComponent,canActivate: [AuthGuard],data: { roles: ['HR','Admin'] } },
  { path: 'state', component: StateComponent,canActivate: [AuthGuard] ,data: { roles: ['HR','Admin'] }},
  { path: 'holiday', component: HolidayComponent,canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['User','HR'] } },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'gmc', component: GmcComponent, canActivate: [AuthGuard] },

  { path: 'timesheetupdate', component: TimesheetUpdateComponent,canActivate: [AuthGuard,RoleGuard],
    data: { roles: ['HR','Admin'] }
   },
  { path: 'team-compositions', component: TeamCompositionComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR'] } },

  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR','Admin'] }},
  {
    path: 'employee-registration',
    component: EmployeeRegistrationComponent,
    // canActivate: [AuthGuard],
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR','Admin'] }
  },
  {
    path: 'update-employee',
    component: UpdateEmployeeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR','Admin'] }
  },
  {path:'dailyreport',component:DailyReportComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR','Admin'] }},
  {path:'admin',component:AdminComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }},
  { path: 'employee-attendance-report', component: EmployeeAttendanceReportComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR','Admin'] }},
  { path: 'otp', component: OtpComponent },
  { path: 'sidebar', component: LefSideNavComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
