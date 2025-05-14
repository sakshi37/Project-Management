import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { FamilyMember } from '../Models/family-member-dto';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiUrl = 'https://localhost:7292/api/Gmc';

  constructor(private http: HttpClient) {}

  addFamilyMember(member: FamilyMember): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, member);
  }
}
