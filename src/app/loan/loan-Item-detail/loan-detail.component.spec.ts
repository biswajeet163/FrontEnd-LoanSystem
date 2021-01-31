import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { LoanService } from '../loan.service';

import { LoanDetailComponent } from './loan-detail.component';
import { LoanDetailService } from './loan-detail.service';


class RouterStub { 
  navigate(params) {

  }
}

class ActivatedRouterStub {
  params: Observable<any> = EMPTY;
}
 

fdescribe('LoanDetailComponent', () => {
  let component: LoanDetailComponent;
  let fixture: ComponentFixture<LoanDetailComponent>;
  let router: Router;
  let spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [LoanDetailComponent],
      providers: [
        GlobalService,
        LoanService,
        LoanDetailService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouterStub }


      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spy = spyOn(router, 'navigate');

  }); 

  it('should create', () => { 
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onModify(); 
    expect(spy).toHaveBeenCalled();

  }); 
 
});
