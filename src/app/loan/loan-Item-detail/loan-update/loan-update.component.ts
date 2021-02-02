
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../../loan';
import { LoanDetailService } from '../loan-detail.service';


@Component({
  selector: 'app-loan-update',
  templateUrl: './loan-update.component.html',
  styleUrls: ['./loan-update.component.css']
})
export class LoanUpdateComponent implements OnInit {

  needToUpdateLoanItem: Loan;

  updatedForm: FormGroup;

  constructor(private globalService: GlobalService,
    private loanDetailService: LoanDetailService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['../']);
    }

    this.needToUpdateLoanItem = this.loanDetailService.getModify();
    if (this.needToUpdateLoanItem === undefined) {
      this.onBack();
    }


    //******************************************************** */
    try {
      throw new Error('Something bad happened');
    }
    catch (e) {
      console.log(e);
    }


    //console.log(this.needToUpdateLoanItem.endDate);


    this.updatedForm = new FormGroup({
      'loanNumber': new FormControl(''),
      'memberName': new FormControl('', Validators.required),
      'loanType': new FormControl('', Validators.required),
      'loanTerm': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'originDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
    });


    this.updatedForm.patchValue({
      loanNumber: this.needToUpdateLoanItem.loanNumber,
      memberName: this.needToUpdateLoanItem.memberName,
      loanType: this.needToUpdateLoanItem.loanType,
      loanTerm: this.needToUpdateLoanItem.loanTerm,
      amount: this.needToUpdateLoanItem.amount,
      originDate: this.needToUpdateLoanItem.originDate,
      endDate: this.needToUpdateLoanItem.endDate

    });



  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  onSubmit() {
    // TURN THE HEADER AS GOING TO LOAN-LIST
    this.globalService.headerSearchEvent.next(false);


    //console.log(updatedForm.value.memberName);    ******** CALL GLOBAL SERVICE AND MAKE CALL WITH BACKENED APISSS
    // update the Form In data base
    // Using a model of Loan type.

    let updatedloan = new Loan(
      this.updatedForm.value.loanNumber,
      this.updatedForm.value.memberName,
      this.updatedForm.value.loanType,
      this.updatedForm.value.loanTerm,
      this.updatedForm.value.amount,
      this.updatedForm.value.originDate,
      this.updatedForm.value.endDate
    );
    this.globalService.modifyLoanItem(updatedloan).subscribe();

    //console.log("Updated form backend Api calls...........USing Global Service");

    this.router.navigate(['../'], { relativeTo: this.activeRoute });

  }


}
