import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

 

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUsernameFromToken(): string | null {
    
    console.log("entro")
    const token = this.getToken()!;
    const decodedToken: any = jwtDecode(token);
    const username = decodedToken.sub;
    console.log(username);
    return username;
  }

  getReproductionsBySongIdAndUserId(userId: string, songId: number): Observable<any[]> {
    const url = `${this.baseUrl}/reproducciones/usuario?songId=${songId}&userId=${userId}`;
    const token = this.getToken();
    if (token) {
      console.log(token);
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
      });

    return this.http.get<any[]>(url, {headers});

  } else {
    console.error('No se encontró el token de autenticación.');
    return throwError('No se encontró el token de autenticación.');
}
  
}

  getReproductionsByUserId(userId: string): Observable<any[]> {
    const url = `${this.baseUrl}/reproducciones/totales/usuario?userId=${userId}`;
    
    const token = this.getToken();
    if (token) {
      console.log(token);
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
      });
    
    return this.http.get<any[]>(url, {headers});

  } else {
    console.error('No se encontró el token de autenticación.');
    return throwError('No se encontró el token de autenticación.');
}
  }


  getUserByUsername(username: string): Observable<any> {
    const token = this.getToken();
    if (token) {
      console.log(token);
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
      });
    
    
    return this.http.get<any>(`${this.baseUrl}/users/${username}`, {headers});

  } else {
    console.error('No se encontró el token de autenticación.');
    return throwError('No se encontró el token de autenticación.');
}
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/users/${user.username}`;
    
    const token = this.getToken();
    if (token) {
      console.log(token);
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
      });
    
    return this.http.patch<any>(url, user, {headers});

  } else {
    console.error('No se encontró el token de autenticación.');
    return throwError('No se encontró el token de autenticación.');
}
  }

  

}
