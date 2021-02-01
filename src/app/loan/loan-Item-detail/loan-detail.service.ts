import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../loan';


@Injectable({
  providedIn: 'root'
})
export class LoanDetailService {
 
  isAdmin = false; 

  back = new Subject<boolean>();
  makeHeaderOff = new Subject<boolean>();

  currentLoanDetail = new Subject<Loan>(); 
  updateLoanItem: Loan;

  constructor(private globalService: GlobalService,
    private router: Router,
    private actveRouter: ActivatedRoute) { }

  setAdminOrNot(isddmin: boolean) {
    this.isAdmin = isddmin; 
  }
 
  createBackEvent() {
    let adminOruserMove = this.isAdmin == true ? 'admin-loans' : 'user-loans';
    //  check for it it, its a issue for user and admin  -- "admin or user should be according to logiged user"
    this.router.navigate(['../' + adminOruserMove], { relativeTo: this.actveRouter });
  } 

  deleteUserLoan(showLoanId: string) {
    //console.log("Api call using gLOBAL sERVIEC********************************************** 1");
    this.globalService.deleteLoanItem(showLoanId).subscribe(
      response => {
        console.log(response);
        this.createBackEvent()
        this.makeHeaderOff.next(false);
      }, 
      error => {

        // localStorage.removeItem('token');
        // localStorage.removeItem('username');
        // localStorage.removeItem('role'); 
        // localStorage.removeItem('clientType');
        // localStorage.clear();

        alert('Deleting Error');
        this.createBackEvent()
        this.makeHeaderOff.next(false);
      }
    );
}

  setModify(showLoanDetail: Loan) {
    this.updateLoanItem = showLoanDetail;
  }

  getModify() {
    return this.updateLoanItem;
  }

  turnOffHeader(value: boolean) {
    this.makeHeaderOff.next(value);
  }

}
