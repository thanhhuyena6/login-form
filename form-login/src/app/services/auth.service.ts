import { Injectable } from '@angular/core';
import {users} from "../mock-user";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  arrayUser = users;
  userId: any;
  index: number = -1;
  isSubmit: boolean = true;

  constructor(private router: Router) { }

  login(): Observable<any> {
    return of(users)
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  userLogin(value:any) {
    this.arrayUser.forEach((user: any) => {
        if (user.email == value.email &&  user.password == value.password) {
          localStorage.setItem('user', JSON.stringify(user.id));
          this.index = 1;
          this.router.navigate(['/home'])
        }
    })
    if (this.index !== 1) {
      this.isSubmit = false;
    }
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
