import { Component } from '@angular/core';
import { DashboardInfoService } from '../../../services/dashboard-info.service';
import { EmployeeInfoService } from '../../../services/employee-info.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { GetHolidayDto } from '../../Master/holiday/Models/get-holiday.dto';
import { HolidayService } from '../../../services/holiday.service';
import { RoleService } from '../../../services/role.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-info',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-info.component.html',
  styleUrl: './dashboard-info.component.css'
})

export class DashboardInfoComponent {
loginTime: Date | null = null;
totalEmployees: number = 0;
upcomingHoliday: GetHolidayDto | null = null;
imageBaseUrl = 'http://127.0.0.1:8080/'; 
userRole:string | null = null; 


constructor(
  private loginActivityService: DashboardInfoService,
  private employeeService: EmployeeInfoService,
  private holidayService: HolidayService,
  private roleService: RoleService
  
) {}

ngOnInit(): void {
  const decodedToken = jwtDecode(String(localStorage.getItem('token')));
  const checkInTime = decodedToken.jti;
  console.log(decodedToken.jti);
  
  this.loginTime = checkInTime ? new Date(checkInTime) : null;
  console.log(this.loginTime);
  this.holidayService.getAllHolidays().subscribe({
    next: (holidays) => {
      const today = new Date();
      const futureHolidays = holidays
        .filter(h => new Date(h.holidayDate) >= today && h.holidayStatus)
        .sort((a, b) => new Date(a.holidayDate).getTime() - new Date(b.holidayDate).getTime());

      this.upcomingHoliday = futureHolidays.length > 0 ? futureHolidays[0] : null;
    },
    error: (err) => console.error('Error loading holidays:', err)
  });
  this.userRole = this.roleService.getUserRole();

  
  this.fetchTotalEmployees();

}
getFullImagePath(imagePath: string): string {
  return this.imageBaseUrl + imagePath;
}

fetchTotalEmployees(): void {
  this.employeeService.getTotalEmployees().subscribe({
    next: (res) => {
      this.totalEmployees = res; 
    }
  });
}

}
