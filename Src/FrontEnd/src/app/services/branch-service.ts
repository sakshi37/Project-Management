import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../constant';
import { Branch } from '../Models/branch-model';
// adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class BranchService {
 
  private apiUrl = `${API_URL}/Branch`;

  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  addBranch(payload: any): Observable<Branch> {
    return this.http.post<Branch>(`${this.apiUrl}`, payload);
  }
  updateBranch(branchId: number, payload: any): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/${branchId}`, payload);
  }

  // Add update/delete methods if needed later
}
