import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTeamCompositionDto } from '../features/Master/team-composition/Models/get-team-composition.dto';
import { CreateTeamCompositionDto } from '../features/Master/team-composition/Models/create-team-composition.dto';
import { UpdateTeamCompositionDto } from '../features/Master/team-composition/Models/update-team-composition.dto';

@Injectable({
  providedIn: 'root'
})
export class TeamCompositionService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7292/api/TeamComposition';

  // getAllTeamCompositions(): Observable<GetTeamCompositionDto[]> {
  //   return this.http.get<GetTeamCompositionDto[]>(`${this.baseUrl}/GetAllTeamCompositions`);
  // }
  // getAllTeamCompositions(branchId?: number, divisionId?: number): Observable<any[]> {
  //   const params = divisionId ? `&divisionId=${divisionId}` : '';
  //   return this.http.get<any[]>(`${this.baseUrl}/teamcomposition?branchId=${branchId}${params}`);
  // }
  getAllTeamCompositions(branchId?: number, divisionId?: number): Observable<any[]> {
    let params = new HttpParams();
    
    // Add the branchId if it's provided
    if (branchId) {
      params = params.append('branchId', branchId.toString());
    }
    
    // Add the divisionId if it's provided
    if (divisionId) {
      params = params.append('divisionId', divisionId.toString());
    }
    
    // Make the GET request with the dynamically constructed params
    return this.http.get<any[]>(`${this.baseUrl}`, { params });
  }
  getTeamLeaders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/team-leaders`);
  }
  
  createTeam(team: CreateTeamCompositionDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, team);
  }
  updateTeam(team: UpdateTeamCompositionDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, team);
  }
  
}
