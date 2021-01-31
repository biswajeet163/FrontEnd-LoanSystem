import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loan } from '../../loan';

@Injectable({
  providedIn: 'root'
})
export class LoanItemService {

  // It is subscribed in  LOAN Component...
  // then Set in Loan Service and then...
  // get in loan-detail from loan-servive 
  showItemDetail = new Subject<any>();

  constructor() { }

  showItem(loanItem: any) {
    this.showItemDetail.next(loanItem);
  }

}
