import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RejectRequestComponent } from './reject-request/reject-request.component';
import { MatDialog } from '@angular/material/dialog';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule, MatIconModule, MatButtonModule ,NgxPaginationModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activationRequests: any[] = [];
  filteredRequests: any[] = [];
  pagedRequests: any[] = [];
  request:any[]=[];

  searchTerm = '';
  isLoading = true;
    Math = Math;
    pageSize: number = 5; // current items per page
itemsPerPageOptions: number[] = [5,10,15,20];
currentPage: number = 1;

  totalPagesArray: number[] = [];

  constructor(private adminService: AdminService,
   
    private dialog: MatDialog,
    // private Router: Router

  ) {}

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
   
  }



  changePage(page: number) {
  if (page < 1) return;
  this.currentPage = page;
}




 openRejectRequestPopup(request: any): void {
  console.log('Opening RejectRequestComponent with request:', request);

  this.dialog
    .open(RejectRequestComponent, {
      width: '600px',
      data: {
        requestId: request.requestId,
        name: request.employeeName
      }
    })
    .afterClosed()
    .subscribe((result) => {
      console.log('Reject dialog closed with result:', result); 
      if (result) {
        this.loadRequests(); 
      }
    });
}


    openApproveRequestPopup(request:any):void{
      this.dialog
      .open(ApproveRequestComponent,{
        width:'1000px',
        data:{
          requestId:request.requestId,
          name:request.employeeName
        }
      })
      .afterClosed()
    .subscribe((result) => {
      console.log('Approve dialog closed with result:', result); 
      if (result) {
        this.loadRequests(); 
      }
    });
    }

  }

 
