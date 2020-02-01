import { Component, OnInit } from '@angular/core';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  }


  public error = [];

  constructor(private userAuthenticate: UserAuthenticateService, private token: TokenService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userAuthenticate.signup(this.form).subscribe(
      res => this.handleResponse(res),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
