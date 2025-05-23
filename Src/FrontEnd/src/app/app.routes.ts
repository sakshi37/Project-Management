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
import { UpdateEmployeeComponent } from './features/Master/employee/update-employee/update-employee.component';
import { ActivityTimesheetComponent } from './features/Dashboard/activity-timesheet/activity-timesheet.component';
import { AttendanceComponent } from './features/Master/attendance/attendance/attendance.component';
import { WorkTimesheetComponent } from './features/Master/work-timesheet/work-timesheet.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sidebar', component: LefSideNavComponent },
  {
    path: 'team-composition',
    component: TeamCompositionComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent /*canActivate: [AuthGuard]*/,
  },
  { path: 'country', component: CountryComponent /*canActivate: [AuthGuard]*/ },
  { path: 'state', component: StateComponent /*canActivate: [AuthGuard]*/ },
  { path: 'holiday', component: HolidayComponent /*canActivate: [AuthGuard]*/ },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
  { path: 'state', component: StateComponent, canActivate: [AuthGuard] },
  { path: 'holiday', component: HolidayComponent, canActivate: [AuthGuard] },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'gmc', component: GmcComponent /*canActivate: [AuthGuard] */ },

  {
    path: 'timesheetupdate',
    component: TimesheetUpdateComponent /*canActivate: [AuthGuard] */,
  },

  { path: 'employee', component: EmployeeComponent },
  {
    path: 'employee-registration',
    component: EmployeeRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-employee',
    component: UpdateEmployeeComponent,
  },
  { path: 'otp', component: OtpComponent },
  { path: 'activity-timesheet', component: ActivityTimesheetComponent },
  { path: 'attendance', component: AttendanceComponent },
  {
    path: 'sidebar',
    component: LefSideNavComponent /*canActivate: [AuthGuard] */,
  },
  { path: 'work-timesheet', component: WorkTimesheetComponent },
  { path: '**', redirectTo: '' },
];
