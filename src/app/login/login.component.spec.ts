import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginRequest } from './model/loginRequest';
import { LoginResponse } from './model/loginresponse';

class RouterStub {
  navigate(params) {

  }
} 


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,  ReactiveFormsModule , FormsModule,],
      declarations: [LoginComponent],
      providers: [
        LoginService, 
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(LoginService); 

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login Success', () => {
    let user = new LoginResponse("biswa","xfsf46sdf", new Date(), "admin");
   
     component.formData.setValue({ 'email':"biswa", 'password':"123"});
     spy=spyOn(service, 'login').and.returnValue(of(user));

     component.onSubmit(); 

     expect(spy).toHaveBeenCalled();

  }); 


//...
});
 