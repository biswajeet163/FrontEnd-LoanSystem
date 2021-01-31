import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalService } from '../global.service';
import { LoanDetailService } from '../loan/loan-Item-detail/loan-detail.service';
import { LoginService } from '../login/login.service';

import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';


class RouterStub {
    navigate(params) {

    }
}

class ActivatedRouterStub {
    params: Observable<any> = EMPTY;
}


fdescribe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let globalService: GlobalService;
    let headerService: HeaderService;
    let router: Router;
    let spy; 


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [HeaderComponent],
            providers: [
                GlobalService,
                LoanDetailService, 
                HeaderService,
                LoginService,
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouterStub }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        headerService: TestBed.inject(HeaderService); 
        router = TestBed.inject(Router);
        spy = spyOn(router, 'navigate');
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should Logout ', () => {
        component.onLogout();
        //expect(component).toHaveBeenCalled(); 
    });

    it('should create New Loan', () => {
        component.onCreateNewLoan();
        //expect(component).toHaveBeenCalled(); 
    });

    xit('Header Unsubscribe', () => {

        let spy = globalService.headerSearchEvent.next();

        expect(spy).toHaveBeenCalled();
    });

    it('On Submit By First Name', () => {
        const firstForm = component.searchDataByFirstNameForm;
        component.searchDataByFirstNameForm.setValue({ firstName: 'Biswajeet' });
        expect(firstForm.valid).toBeTruthy();

        //spy = spyOn(headerService, 'searchByFirstName').and.returnValue();

        component.onSubmitByFirstName();
        expect(firstForm.reset).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
    });

    it('On Submit By Last Name', () => {
        const lastForm = component.searchDataByLastNameForm;
        component.searchDataByLastNameForm.setValue({ lastName: 'Mandal' });
        expect(lastForm.valid).toBeTruthy();

        //spy = spyOn(headerService, 'searchByFirstName').and.returnValue();

        component.onSubmitByLastName();
        expect(lastForm.reset).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled(); 
    });

    it('On Submit By Loan Number', () => {
        const loanForm = component.searchDataByLoanNumberForm;
        component.searchDataByLoanNumberForm.setValue({ loanNumber: 10});
        expect(loanForm.valid).toBeTruthy();

        //spy = spyOn(headerService, 'searchByFirstName').and.returnValue();

        component.onSubmitByLoanNumber();
        expect(loanForm.reset).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
    });

});

