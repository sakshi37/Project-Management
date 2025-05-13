import { Component } from '@angular/core';
import { DashboardInfoService } from '../../../services/dashboard-info.service';
import { EmployeeInfoService } from '../../../services/employee-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-info',
  imports: [CommonModule],
  templateUrl: './dashboard-info.component.html',
  styleUrl: './dashboard-info.component.css'
})

export class DashboardInfoComponent {
loginTime: Date | null = null;
totalEmployees: number = 0;

constructor(
  private loginActivityService: DashboardInfoService,
  private employeeService: EmployeeInfoService
) {}

ngOnInit(): void {
  const checkInTime = localStorage.getItem('userCheckInTime');
  this.loginTime = checkInTime ? new Date(checkInTime) : null;
  
  
  this.fetchTotalEmployees();

}


fetchTotalEmployees(): void {
  this.employeeService.getTotalEmployees().subscribe({
    next: (res) => {
      this.totalEmployees = res; 
    }
  });
}

}
