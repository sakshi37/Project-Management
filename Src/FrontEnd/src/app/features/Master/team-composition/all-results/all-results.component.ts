import { Component, Input } from '@angular/core';
import { GetTeamCompositionDto } from '../Models/get-team-composition.dto';
import { TeamCompositionService } from '../../../../services/team-composition.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-results',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './all-results.component.html',
  styleUrl: './all-results.component.css'
})
export class AllResultsComponent {
  @Input() teamCompositions: GetTeamCompositionDto[] = [];
}
