import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../loan';

import { LoanDetailService } from './loan-detail.service';



class RouterStub {
    navigate(params) {

    }  
}


class ActivatedRouterStub {
    params: Observable<any> = null;
}


fdescribe('LoanaDetailService', () => {
    let service: LoanDetailService;
    let globalService: GlobalService;
    let router: Router;
    let spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useClass: RouterStub },
            ] 
        });
        globalService = new GlobalService(null);
        service = new LoanDetailService(globalService, null, null);
        router = TestBed.inject(Router);
        spy = spyOn(router, 'navigate');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Setting Admin or Not', () => {
        service.setAdminOrNot(true);
        expect(service['isAdmin'].valueOf).toEqual(false);
    });

    it('Create Back Event', () => {
        service.createBackEvent();
        expect(service).toHaveBeenCalled();
    });

    it('Setting New Loan Modification ', () => { // ************

        // Arrange
        let loan = new Loan(1,
            "Biswa", "Car",
            "Short", 10000000,
            new Date(),
            new Date()
        );

        // Act
        service.setModify(loan);

        // Assert
        expect(service['updateLoanItem'].memberName).toEqual('Biswa');
    });

    it('Getting New Loan Modification ', () => { // ************

    });

   


  it('Turn off/On the Header', () => {
        // Arrange
        const nextSpy = spyOn(service.makeHeaderOff, 'next');

        // Act
        service.turnOffHeader(true);

        // Assert
        expect(nextSpy).toHaveBeenCalled();

    });



    it('Deleting a Loan Item', () => {
        // Arrange 

        let loan = new Loan(1,
            "Biswa", "Car",
            "Short", 10000000,
            new Date(),
            new Date()
        );
        const nextSpy =
            // Assert
            expect(service).toHaveBeenCalled();
        //expect(service['makeHeaderOff'].asObservable()).toHaveBeenCalled();
    });







 
});
 