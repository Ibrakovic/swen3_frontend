import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth'; // Adjust the URL to match your backend

  constructor(private http: HttpClient) {}

  // Register a new user with dummy data
  register(userData: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/register`, userData, { headers }).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(error); // Return the error to the component
      })
    );
  }
}
