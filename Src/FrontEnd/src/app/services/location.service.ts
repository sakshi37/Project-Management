import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateLocationDto } from '../features/Master/settings/location/Models/update-location.dto';
import { GetLocationDto } from '../features/Master/settings/location/Models/get-location.dto';
import { CreateLocationDto } from '../features/Master/settings/location/Models/create-location.dto';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  
  private apiUrl= 'https://localhost:7292/api/Location';

  constructor(private http: HttpClient) { }
  
  getAllLocations(): Observable<GetLocationDto[]> {
      return this.http.get<GetLocationDto[]>(`${this.apiUrl}`);
    }
    
  
    createLocation(dto: CreateLocationDto): Observable<CreateLocationDto> {
      return this.http.post<CreateLocationDto>(`${this.apiUrl}`, dto);
    }
  
    updateLocation(updateDto: UpdateLocationDto): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}`, updateDto);
    }
    
  softDeleteLocation(id: number, newStatus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
