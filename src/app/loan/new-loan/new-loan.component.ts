
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../loan';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit { 

  newLoanForm: FormGroup;
 
  constructor(private globalService: GlobalService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.newLoanForm = new FormGroup({
      'loanNumber': new FormControl(''),
      'memberName': new FormControl('', Validators.required),
      'loanType': new FormControl('', Validators.required),
      'loanTerm': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'originDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
    }); 
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  onSubmit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['../']);
    }

    this.globalService.headerSearchEvent.next(false);

    //  ******** CALL GLOBAL SERVICE AND MAKE CALL WITH BACKENED APISSS to insert new loan details

    let loan = new Loan(
      0,
      this.newLoanForm.value.memberName,
      this.newLoanForm.value.loanType,
      this.newLoanForm.value.loanTerm,
      this.newLoanForm.value.amount,
      this.newLoanForm.value.originDate,
      this.newLoanForm.value.endDate
    );


    this.globalService.createNewLoan(loan).subscribe();
 
    

    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

} // 
