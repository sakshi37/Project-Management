import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetStateDto } from '../features/Master/settings/state/Models/get-state.dto';
import { CreateStateDto } from '../features/Master/settings/state/Models/create-state.dto';
import { UpdateStateDto } from '../features/Master/settings/state/Models/update-state.dto';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private apiUrl = `${API_URL}/State`;

  constructor(private http: HttpClient) {}

  getAllStates(): Observable<GetStateDto[]> {
    return this.http.get<GetStateDto[]>(`${this.apiUrl}`);
  }

  createState(dto: CreateStateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, dto);
  }

  updateState(updateDto: UpdateStateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, updateDto);
  }

  softDeleteState(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
