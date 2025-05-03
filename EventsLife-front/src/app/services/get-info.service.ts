/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/users');
  }
  getUserId(): string | null {
    let userId = '';
    this.http.get(this.apiUrl + '/users').subscribe((data: any) => {
      userId = data[0].id;
    });
    return userId;
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + '/categories');
  }

  createEvent(event: any) {
    return this.http.post(this.apiUrl + '/event', event);
  }

  getEventByOrganizer(organizerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/event/${organizerId}`);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/event/${id}`);
  }
}
