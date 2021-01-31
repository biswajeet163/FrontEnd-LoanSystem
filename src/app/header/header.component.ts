import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from '../global.service';
import { LoanDetailService } from '../loan/loan-Item-detail/loan-detail.service';
import { LoginService } from '../login/login.service';

import { HeaderService } from './header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedUserName: string = "Hello";
  isAdmin: boolean;

  headerSearchHide = false; // false****************  
  headerSubscription: Subscription;

  searchBy = new Subject<String>();

  constructor(private globalService: GlobalService,
    private loginService: LoginService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private loanDetailService: LoanDetailService) {
  }


  ngOnInit(): void { 

    if(localStorage.getItem('token') === null){
      this.router.navigate(['../']);
    }

    //*******************************************************************************************************//
    this.loggedUserName = localStorage.getItem('username');
    this.isAdmin = localStorage.getItem('role') === 'admin' ? true : false;


    if (this.isAdmin === true) {
      //set isAdmin or Not for Item-Detail shoe The Modify/Delete/ and BAck Button Working according to user/admin
      this.loanDetailService.setAdminOrNot(true);
    }
    else {
      //set isAdmin or Not for Item-Detail shoe The Modify/Delete/ and BAck Button Working according to user/admin
      this.loanDetailService.setAdminOrNot(false);
    }

    //********************************************************************************************************** */

    /// Update Logged User and also the token can be obtained **********
    this.headerSubscription = this.globalService.headerSearchEvent.subscribe(
      headerValue => {
        this.headerSearchHide = headerValue;
      }
    );

    //Forms

    this.searchDataByFirstNameForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
    });

    this.searchDataByLastNameForm = new FormGroup({
      'lastName': new FormControl('', Validators.required),
    });

    this.searchDataByLoanNumberForm = new FormGroup({
      'loanNumber': new FormControl('', Validators.required),
    });

  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }
 
  onCreateNewLoan() {
    //console.log(this.route);
    this.globalService.headerSearchEvent.next(true);
    this.router.navigate(['originate-new-loan'], { relativeTo: this.activeroute })

  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('clientType');

    localStorage.clear();


    this.router.navigate(['../login'], { relativeTo: this.activeroute }); 
  } 

  searchDataByFirstNameForm: FormGroup; 
  onSubmitByFirstName() {
    //this.headerService.searchByFirstName(formData.value.firstName);
    // 1-- Make api calls from global service for Loan List a/c to first anme
    // 2- here itself it is returning a subscription value ,,,, whic need to be subscribe in the loan-list....for 
    //    this we need to inject this service and get the data there
    this.headerService.searchByFirstName(this.searchDataByFirstNameForm.value.firstName);
    this.searchDataByFirstNameForm.reset();

  }

  searchDataByLastNameForm: FormGroup;
  onSubmitByLastName() {
    //console.log(formData.value);
    this.headerService.searchByLastName(this.searchDataByLastNameForm.value.lastName);
    this.searchDataByLastNameForm.reset();
  }
 
  searchDataByLoanNumberForm: FormGroup;
  onSubmitByLoanNumber() {
    //console.log(formData.value.loanNumber);
    this.headerService.searchByLoanNumber(this.searchDataByLoanNumberForm.value.loanNumber);
    this.searchDataByLoanNumberForm.reset();
  }


}
