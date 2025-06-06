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
import { ActivityTimesheetComponent } from './features/Dashboard/activity-timesheet/activity-timesheet.component';
import { AttendanceComponent } from './features/Master/attendance/attendance/attendance.component';
import { EmployeeAttendanceReportComponent } from './features/Hr/employee-attendance-report/employee-attendance-report.component';
import { DailyReportComponent } from './features/Hr/daily-report/daily-report.component';
import { AdminComponent } from './features/admin/admin.component';
import { NotificationComponent } from './features/notification/notification.component';
import { AssignedTaskComponent } from './features/Master/assigned-task/assigned-task.component';
import { WorkTimesheetComponent } from './features/Master/work-timesheet/work-timesheet.component';
import { AnnouncementComponent } from './features/announcement/announcement.component';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'sidebar', component: LefSideNavComponent, canActivate: [AuthGuard] },
  {
    path: 'team-composition',
    component: TeamCompositionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR'] },
  },
  { path: 'announcements', component: AnnouncementComponent },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR', 'Admin'] },
  },
  {
    path: 'country',
    component: CountryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['HR', 'Admin'] },
  },
  {
    path: 'state',
    component: StateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['HR', 'Admin'] },
  },
  {
    path: 'holiday',
    component: HolidayComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['User', 'HR','Admin'] },
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'gmc', component: GmcComponent /*canActivate: [AuthGuard] */ },

  {
    path: 'timesheetupdate',
    component: TimesheetUpdateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR', 'Admin'] },
  },
  {
    path: 'team-compositions',
    component: TeamCompositionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR'] },
  },

  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR'] },
  },
  {
    path: 'employee-registration',
    component: EmployeeRegistrationComponent,
    // canActivate: [AuthGuard],
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR'] },
  },
  {
    path: 'update-employee',
    component: UpdateEmployeeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR'] },
  },

  { path: 'activity-timesheet', component: ActivityTimesheetComponent },
  { path: 'attendance', component: AttendanceComponent },

  { path: 'work-timesheet', component: WorkTimesheetComponent },
  { path: 'assigned-timesheet', component: AssignedTaskComponent },

  {
    path: 'dailyreport',
    component: DailyReportComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR', 'Admin'] },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'employee-attendance-report',
    component: EmployeeAttendanceReportComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HR', 'Admin'] },
  },
  { path: 'otp', component: OtpComponent },
  { path: 'sidebar', component: LefSideNavComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent },
  { path: '**', redirectTo: '' },
];
