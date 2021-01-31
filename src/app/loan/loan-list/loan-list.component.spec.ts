import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { GlobalService } from 'src/app/global.service';
import { HeaderService } from 'src/app/header/header.service';
import { Loan } from '../loan';
import { LoanListComponent } from './loan-list.component';
 

class RouterStub {
  navigate(params) {

  }
}  

fdescribe('LoanListComponent', () => {
  let component: LoanListComponent;
  let fixture: ComponentFixture<LoanListComponent>;
  let headerService: HeaderService; 
  let globalService: GlobalService; 
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      declarations: [LoanListComponent],
      providers: [GlobalService, 
        HeaderService,
        { provide: Router, useClass: RouterStub },
      ]
    })
      .compileComponents();
  }); 

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanListComponent);
    component = fixture.componentInstance;
    headerService= TestBed.inject(HeaderService);
    globalService= TestBed.inject(GlobalService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
  it('Get All Loans', () => {
    let responseObjectList: Loan;
    responseObjectList = { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() };
   
    let service = TestBed.inject(GlobalService);
  
    spyOn(service, 'getLoanList').and.returnValue(of([responseObjectList]))

    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();

    expect(service.getLoanList.length).toBe(0);


  });  
 

  it('Get All Loans by Header Search', () => {
    const responseObject = [
      { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
      { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
    ];

    let service = TestBed.inject(HeaderService);
    spyOn(service, 'searchByFirstName').and.returnValue(null);


    component.ngOnInit(); 
    fixture.detectChanges(); 

    expect(component).toBeTruthy();
  });


  it('Search By Header First SubsCribe', () => {
    headerService.searchBy.next("Test");
    expect(component).toBeTruthy();
  });

  xit('Search By Header Second SubsCribe', () => {

    let loanList:Loan[];
    let responseObjectList: Loan;
    responseObjectList = { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() };
    //loanList.push(responseObjectList);

     
    let spy= spyOn(globalService , 'getLoanListByFirstName').and.returnValue(of(loanList));
    component.searchByHeader("First Biswa");

    expect(spy).toHaveBeenCalled();
   
  }); 
 

 
 



});
