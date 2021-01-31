import { Loan } from "./loan";
import { LoanService } from "./loan.service";



fdescribe('LoanaDetailService', () => {
    let service: LoanService;

    beforeEach(() => {
        //TestBed.configureTestingModule({});

        service = new LoanService();
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('It should set Loan Item Detail', () => {
        // Arrange
        let loan = new Loan(1,
            "Biswa", "Car", 
            "Short", 10000000, 
            new Date(),
            new Date()
        );
        // Act
        service.setLoanItemDetail(loan);
        // Assert
        expect(service['showLoan'].memberName).toEqual('Biswa');
    });

    it('Getting  Loan Item', () => {
        // Arrange
        service['showLoan'] = new Loan(1,
            "Rohit", "Home", 
            "Short", 1000,
            new Date(),
            new Date()
        ); 
        // Act
        let LoanItem = service.getLoanItemDetail();
        // Assert
        expect(LoanItem.memberName).toEqual("Rohit");

    })

 

    it('It should Update Loan Item ', () => {
        // Arrange
        let loanUpdate = new Loan(1,
            "Biswas", "Car",
            "Short", 10000000,
            new Date(),
            new Date()
        );
        // Act
        service.setUpdateLoan(loanUpdate);
        // Assert
        expect(service['updateLoan'].memberName).toEqual('Biswas');
    });

   


    it('Getting  Updated Loan Item', () => {
        // Arrange
        service['updateLoan'] = new Loan(1,
            "Biswa", "Car",
            "Short", 100,
            new Date(),
            new Date()
        );
        // Act
        let LoanItem = service.getUpdateLoan();
        // Assert
        expect(LoanItem.memberName).toEqual("Biswa");

    })

});   