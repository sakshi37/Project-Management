import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LefSideNavComponent } from '../../../shared/lef-side-nav/lef-side-nav.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DashboardInfoComponent } from '../dashboard-info/dashboard-info.component';

@Component({
  selector: 'app-dashboard',
  imports: [LefSideNavComponent,HeaderComponent,DashboardInfoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  products: any;

  constructor(private apiService: ApiService){

  }
  
  ngOnInit(): void {
    this.getProductList();
  }

  // * api call to get the list
  getProductList(){
    this.apiService.getListOfPorducts().subscribe((res) => {
      console.log("Products List------->", res);
      this.products = res;
    });
  }

}
