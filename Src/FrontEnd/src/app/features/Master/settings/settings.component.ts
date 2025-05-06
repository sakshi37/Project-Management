import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CommonModule } from '@angular/common';
import { SubcategoryTabsComponent } from '../../../shared/subcategory-tabs/subcategory-tabs.component';
import { StateComponent } from './state/state-component.component';
import { CityComponent } from './city/city.component';
import { DesignationComponent } from './designation/designation.component';
import { BranchComponent } from './branch/branch.component';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    CountryComponent,
    CommonModule,
    SubcategoryTabsComponent,
    StateComponent,
    CityComponent,
    DesignationComponent,
    BranchComponent
    
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  activeTab = 'Country';

  onTabChanged(tab: string) {
    this.activeTab = tab;
  }
}
