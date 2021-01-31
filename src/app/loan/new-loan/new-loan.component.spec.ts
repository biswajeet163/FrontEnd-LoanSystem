import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../loan';

import { NewLoanComponent } from './new-loan.component';

class RouterStub {
    navigate(params) {

    }
}

class ActivatedRouterStub {
    params: Observable<any> = EMPTY;
}

fdescribe('NewLoanComponent', () => {
    let component: NewLoanComponent;
    let fixture: ComponentFixture<NewLoanComponent>;
    let service: GlobalService;
    let router: Router;
    let spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [NewLoanComponent],
            providers: [
                GlobalService,
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouterStub }

            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewLoanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(GlobalService);
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Back Event', () => {
        let newLoan = new Loan(1, "biswa", "Car", "Short", 1000, new Date(), new Date());

        component.newLoanForm.setValue(newLoan);

        spy = spyOn(router, 'navigate');

        component.onBack();
 
        expect(spy).toHaveBeenCalled(); 

    }); 

    it('Create the New Loan', () => {
        let newLoan = new Loan(1, "biswa", "Car", "Short", 1000, new Date(), new Date());

        component.newLoanForm.setValue(newLoan);

        spy = spyOn(service, 'createNewLoan').and.returnValue(of(newLoan));

        component.onSubmit();

        expect(spy).toHaveBeenCalled(); 

    });


    it('error Occured while creating New LOan', () => {
        //const xService = fixture.debugElement.injector.get(SomeService);
        //const mockCall = spyOn(service, 'createNewLoan').and.returnValue(Observable.);
    });

});
     