import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  image: string | null;
  name: string;
  designationName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7292/api/Employee/ProfileDetalis';

  constructor(private http: HttpClient) {}

  getUserProfile(code: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${code}`);
  }
}
