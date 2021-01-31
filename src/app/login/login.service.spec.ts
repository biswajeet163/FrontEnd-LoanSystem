import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { LoginResponse } from './model/loginResponse';




fdescribe('LoginService', () => {
  let service: LoginService; 

 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    //httpBackend = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);

  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should be done', inject([HttpTestingController], (httpBackend) => {

    //const loginResponseMade = new LoginResponse(1,"admin","dfs",new Date(), "admin");

    const loginResponseMade = {
      id: 1,
      username: "admin",
      token: "fdsd",
      validUpTo: new Date(),
      role: "admin"

    }


    let responseResult = null;
    let requests = null;

    service.login({ username: 'admin', password: 'pass' }).subscribe(
      data => {
        responseResult = data;
      }
    );

    requests = httpBackend.expectOne('http://localhost:9192/auth/login');

    requests.flush(loginResponseMade)
 


    expect(responseResult).toEqual(loginResponseMade);


  })) 


});

