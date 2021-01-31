import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginRequest } from './model/loginRequest';
import { LoginResponse } from './model/loginresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData: FormGroup;
  loginError:boolean= false;  

  constructor(private router: Router, 
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log("Hello Lord");

    const email: String = this.formData.value.email;
    const password: String = this.formData.value.password;
    let userData = new LoginRequest(email, password);

     //*********************************************** */ 
     this.loginService.login(userData).subscribe(  
      (data: LoginResponse) => { 

        // As Logged In successful so Updating the Logged User ***************
        localStorage.clear();
        localStorage.setItem('token', data.token.toString() );
        localStorage.setItem('username', data.username.toString() );
        localStorage.setItem('role', data.role.toString() );
        localStorage.setItem('clientType', (data.role+"_"+data.username).toString() );

        const move = data.role.toString();
         
        console.log("one----------------");  
        console.log(data);
        
        this.router.navigate([`${move}-loans`]); 
      },
      error => {
        this.loginError=true;
        //alert("Your Credential is wrong")
        //console.log("My Custom Error : You are not Authorized to Login");
        //console.log("------->>>>> " + error.message);
      }
    );

  }

}
