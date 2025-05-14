import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GetTeamCompositionDto } from './Models/get-team-composition.dto';
import { TeamCompositionService } from '../../../services/team-composition.service';
import { CommonModule } from '@angular/common';
import { AllResultsComponent } from './all-results/all-results.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  selector: 'app-team-composition',
  imports: [RouterLink,FormsModule,CommonModule,AllResultsComponent,TopBarComponent],
  templateUrl: './team-composition.component.html',
  styleUrl: './team-composition.component.css'
})
export class TeamCompositionComponent {
  teamCompositions: GetTeamCompositionDto[] = [];

  constructor(private teamService: TeamCompositionService) { }

  ngOnInit(): void {
    this.loadTeamCompositions();
  }
  
  loadTeamCompositions(): void {
    this.teamService.getAllTeamCompositions(undefined,undefined).subscribe({
      next: (data) => this.teamCompositions = data,
      error: (err) => console.error('Error loading teams', err)
    });
  }
}
