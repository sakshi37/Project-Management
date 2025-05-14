import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamCompositionService } from '../../../services/team-composition.service';
import { BranchService } from '../../../services/branch-service';
import { GetTeamCompositionDto } from './Models/get-team-composition.dto';
import * as bootstrap from 'bootstrap';
import { DivisionService } from '../../../services/division.service';

@Component({
  selector: 'app-team-composition',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './team-composition.component.html',
  styleUrl: './team-composition.component.css'
})
export class TeamCompositionComponent {
  teamCompositions: GetTeamCompositionDto[] = [];
  teamForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  successMessage = '';
  private modal!: bootstrap.Modal;

  branches: any[] = [];
  divisions: any[] = [];
  teamLeaders: any[] = [];


  selectedBranchId: number | null = null;
  selectedDivisionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamCompositionService,
    private branchService: BranchService,
    private divisionService: DivisionService 

  ) {}

  ngOnInit(): void {
    this.fetchTeamCompositions();
    this.initForm();
    this.loadBranches();
    this.loadDivisions();
    this.fetchTeamLeaders();
    this.loadTeamCompositions();

    const modalElement = document.getElementById('teamModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  initForm() {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      fk_BranchId: [null, Validators.required],
      fk_DivisionId: [null, Validators.required],
      fk_TeamLeaderId: [null, Validators.required],
      createdBy: ['1'],
    });
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (res) => this.branches = res,
      error: (err) => console.error('Error loading branches', err)
    });
  }

  loadDivisions(): void {
    this.divisionService.getAllDivisions().subscribe({
      next: (res) => this.divisions = res,
      error: (err) => console.error('Error loading divisions', err)
    });
  }
  fetchTeamLeaders(): void {
    this.teamService.getTeamLeaders().subscribe({
      next: (data) => this.teamLeaders = data,
      error: (err) => console.error('Error fetching team leaders', err)
    });
  }
  // onBranchChange(branchId: string): void {
  //   this.selectedBranchId = branchId ? +branchId : null;
  //   this.fetchTeamCompositions();
  // }

  // onDivisionChange(divisionId: string): void {
  //   this.selectedDivisionId = divisionId ? +divisionId : null;
  //   this.fetchTeamCompositions();
  // }
  // onBranchChange(branchId: string) {
  //   this.selectedBranchId = Number(branchId);
  //   this.fetchTeamCompositions(); 
  // }
  
  // onDivisionChange(divisionId: string) {
  //   this.selectedDivisionId = Number(divisionId);
  //   this.fetchTeamCompositions(); 
  // }
  // onBranchChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const id = Number(target.value);
  //   this.selectedBranchId = id;
  //   this.fetchTeamCompositions(); 
  // }
  
  // onDivisionChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const id = Number(target.value);
  //   this.selectedDivisionId = id;
  //   this.fetchTeamCompositions();  
  // }
  onBranchChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedBranchId = value ? Number(value) : null;
    this.fetchTeamCompositions(); 
  }
  
  onDivisionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedDivisionId = value ? Number(value) : null;
    this.fetchTeamCompositions();  
  }
  
  
  
  fetchTeamCompositions(): void {
    this.teamService
      .getAllTeamCompositions(
        this.selectedBranchId || undefined,
        this.selectedDivisionId || undefined
      )
      .subscribe({
        next: (data) => this.teamCompositions = data,
        error: (err) => console.error('Error fetching filtered teams', err)
      });
  }
  

  openAddModal(): void {
    this.isEditMode = false;
    this.teamForm.reset();
    this.modal.show();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.teamForm.invalid) return;
    console.log('Form Value:', this.teamForm.value);
    this.teamForm.value.createdBy = 1;
    
    this.teamService.createTeam(this.teamForm.value).subscribe({
      next: () => {
        this.successMessage = 'Team created successfully!';
        this.teamForm.reset();
        this.submitted = false;
  
        this.fetchTeamCompositions();
      },
      error: (err) => {
        console.error('Error creating team', err);
      }
    });
  }

  loadTeamCompositions(): void {
    this.teamService.getAllTeamCompositions().subscribe({
      next: (data) => this.teamCompositions = data,
      error: (err) => console.error('Error loading teams', err)
    });
  }
}
