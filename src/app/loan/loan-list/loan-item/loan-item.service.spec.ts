import { inject, TestBed } from '@angular/core/testing';
import { LoanItemService } from './loan-item.service';

describe('LoanItemService', () => {
  let service: LoanItemService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanItemService]
    });
    service = TestBed.inject(LoanItemService);
  });

 
  it('Show Loan Item', () => {
    // Arrange
    const nextSpy = spyOn(service.showItemDetail, 'next');

    // Act
    service.showItem('test');

    // Assert
    expect(nextSpy).toHaveBeenCalled();
 
  })

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });

  //...
})