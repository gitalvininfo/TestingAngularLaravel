import { Component, OnInit } from '@angular/core';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }

  public error = null;

  constructor(private userAuthenticate: UserAuthenticateService, private token: TokenService, private router: Router, private auth: AuthService) { }


  onSubmit() {
    this.userAuthenticate.login(this.form).subscribe(
      res => this.handleResponse(res),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

}
