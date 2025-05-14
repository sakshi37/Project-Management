import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTeamCompositionDto } from '../features/Master/team-composition/Models/get-team-composition.dto';
import { CreateTeamCompositionDto } from '../features/Master/team-composition/Models/create-team-composition.dto';

@Injectable({
  providedIn: 'root'
})
export class TeamCompositionService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7292/api/TeamComposition';

  getAllTeamCompositions(): Observable<GetTeamCompositionDto[]> {
    return this.http.get<GetTeamCompositionDto[]>(`${this.baseUrl}/GetAllTeamCompositions`);
  }
  createTeam(team: CreateTeamCompositionDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, team);
  }
}
