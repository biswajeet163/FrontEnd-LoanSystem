import { Injectable } from '@angular/core';
import { Loan } from './loan';

@Injectable({
  providedIn: 'root'
})  
export class LoanService { 
 
  showLoan:Loan;
  updateLoan:Loan;

  setLoanItemDetail(loan: Loan){
    this.showLoan= loan; 
  }

  getLoanItemDetail(): Loan {
    return this.showLoan;
  } 

  setUpdateLoan(data: Loan) {
    this.updateLoan = data;
  }
  getUpdateLoan(): Loan { 
   return  this.updateLoan;
  }
 
}
