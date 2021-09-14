import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});
  model : any;
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  arrayUser = [];
  isSubmit: boolean = true;
  index: number = -1;


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.fields = [
      // email
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          required: true,
          placeholder: 'email',
          label: 'Email address'
        }
      },
      // password
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'password',
          placeholder: 'password',
          passwordVisible: false,
          label: 'Password',
        }
      }
    ]
  }

  onSubmit() {
    this.authService.login().pipe(
      untilDestroyed(this)
    ).subscribe((resp: any) => {this.arrayUser = resp;})
    this.arrayUser.forEach((user: any) => {
      if (user.email == this.form.value.email &&  user.password == this.form.value.password) {
        localStorage.setItem('user', JSON.stringify(user.id));
        this.index = 1;
        this.router.navigate(['/home'])
      }
    })
    if (this.index !== 1) {
      alert('email or password does not exist')
    }
  }

}
