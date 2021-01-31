import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Loan } from './loan';
import { LoanDetailService } from './loan-Item-detail/loan-detail.service';
import { LoanItemService } from './loan-list/loan-item/loan-item.service';
import { LoanService } from './loan.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  providers: [LoanDetailService, LoanItemService]
})
export class LoanComponent implements OnInit, OnDestroy {

  updateLoanDetail: Loan;

  loanDetailSubscription: Subscription;   
  backValueSubscription: Subscription;

  constructor(
    private router: Router,
    private loanItemService: LoanItemService,
    private loanService: LoanService,
    private loanDetailService: LoanDetailService) { }

  ngOnInit(): void {

    if(localStorage.getItem('token') === null){
      this.router.navigate(['../']);
    }
  
    this.loanItemService.showItemDetail.subscribe(
      (data: Loan) => {
        this.loanService.setLoanItemDetail(data);
      }
    );

    // On Back Call form loan-detail 
    this.backValueSubscription = this.loanDetailService.back.subscribe();
   
    this.loanDetailSubscription = this.loanDetailService.currentLoanDetail.subscribe(
      data => {
        this.loanService.setUpdateLoan(data);
      } 
    );
  }

  ngOnDestroy(): void { 
    this.loanDetailSubscription.unsubscribe();
    this.backValueSubscription.unsubscribe();
  }

}
 