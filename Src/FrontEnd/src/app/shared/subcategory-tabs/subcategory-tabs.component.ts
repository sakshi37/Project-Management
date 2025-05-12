import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CountryComponent } from '../../features/Master/settings/country/country.component';
// import more...

@Component({
  selector: 'app-subcategory-tabs',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './subcategory-tabs.component.html',
  styleUrls: ['./subcategory-tabs.component.css'],
})
export class SubcategoryTabsComponent {
  isDropdownOpen = true;

  tabs: string[] = [
    'Country',
    'State',
    'City',
    'Location',
    'Branch',
    'Division',
    'Designation'
  ];

  selectedTab: string = 'Country';

  @Output() tabChanged = new EventEmitter<string>();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.tabChanged.emit(tab);
  }
}
