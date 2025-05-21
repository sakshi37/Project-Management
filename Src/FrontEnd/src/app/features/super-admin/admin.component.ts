import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/super-admin-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule, MatIconModule, MatButtonModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activationRequests: any[] = [];
  filteredRequests: any[] = [];
  pagedRequests: any[] = [];

  searchTerm = '';
  isLoading = true;
    Math = Math;

  // Pagination
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.adminService.getPendingRequests().subscribe((data: any[]) => {
      this.activationRequests = data;
     
      this.filterRequests();
      this.isLoading = false;
    });
  }

  filterRequests(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.activationRequests.filter(req =>
     
      req.employeeName.toLowerCase().includes(term) ||
      req.requestByName.toLowerCase().includes(term) ||
      req.reason.toLowerCase().includes(term)
    );
    this.setupPagination();
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    this.changePage(1); // Reset to first page
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedRequests = this.filteredRequests.slice(startIndex, endIndex);
  }

  approveRequest(id: number): void {
    this.adminService.approveRequest(id).subscribe(() => {
      this.loadRequests(); // Refresh after approval
    });
  }

  rejectRequest(id: number): void {
    this.adminService.rejectRequest(id).subscribe(() => {
      this.loadRequests(); // Refresh after rejection
    });
  }
}
