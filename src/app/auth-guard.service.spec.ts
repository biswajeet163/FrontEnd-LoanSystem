import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';


class RouterStub {
  navigate(params) {

  }  
}


fdescribe('AuthGuardService', () => { 
  let service: AuthGuardService;
  let router: Router;
  let spy;

  


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: Router, useClass: RouterStub },
      ]
  });
  router = TestBed.inject(Router);
  spy = spyOn(router, 'navigate');
  service = TestBed.inject(AuthGuardService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }); 

  it('should be a Admin Move', () => {
    localStorage.setItem('role','admin');
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;
    expect(service.canActivate(route, state)).toBe(true);
  });

  it('should be a User Move', () => {
    localStorage.setItem('role','user');
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;
    expect(service.canActivate(route, state)).toBe(false);
  });





//   it('be able to hit route when user is logged in', () => {
//     storageService.isLoggedIn = true;
//     expect(loggedInGuard.canActivate()).toBe(true);
// });

// it('not be able to hit route when user is not logged in', () => {
//     storageService.isLoggedIn = false;
//     expect(loggedInGuard.canActivate()).toBe(false);
// });



  
});
