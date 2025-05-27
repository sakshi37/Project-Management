import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { Branch } from '../../../../Models/branch-model';
import { BranchService } from '../../../../services/branch-service';
import { GetCityDto } from '../city/Models/get-city.dto';
import { CityService } from '../../../../services/city.service';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branchForm!: FormGroup;
  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  cities: GetCityDto[] = [];
  filteredBranchs: any[] = [];

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  selectedSortColumn = '';
   sortDirectionAsc = true;
  currentPage = 1;
  searchText = '';
  isEditMode = false;
  editBranchId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private cityService: CityService  // Inject CityService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCities();
    this.loadBranches();
  }

  initializeForm(): void {
    this.branchForm = this.fb.group({
      fk_CityId: ['', Validators.required],
      branchName: ['', Validators.required]
    });
  }

  loadCities(): void {
    this.cityService.getAllCities().subscribe({
      next: (res) => this.cities = res,
      error: (err) => console.error('Error loading cities', err)
    });
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (res) => {
        this.branches = res;
        this.filteredBranches = [...this.branches];
      },
      error: (err) => console.error('Error loading branches', err)
    });
  }

  filterBranches(): void {
    const term = this.searchText.toLowerCase();
    this.filteredBranches = this.branches.filter(b =>
      b.branchName.toLowerCase().includes(term) ||
      b.cityName.toLowerCase().includes(term) ||
      b.stateName.toLowerCase().includes(term)
    );
  }

  onSubmit(): void {
    if (this.branchForm.invalid) return;

    const payload = {
      cityId: this.branchForm.value.fk_CityId,
      branchName: this.branchForm.value.branchName,
      createdBy: 1
    };

    if (this.isEditMode && this.editBranchId !== null) {
      // Call the update method in your branch service
      this.branchService.updateBranch(this.editBranchId, payload).subscribe({
        next: (updatedBranch) => {
          const index = this.branches.findIndex(b => b.branchId === this.editBranchId);
          if (index !== -1) {
            this.branches[index] = updatedBranch;
            this.filteredBranches = [...this.branches];
          }
          this.resetForm();
        },
        error: (err) => console.error('Error updating branch', err)
      });
    } else {
      this.branchService.addBranch(payload).subscribe({
        next: (newBranch) => {
          this.branches.push(newBranch);
          this.filteredBranches = [...this.branches];
          this.resetForm();
        },
        error: (err) => console.error('Error adding branch', err)
      });
    }
  }

  openAddBranchModal(): void {
    this.resetForm();
  }

  onEditBranch(branch: Branch): void {
    this.isEditMode = true;
    this.editBranchId = branch.branchId;

    this.branchForm.patchValue({
      fk_CityId: branch.cityId,
      branchName: branch.branchName
    });
  }

  resetForm(): void {
    this.branchForm.reset();
    this.isEditMode = false;
    this.editBranchId = null;
  }



    sortBranch(column: string): void {
    if (this.selectedSortColumn === column) {
      this.sortDirectionAsc = !this.sortDirectionAsc;
    } else {
      this.selectedSortColumn = column;
      this.sortDirectionAsc = true;
    }

    this.filteredBranchs.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handle null/undefined
      if (valueA == null || valueB == null) return 0;

      // Check if both values are numeric
      const isNumeric = !isNaN(valueA) && !isNaN(valueB);

      if (isNumeric) {
        const numA = Number(valueA);
        const numB = Number(valueB);
        return this.sortDirectionAsc ? numA - numB : numB - numA;
      } else {
        const strA = valueA.toString().toLowerCase();
        const strB = valueB.toString().toLowerCase();
        return this.sortDirectionAsc
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
    });
  }

  getSortIcon(column: string): string {
        if (this.selectedSortColumn !== column) return 'fa-sort';
        return this.sortDirectionAsc ? 'fa-sort-u ' : 'fa-sort-down';
      
      }
}


