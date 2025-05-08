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
    'Designation',
    'Drawing Property',
    'Project Complexity',
    'Project Type',
    'Shift Type',
    'Bde Prefix Mapping',
    'Owner Prefix Mapping',
    'Nature Of Drawing',
    'Mode Of Transmittal',
    'Transmittal Type',
    'Non Production Activity',
    'Break Hours Activity',
    'Progress Entry Date Range',
    'Currency',
    'Slab Price'
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
