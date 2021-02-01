import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { HeaderService } from 'src/app/header/header.service';

import { Loan } from '../loan';
 
@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit, OnDestroy {

  loans: Loan[] = [];
  newKeyWordSubscribed: Subscription;
  loanListSubscription: Subscription;

  //detailMode=true;  

  constructor(
    private router: Router, 
    private globalService: GlobalService,
    private headerService: HeaderService) {


  }
  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['../']);
    }


    //   Turn on Header is admin
    this.globalService.headerSearchEvent.next(false);

    console.log("**********Loan-List Init Called**********");

    this.subscribeToLoans();
    // subscribing the data String for first name, last name or loan Number.....then 
    //within this subscription only wee will call global service and call the API.....means 
    //subscription within Scbscription

    // searchBy is Subjected and Triggered in Header Service. 
    this.newKeyWordSubscribed = this.headerService.searchBy.subscribe(
      (seachValue: String) => {
        this.searchByHeader(seachValue);
        //...
      }
    );
  }//... Init end


  searchByHeader(seachValue: String) {

    let searchKey = seachValue.split(" ");
    if (searchKey[0] === "firstName") {
      // subs to first name
      this.globalService.getLoanListByFirstName(searchKey[1]).subscribe(
        data => {
          console.log(data);
          
          this.loans = data;
          if (this.loans.length === 0) {
            alert("This search does not exist");
            this.subscribeToLoans();
          }
        },
        error=>{
          alert("Session Out");
           localStorage.clear();
           this.router.navigate(['../']);
        }
      );
    }
    if (searchKey[0] === "lastName") {
      // subs to last name
      this.globalService.getLoanListByLastName(searchKey[1]).subscribe(
        data => {
          this.loans = data;
          if (this.loans.length === 0) {
            alert("This search does not exist");
            this.subscribeToLoans();
          }
        }
        ,
        error=>{
         
          alert("Session Out");
           localStorage.clear();
           this.router.navigate(['../']);
        }
      );
    }
    if (searchKey[0] === "loanNumber") {
      // subs to first name
      this.globalService.getLoanListByLoanNumber(searchKey[1]).subscribe(
        data => {
          this.loans = data;
          if (this.loans.length === 0) {
            alert("This search does not exist");
            this.subscribeToLoans();
          }
        },
        error=>{
       
          alert("Session Out");
           localStorage.clear();
           this.router.navigate(['../']);
        }
      );
    }

  }

  subscribeToLoans() {
    this.loanListSubscription = this.globalService.getLoanList().subscribe(
      (loanList: Loan[]) => {
        return this.loans = loanList.sort(function(a, b) { 
          return a.loanNumber - b.loanNumber  ;
        });
      },
      error => { 
        alert('Session Out');
        this.router.navigate(['/']);
      }

    );
  }

  ngOnDestroy(): void {
    this.newKeyWordSubscribed.unsubscribe();
    this.loanListSubscription.unsubscribe();
  }


}
 