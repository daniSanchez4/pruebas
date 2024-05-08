import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { Song } from './song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getAllSongs(page: number, size: number, sort: string, filters?: string): Observable<any[]> {
    let urlEndpoint: string = "http://localhost:8080/canciones?page=" + page + "&size=" + size + "&sort=" + sort;
    if(filters){
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }
    console.log(page, size, sort, filters);

    const token = this.authService.getToken();
    if (token) {
      console.log(token);
      
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      console.log(headers)
      
      return this.http.get<any[]>(urlEndpoint, { headers });
    } else {
      
      return this.http.get<any[]>(urlEndpoint);
    }
  }

public getReproductionsByUserId(userId: string, page:number, size:number, sort:string): Observable<any[]>{
  let urlEndpoint: string = "http://localhost:8080/reproducciones/historial?userId=" + userId + "&page=" + page + "&size=" + size + "&sort=" + sort;
  
  const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

  return this.http.get<any[]>(urlEndpoint, {headers});
}else{
  console.error('No se encontró el token de autenticación.');
      
      return throwError('No se encontró el token de autenticación.');
}
}


  public getSongById(songId: number): Observable<Song> {
    let urlEndpoint: string = "http://localhost:8080/canciones/" + songId;
    console.log(songId)
  
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      return this.http.get<Song>(urlEndpoint, { headers });
    } else {
      
      console.error('No se encontró el token de autenticación.');
      
      return throwError('No se encontró el token de autenticación.');
    }
  }

  
  public update(song: Song): Observable<Song> {
    let urlEndpoint: string = "http://localhost:8080/canciones/" + song.id;
    const token = this.authService.getToken();
    if (token) {
      console.log(token);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      return this.http.patch<Song>(urlEndpoint, song, { headers });
    } else {
      
      console.error('No se encontró el token de autenticación.');
      
      return throwError('No se encontró el token de autenticación.');
    }
  }

  public reproducirCancion(songId: number, userId: string, songStyle: string): Observable<any> {
    let urlEndpoint: string = `http://localhost:8080/canciones/${songId}/reproduccion?userId=${userId}&songStyle=${songStyle}`;
    const token = this.authService.getToken();
    if (token) {
        console.log(token);
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.http.post<any>(urlEndpoint, {}, { headers });
    } else {
        console.error('No se encontró el token de autenticación.');
        return throwError('No se encontró el token de autenticación.');
    }
}

}
