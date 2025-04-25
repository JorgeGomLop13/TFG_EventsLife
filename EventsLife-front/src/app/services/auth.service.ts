import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // tu ruta de API

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/login`, { email, password });
  }

  getUser(): Observable<any> {
    //Aqui obtengo el token del localStorage
    // Y lo paso como Authorization en el header para obtener al usuario
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }
}

export interface RegisterResponse {
  token: string;
  user: any;
}
