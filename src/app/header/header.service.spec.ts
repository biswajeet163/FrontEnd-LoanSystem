import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service'; 

fdescribe('HeaderService', () => {
  let service: HeaderService; 

  beforeEach(() => {  
    TestBed.configureTestingModule({}); 
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {  
    expect(service).toBeTruthy(); 
  }); 

  it('Setting Value FIRST NAME using next() of Subject for Search Key', () => {
    const nextSpy = spyOn(service.searchBy, 'next');

    // Act
    service.searchByFirstName('test');

    // Assert
    expect(nextSpy).toHaveBeenCalled();
  });

  it('Serring Value LAST NAME using next() of Subject for Search Key', () => {
    const nextSpy = spyOn(service.searchBy, 'next');

    // Act
    service.searchByLastName('test');

    // Assert
    expect(nextSpy).toHaveBeenCalled();
  });
 
  it('Serring Value LOAN NUMBER using next() of Subject for Search Key', () => {
    const nextSpy = spyOn(service.searchBy, 'next');

    // Act
    service.searchByLoanNumber(10);
 
    // Assert
    expect(nextSpy).toHaveBeenCalled();
  });

});
 