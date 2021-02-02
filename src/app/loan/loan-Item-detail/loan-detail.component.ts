import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../loan';
import { LoanService } from '../loan.service';
import { LoanDetailService } from './loan-detail.service';



@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

  // Turn off MODIFY and DELETE btn is it is User
  isAdminOrNot = false;

  showLoanDetail: Loan = null;
  currentUpadteLoanItem: Loan;
  updateMode = false;


  constructor(
    private globalService: GlobalService,
    private loanService: LoanService,
    private loanDetailService: LoanDetailService,
    private router: Router,
    private actveRouter: ActivatedRoute) { }

  ngOnInit(): void {
 
    // At the Starting Itself.... got to know either it is Admin or user
    // so that hide delete/ modify btn for admin and user accordingly

    this.showLoanDetail = this.loanService.getLoanItemDetail();
    this.isAdminOrNot = this.loanDetailService.isAdmin;



    if (this.showLoanDetail === undefined) {
      this.onBack();
    }
  
    
     try {
      throw new Error('Something bad happened');
    }
    catch(e) {
      console.log(e);
    }

  }

  onBack() {
    this.globalService.headerSearchEvent.next(false);
    this.loanDetailService.createBackEvent();
  }

  onDelete() {

    //let deleteConfirm : Boolean;
    if (confirm("Delete!!..... Are you Sure? ")) {
      //deleteConfirm= true;
      this.globalService.headerSearchEvent.next(false);

      this.loanDetailService.deleteUserLoan(this.showLoanDetail.loanNumber.toString());
    } else {
      this.onBack();
    }


    //alert("Deleted Successfully");
  }

  onModify() {
    this.currentUpadteLoanItem = this.showLoanDetail;
    this.updateMode = true;
    console.log("Routingggggggggg");

    this.loanDetailService.setModify(this.showLoanDetail);

    this.router.navigate(['../loan-detail-update'], { relativeTo: this.actveRouter });

  }

}
