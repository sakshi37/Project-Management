import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, FamilyMember } from '../Models/gmc-model';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class GmcService {
  private baseUrl = `${API_URL}/`;

  constructor(private http: HttpClient) {}

  saveEmployeeDetails(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee`, employee);
  }

  saveFamilyMemberDetails(member: FamilyMember): Observable<any> {
    return this.http.post(`${this.baseUrl}/family`, member);
  }

  getFamilyList(): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>(`${this.baseUrl}/family`);
  }
}
