import { TestBed } from '@angular/core/testing';

import { UserAuthenticateService } from './user-authenticate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';


describe('UserAuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: UserAuthenticateService = TestBed.get(UserAuthenticateService);
    expect(service).toBeTruthy();
  });
});
