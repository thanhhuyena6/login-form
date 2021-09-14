import { Injectable } from '@angular/core';
import {users} from "../mock-user";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(): Observable<any> {
    return of(users)
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }
}
