import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamCompositionService } from '../../../../services/team-composition.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { BranchService } from '../../../../services/branch-service';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Input() loadTeamCompositions!: () => void;
  teamForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  successMessage = '';
  private modal!: bootstrap.Modal;
  branches: any[] = [];
  
  ngOnInit(): void {
    this.initForm();
    this.loadBranches();
  }

  constructor(private fb: FormBuilder, private teamService: TeamCompositionService,private branchService: BranchService,
  ) {
  }
  openAddModal(): void {
    this.isEditMode = false;
    this.modal.show();
  }

  initForm() {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      fk_BranchId: [null, Validators.required],
      fk_DivisionId: [null, Validators.required],
      fk_TeamLeaderId: [null, Validators.required],
      createdBy: [1] // You can get this from auth or session later
    });
  }
  loadBranches(): void {
    this.branchService.getBranches().subscribe(res => {
      this.branches = res;
      console.log(this.branches);
      
      this.filterBranches();
    });
  }
  filterBranches(): void {
    const branchId = +this.teamForm.get('branchId')?.value;
  }
  onBranchChange(): void {
    this.filterBranches();
    this.teamForm.patchValue({ branchId: '' });
  }

  onSubmit() {
    this.submitted = true;

    if (this.teamForm.invalid) {
      return;
    }

    this.teamService.createTeam(this.teamForm.value).subscribe({
      next: () => {
        this.successMessage = 'Team created successfully!';
        this.teamForm.reset();
        this.submitted = false;
        this.loadTeamCompositions();
      },
      error: (err) => {
        console.error('Error creating team', err);
      }

    });
  }
}
