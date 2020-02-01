import { Component, OnInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { SnotifyService, SnotifyModule } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(private route: ActivatedRoute, private userAuthenticate: UserAuthenticateService, private router: Router, private snotify: SnotifyService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userAuthenticate.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data) {
    let _router = this.router;
    this.snotify.confirm('Done, Now Login with new Password', {
      timeout: 9000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Okay', action: toastr => {
            _router.navigateByUrl('/login'),
              this.snotify.remove(toastr.id)
          },
        },
        { text: 'Close', action: (toast) => { console.log('Clicked: No'); this.snotify.remove(toast.id); }, bold: true },
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
