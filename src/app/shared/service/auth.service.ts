import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Users} from "../model/users.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/';

  private currentUser$ : BehaviorSubject<Users> = new BehaviorSubject<Users>({} as Users);

  constructor(private http: HttpClient) {}

  getUser(user : Users): Observable<any> {
    return this.http.get(this.baseUrl + 'users' + '?email=' + user.email + '&password=' + user.password);
  }

  addUser(data: Users): Observable<any> {
    return this.http.post(this.baseUrl + 'users', data);
  }

  getCurrentUser(): BehaviorSubject<Users> {
    return this.currentUser$;
  }

  setCurrentUser(user: Users): void {
    this.currentUser$.next(user);
  }
}
