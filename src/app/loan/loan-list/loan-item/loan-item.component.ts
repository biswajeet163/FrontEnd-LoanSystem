import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../../loan';

import { LoanItemService } from './loan-item.service';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.css']
})
export class LoanItemComponent implements OnInit {

  @Input() loanItem: Loan; 

  constructor(
    private globalService: GlobalService,
    private loanItemService: LoanItemService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) { 
      this.router.navigate(['../']);
    }

  } 
 
  onSelect() {
    // MAKE HEADER SERCH OFF
    this.globalService.headerSearchEvent.next(true);

    this.loanItemService.showItem(this.loanItem);

    this.router.navigate(['loan-detail'], { relativeTo: this.activeRoute });
  }
}
 