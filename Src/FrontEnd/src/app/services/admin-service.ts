import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant';
import { Employee } from '../Models/gmc-model';
import { UpdateRoleModel } from '../Models/update-role-model';

export interface ActivationRequest {
  id: number;
  employeeName: string;
  requestByName: string;
  reason: string;
  action: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = `${API_URL}/Admin`;

  constructor(private http: HttpClient) {}

  getPendingRequests(): Observable<ActivationRequest[]> {
    return this.http.get<ActivationRequest[]>(this.apiUrl);
  }
  getEmployeeById() {
    return this.http.get<role>(`${this.apiUrl}/GetEmployee`);
  }
  getEmployee() {
    return this.http.get<role[]>(`${this.apiUrl}/GetEmployee`);
  }
  rejectRequest(requestId: number, empCode: string, comment: string) {
    const payload = {
      requestId,
      empCode,
      comment,
    };

    return this.http.put<any>(this.apiUrl + '/rejectrequest', payload);
  }

  approveRequest(requestId: number, empCode: string, comment: string) {
    const payload = {
      requestId,
      empCode,
      comment,
    };

    return this.http.post<any>(this.apiUrl + '/approverequest', payload);
  }


  UpdateRole(payload:any):Observable<UpdateRoleModel[]>{ 
    return this.http.put<UpdateRoleModel[]>(this.apiUrl +'/updateuserrole', payload);
  }

}
export type role = {
  id:number;
  name: string;
  code: string;
  email: string | null;
  // fk_DesignationId: string | null;
  fk_UserGroupId: number | null;
};
