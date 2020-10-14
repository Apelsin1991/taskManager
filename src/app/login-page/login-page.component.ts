import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServise } from '../shared/auth.service';
import { User } from '../shared/interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submited = false

  

  constructor(private router: Router,
              private auth: AuthServise) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })


  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submited = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password      
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate([''])
      this.submited = false
    }, () => {this.submited = false})

  }

}
