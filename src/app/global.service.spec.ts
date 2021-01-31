import { inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GlobalService } from './global.service';
import { Loan } from './loan/loan';

fdescribe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
 
    });
    service = TestBed.inject(GlobalService);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 

  it('Get All Loans', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
    const responseObject = [
      { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
      { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
    ];
    let clientType: string = "admin_biswa";

    // ACT
    let resultObject: Loan[];
    service.getLoanList().subscribe(
      (data: Loan[]) => {
        resultObject = data;
      }
    );

    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/getloan?clientType='+clientType);
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it
  }));

  it('Get All Loans By First Name', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
    const responseObject = [
      { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
      { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
    ];

    // ACT
    let resultObject: Loan[];
    const firstName="Biswa"
    service.getLoanListByFirstName(firstName).subscribe(
      (data: Loan[]) => {
        resultObject = data;
      }
    );


    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/getloan/firstname?firstname='+firstName);
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it
  }));

  it('Get All Loans By Last Name', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
    const responseObject = [
      { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
      { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
    ];

    // ACT
    let resultObject: Loan[];
    const lastName="Mandal"
    service.getLoanListByLastName(lastName).subscribe(
      (data: Loan[]) => {
        resultObject = data;
      }
    );


    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/getloan/lastname?lastname='+lastName);
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it
  })); 

  it('Get All Loans By Loan Number', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
    const responseObject = [
      { loanNumber: 1, memberName: "Biswa", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
      { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() },
    ];
    let clientType: string = "admin_biswa";

    // ACT
    let resultObject: Loan[];
    const loanNumber="10";
    service.getLoanListByLoanNumber(loanNumber).subscribe(
      (data: Loan[]) => {
        resultObject = data; 
      }
    );
   

    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/getloan/loannumber?clientType='+clientType+'&loannumber='+loanNumber);
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it
  }));

  it('Create A Loan', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
    const responseObject =  { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() };

    // ACT
    let resultObject: Loan;
    service.createNewLoan(responseObject).subscribe(
      (data: Loan) => {
        resultObject = data;
      }
    );

    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/addnewloan');
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it
  }));




  it('Modify A Loan', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
   let responseObject="Updated";

    // ACT
    let resultObject: String;
    const modifiedObject =  { loanNumber: 2, memberName: "Rohit", loanType: "Car", loanTerm: "Short", amount: 1000, originDate: new Date(), endDate: new Date() };
    service.modifyLoanItem(modifiedObject).subscribe(
      (data: String) => {
        resultObject = data;
      }
    );

    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/update');
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it 
  }));


  it('Delete A Loan', inject([HttpTestingController], (httpMockBackend) => {
    // Arrange
   let responseObject="Deleted";

    // ACT 
    let resultObject: String;
    const deletedIdObject = "5";
    service.deleteLoanItem(deletedIdObject).subscribe(
      (data: String) => {
        resultObject = data;
      }
    );

    const requestWrapper = httpMockBackend.expectOne('http://localhost:8100/loans/delete?id='+deletedIdObject);
    requestWrapper.flush(responseObject)

    expect(resultObject).toEqual(responseObject);

    ///....it
  })); 





  //...
});
