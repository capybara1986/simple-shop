import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {first} from "rxjs";
import {User} from "../model/User";
import {HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string = "";

  constructor(private readonly fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {

    this.form = this.fb.group({
      username: [environment.testUser.username, Validators.required],
      password: [environment.testUser.password, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  submitForm() {
    if (this.form.valid) {
      this.authenticationService.login(this.form.get('username')?.value, this.form.get('password')?.value).pipe(first())
        .subscribe(
          (token) => {
            this.authenticationService.getFakerUser().pipe(
              map((user:User) => {
                user.access_token = token;
                this.router.navigateByUrl('/articles-board')
                localStorage.setItem('simple_store_current_user', JSON.stringify(user))
                this.authenticationService.currentUserSubject.next(user);
                return user;
              })
            ).subscribe()
          },
          (error: HttpErrorResponse) => {
            this.error = error.error;
            this.form.get('password')?.setValue('')
            this.form.clearValidators();
          });
    } else {
      this.error = "";
    }
  }
}
