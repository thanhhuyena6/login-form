import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
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
  isSubmit: boolean = true;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fields = [
      // email
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          required: true,
          placeholder: 'email',
          label: 'Email address',
          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
        },
        validation: {
            messages: {
              required: 'Email cant be plank!',
              pattern: (error, field: FormlyFieldConfig) => `"${field.formControl?.value}" Email must be a valid email address`
            },
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
        },
        validation: {
          messages: {
            required: 'Password cant be plank!'
          }
        }
      }
    ]
  }

  onSubmit() {
    this.authService.login().pipe(
      untilDestroyed(this)
    ).subscribe((resp: any) => {
      this.authService.userLogin(this.form.value);
      this.isSubmit = this.authService.isSubmit
    })

  }

}
