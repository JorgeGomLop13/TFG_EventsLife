/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserResponse } from '../core/types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // tu ruta de API

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post<UserResponse>(`${this.apiUrl}/login`, { email, password });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/home']);
  }

  //Metodo encargado para comprobar que el usuario esta autenticado, para ello se comprueba si el token existe
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined; //Comprobamos que el token no es nulo
  }
}
