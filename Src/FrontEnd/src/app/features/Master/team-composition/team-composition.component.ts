import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { TeamCompositionService } from '../../../services/team-composition.service';
import { BranchService } from '../../../services/branch-service';
import { GetTeamCompositionDto } from './Models/get-team-composition.dto';
import * as bootstrap from 'bootstrap';
import { DivisionService } from '../../../services/division.service';
import FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { CreateTeamCompositionDto } from './Models/create-team-composition.dto';
import { UpdateTeamCompositionDto } from './Models/update-team-composition.dto';

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
  selectedTeamId: number | null = null;


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
      fk_BranchId: ['', Validators.required],
      fk_DivisionId: ['', Validators.required],
      fk_TeamLeaderId: ['', Validators.required],
      teamStatus: ['1', Validators.required]
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
  

  // exportToExcel(): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.teamCompositions);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'TeamComposition': worksheet }, SheetNames: ['TeamComposition'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'TeamCompositionData');
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  // }
  
  exportToExcel(): void {
    const exportData = this.teamCompositions.map((t, index) => ({
      'Sr No': index + 1,
      'Team Name': t.teamName,
      'Team Leader': t.teamLeaderName,
      'Branch': t.branchName,
      'Division': t.divisionName,
      'Status': t.teamStatus ? 'Active' : 'Inactive',
    }));
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  
    // Step 3: Apply gray fill for Inactive rows
    this.teamCompositions.forEach((t, index) => {
      if (!t.teamStatus) {
        const excelRow = index + 2; 
        const colRange = ['A', 'B', 'C', 'D', 'E', 'F']; 
  
        colRange.forEach(col => {
          const cellRef = `${col}${excelRow}`;
          if (!worksheet[cellRef]) return;
          worksheet[cellRef].s = {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "D3D3D3" } 
            }
          };
        });
      }
    });
  
    const workbook: XLSX.WorkBook = {
      Sheets: { 'TeamComposition': worksheet },
      SheetNames: ['TeamComposition']
    };
  
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true
    });
  
    this.saveAsExcelFile(excelBuffer, 'TeamCompositionData');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }
    

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
    this.modal.show();
    // this.teamForm.reset({
    //   teamName: '',
    //   fk_BranchId: null,
    //   fk_DivisionId: null,
    //   fk_TeamLeaderId: null,
    //   teamStatus: '1'  
    // });
  }
onEdit(team: GetTeamCompositionDto ): void {
    this.teamForm.patchValue({
      teamName: team.teamName,
      fk_BranchId: team.fk_BranchId,
      fk_DivisionId: team.fk_DivisionId,
      fk_TeamLeaderId: team.fk_TeamLeaderId,
      teamStatus: team.teamStatus ? '1' : '0',
    });
    this.selectedTeamId = team.teamId;
    this.isEditMode = true;
    // this.teamModal?.show();
  }
  // onSubmit(): void {
  //   this.submitted = true;

  //   if (this.teamForm.invalid) return;
  //   console.log('Form Value:', this.teamForm.value);

  //   this.teamForm.value.createdBy = 1;
    
  //   this.teamService.createTeam(this.teamForm.value).subscribe({
  //     next: () => {
  //       this.successMessage = 'Team created successfully!';
  //       this.teamForm.reset();
  //       this.submitted = false;
  
  //       this.fetchTeamCompositions();
  //     },
  //     error: (err) => {
  //       console.error('Error creating team', err);
  //     }
  //   });
  // }
  resetForm(): void {
    this.teamForm.reset();
    this.submitted = false;
    this.selectedTeamId = null;
    this.isEditMode = false;
    this.modal.hide();
  }
  onSubmit(): void {
    console.log(this.teamForm.value);
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#d33'
      });
      return;
    }
  
    const statusBool = this.teamForm.value.teamStatus === '1' ? true : false;  
    const updatePayload = {
      teamId: this.selectedTeamId,
      teamName: this.teamForm.value.teamName,
      fk_BranchId: this.teamForm.value.fk_BranchId,
      fk_DivisionId: this.teamForm.value.fk_DivisionId,
      fk_TeamLeaderId: this.teamForm.value.fk_TeamLeaderId,
      teamStatus: statusBool,
    };
  
    const createPayload = {
      teamName: this.teamForm.value.teamName,
      fk_BranchId: this.teamForm.value.fk_BranchId,
      fk_DivisionId: this.teamForm.value.fk_DivisionId,
      fk_TeamLeaderId: this.teamForm.value.fk_TeamLeaderId,
    };
  
    if (this.isEditMode && this.selectedTeamId !== null) {
      const updateDto: UpdateTeamCompositionDto = {
                  ...updatePayload,
                  updatedBy: 1
                };
      this.teamService.updateTeam(updateDto).subscribe({
        next: () => {
          this.loadTeamCompositions();
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Team updated successfully!',
            confirmButtonColor: '#3085d6'
          });
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      const createDto: CreateTeamCompositionDto = {
                  ...createPayload,
                  createdBy: 1
                };
      this.teamService.createTeam(createDto).subscribe({
        next: () => {
          this.loadTeamCompositions();
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Created',
            text: 'Team created successfully!',
            confirmButtonColor: '#3085d6'
          });
        },
        error: (err) => console.error('Creation failed', err)
      });
    }
  }
  
  loadTeamCompositions(): void {
    this.teamService.getAllTeamCompositions().subscribe({
      next: (data) => this.teamCompositions = data,
      error: (err) => console.error('Error loading teams', err)
    });
  }
}
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
