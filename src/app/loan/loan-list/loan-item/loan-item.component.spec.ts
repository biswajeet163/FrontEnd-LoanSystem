import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Loan } from '../../loan';


import { LoanItemComponent } from './loan-item.component'; 
import { LoanItemService } from './loan-item.service';

class RouterStub {
  navigate(params) {

  } 
} 

class ActivatedRouterStub{
  params: Observable<any>= EMPTY; 
}

fdescribe('LoanItemComponent', () => {
  let component: LoanItemComponent; 
  let fixture: ComponentFixture<LoanItemComponent>;
  let service: GlobalService;
  let loanItemService: LoanItemService;
  let router: Router;
  let spy;  
   
  beforeEach(async () => { 
    await TestBed.configureTestingModule({  
      imports:[HttpClientModule],
      declarations: [ LoanItemComponent ],
      providers:[GlobalService,
         LoanItemService,
         { provide: Router, useClass: RouterStub },
         { provide: ActivatedRoute, useClass: ActivatedRouterStub }
        ] 
    })
    .compileComponents();
  }); 

  beforeEach(() => { 
    fixture = TestBed.createComponent(LoanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(GlobalService); 
    loanItemService = TestBed.inject(LoanItemService); 
    router = TestBed.inject(Router);
  });
  
  it('should create xxx', () => {
    expect(component).toBeTruthy();  
  });

  // it('onSelect', () => {
  //   spy = spyOn(router, 'navigate');

  //   component.onSelect();

  //   expect(spy).toHaveBeenCalled(); 
   
    
  // });
 

 
  


});
