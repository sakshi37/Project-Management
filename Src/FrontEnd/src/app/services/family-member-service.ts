import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { FamilyMember } from '../Models/family-member-dto';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiUrl = `${API_URL}/Gmc`;

  constructor(private http: HttpClient) {}

  addFamilyMember(member: FamilyMember): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, member);
  }
}
