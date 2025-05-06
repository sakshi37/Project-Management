import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../Models/branch-model';
import { API_URL } from '../../constant';
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

  addBranch(branchData: any): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, branchData);
  }
  updateBranch(id: number, payload: any): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/branches/${id}`, payload);
  }

  // Add update/delete methods if needed later
}
