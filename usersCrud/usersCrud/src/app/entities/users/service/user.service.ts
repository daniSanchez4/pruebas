import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  


  constructor(private http: HttpClient) { }

  public getAllUsers(page: number, size: number, sort: string, filters?: string): Observable<any[]> {
  let urlEndpoint: string = "http://localhost:8080/users/users?page=" + page + "&size=" + size + "&sort=" + sort;
  if(filters){
    urlEndpoint = urlEndpoint + "&filter=" + filters;
  }
  return this.http.get<any[]>(urlEndpoint);

}

public deleteUser(userIdToDelete: number): Observable<any> {
  let urlEndpoint: string = "http://localhost:8080/users/users/" + userIdToDelete;
  return this.http.delete<any>(urlEndpoint);
}

public getUserById(userId: number): Observable<User> {

  let urlEndpoint: string = "http://localhost:8080/users/users/" + userId;
  return this.http.get<User>(urlEndpoint);

}

public insert(user: User): Observable<User> {
  let urlEndpoint: string = "http://localhost:8080/users/users";
  return this.http.post<User>(urlEndpoint, user);
}

public update(user: User ): Observable<User> {

  let urlEndpoint: string = "http://localhost:8080/users/users/" + user.id;
  return this.http.patch<User>(urlEndpoint, user);

}


}
