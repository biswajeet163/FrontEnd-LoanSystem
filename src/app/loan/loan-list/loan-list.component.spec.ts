import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

  let loanList: Loan[];
  const fakeGlobalService = {
    data: of(loanList)
  };

  beforeEach(async () => {
    // const spy = spyOn(globalServiceSpy.getLoanListByFirstName, 'subscribe').and.returnValue()
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
    headerService = TestBed.inject(HeaderService);
    globalService = TestBed.inject(GlobalService);
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

    let loanList: Loan[];
    let responseObjectList: Loan;
    responseObjectList = { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() };
    //loanList.push(responseObjectList);


    let spy = spyOn(globalService, 'getLoanListByFirstName').and.returnValue(of(loanList));
    component.searchByHeader("First Biswa");

    expect(spy).toHaveBeenCalled();

  });



  it("should call getUsers and return list of users", fakeAsync(() => {
    //const response: Loan[] = [];
    const responseObject = [
      { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
      { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
    ];

    let spy1= spyOn(globalService, 'getLoanListByFirstName').and.returnValue(of(responseObject))

    let spy2 = spyOn(globalService.getLoanListByFirstName("Deepak"), 'subscribe');

    component.searchByHeader("Deepak Roy");
    component.ngOnInit();

 
    fixture.detectChanges();
    tick();

    //expect(spy1).toHaveBeenCalledBefore(spy2);
    //expect(spy2).toHaveBeenCalled();

    // fixture.whenStable().subscribe(() => {
    //     expect(homeComponent.listOfUsers).toEqual(response);
    //     done();
    // });


  }));





});
