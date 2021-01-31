import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../../loan';
import { LoanDetailService } from '../loan-detail.service';

import { LoanUpdateComponent } from './loan-update.component';


class RouterStub {
  navigate(params) {

  }
} 

class ActivatedRouterStub{
  params: Observable<any>= EMPTY; 
}

fdescribe('LoanUpdateComponent', () => {
  let component: LoanUpdateComponent;
  let fixture: ComponentFixture<LoanUpdateComponent>;
  let globalService: GlobalService;
  let loanDetailService:LoanDetailService;
  let router: Router;
  let spy;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ LoanUpdateComponent ],
      providers:[
        GlobalService,
        LoanDetailService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouterStub }

      ]
    })
    .compileComponents(); 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanUpdateComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    globalService = TestBed.inject(GlobalService);  
    loanDetailService = TestBed.inject(LoanDetailService);
    router = TestBed.inject(Router);
    spy = spyOn(router , 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
      fixture.detectChanges();
  });

  it('on Submit Navigate', () => {
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
   
  });


  xit('Modified the form', () => {

    let newLoan = new Loan(1,"biswa","Car","Short",1000 ,new Date(), new Date());
    let user={
      loanNumber:1,
      memberName:'name',
      loanType: 'Car',
      loanTerm: 'Short',
      amount: 10000,
      originDate: '',
      endDate:''
    };

    component.updatedForm.setValue(newLoan);
    spy=spyOn(globalService, 'modifyLoanItem').and.returnValue(of("Updated"));

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

  }); 


  xit('Update Error', () => {
    let newLoan = new Loan(1,"biswa","Car","Short",1000 ,new Date(), new Date());
    component.updatedForm.setValue(newLoan);
    spy=spyOn(globalService, 'modifyLoanItem').and.returnValue(throwError({ok: 'false'}));

    component.onSubmit();

    expect(spy).toHaveBeenCalled(); 
  });



  


 
});
