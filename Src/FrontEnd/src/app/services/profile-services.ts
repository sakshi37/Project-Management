import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant';

export interface UserProfile {
  image: string | null;
  name: string;
  designationName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   private apiUrl = `${API_URL}/Employee`;
  

  constructor(private http: HttpClient) {}

  getUserProfile(code: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/ProfileDetalis/${code}`);
  }
}
