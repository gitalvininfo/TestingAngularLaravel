import { Component, OnInit } from '@angular/core';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  }
  constructor(private userAuthenticate: UserAuthenticateService, private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.notify.info('Wait...', { timeout: 3000 })
    this.userAuthenticate.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.notify.success(res.data, { timeout: 0 })
    this.form.email = null;
  }

}
