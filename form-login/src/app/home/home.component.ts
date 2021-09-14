import { Component, OnInit } from '@angular/core';
import {users} from "../mock-user";
import {element} from "protractor";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  arrayUser = users;
  userId: any;
  user: any;

  constructor() { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
    this.userId = JSON.parse(this.userId)
    this.renderUser();
  }

  renderUser() {
    this.arrayUser.forEach((element : any) => {
      if (element.id === this.userId) {
        this.user = element;
      }
    })
  }

}
