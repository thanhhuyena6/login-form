import { Injectable } from '@angular/core';
import {users} from "../mock-user";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  arrayUser = users;
  userId: any;

  constructor() { }

  login(): Observable<any> {
    return of(users)
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  getUser(){
    let user = {};
    this.userId = localStorage.getItem('user');
    this.userId = JSON.parse(this.userId)
    this.arrayUser.forEach((element : any) => {
      if (element.id === this.userId) {
        user = element;
      }
    })
    return user
  }

}
