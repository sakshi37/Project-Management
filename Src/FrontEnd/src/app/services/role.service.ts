import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role;
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }

  isInRole(allowedRoles: string[]): boolean {
    const role = this.getUserRole();
    return role ? allowedRoles.includes(role) : false;
  }
}
