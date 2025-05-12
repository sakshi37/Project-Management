import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })

export class DashboardInfoService {
    getTotalEmployees() {
      throw new Error('Method not implemented.');
    }
    
    constructor(private http: HttpClient) {}

    getLoginTime(username: string): Observable<any> {
        return this.http.get(`/api/LoginActivity/get-checkin-time/${username}`);
    }
    setLoginTime(username: string): Observable<any> {
        return this.http.post(`/api/LoginActivity/set-checkin-time/${username}`, {});
    }
      
      
      
}
