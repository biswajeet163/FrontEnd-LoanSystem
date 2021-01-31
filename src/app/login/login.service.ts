import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginRequest } from './model/loginRequest';
import { LoginResponse } from './model/loginresponse';

@Injectable({
  providedIn: 'root'
}) 
export class LoginService {
  constructor(private http: HttpClient) { } 

  login(userData: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      'http://localhost:9192/auth/login',
      userData
    )
  } 
}
 