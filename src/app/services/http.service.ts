// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class strategyService {
//   private apiUrl = 'http://localhost:8000/api/strategy/'; // Update as needed

//   constructor(private http: HttpClient) {}

//   getStrategies(): Observable<any[]> {
//     const token = 'YOUR_ACCESS_TOKEN_HERE'; // Replace with your actual token or get it dynamically
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//     });

//     return this.http.get<any[]>(this.apiUrl, { headers });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Fetch token from storage
    let headers = new HttpHeaders({ Accept: 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }

  get(endpoint: string, options = {}): Observable<any> {
    options = { ...options, headers: this.getHeaders() };
    return this.http
      .get(`${this.apiUrl}/${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any, options = {}): Observable<any> {
    options = { ...options, headers: this.getHeaders() };
    return this.http
      .post(`${this.apiUrl}/${endpoint}`, data, options)
      .pipe(catchError(this.handleError));
  }

  put(endpoint: string, data: any, options = {}): Observable<any> {
    options = { ...options, headers: this.getHeaders() };
    return this.http
      .put(`${this.apiUrl}/${endpoint}`, data, options)
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string, options = {}): Observable<any> {
    options = { ...options, headers: this.getHeaders() };
    return this.http
      .delete(`${this.apiUrl}/${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }
}
