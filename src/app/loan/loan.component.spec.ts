import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Loan } from './loan';
import { LoanDetailService } from './loan-Item-detail/loan-detail.service';
import { LoanItemService } from './loan-list/loan-item/loan-item.service';

import { LoanComponent } from './loan.component';
import { LoanService } from './loan.service';

class RouterStub {
  navigate(params) {

  }
}

class ActivatedRouterStub{
  params: Observable<any>= EMPTY;
} 
 

fdescribe('LoanComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>; 
  let loanItemService: LoanItemService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ LoanComponent ],
      providers:[LoanItemService, LoanService, LoanDetailService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouterStub }
      
      ]
    }) 
    .compileComponents();
  }); 
 
  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    loanItemService= TestBed.inject(LoanItemService);
    fixture.detectChanges();
  }); 

  it('should create', () => {
    let newLoan = new Loan(1,"biswa","Car","Short",1000 ,new Date(), new Date());
    loanItemService.showItemDetail.next(newLoan);
    expect(component).toBeTruthy();
  });
});
  