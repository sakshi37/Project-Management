import { Component } from '@angular/core';
import { AdminService, role } from '../../../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-role',
  imports: [CommonModule],
  templateUrl: './employee-role.component.html',
  styleUrl: './employee-role.component.css',
})
export class EmployeeRoleComponent {
  roles: role[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.adminService.getEmployee().subscribe((res) => {
      console.log('res', res);
      this.roles = res;
    });
  }
}
