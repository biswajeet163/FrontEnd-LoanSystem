
export class Loan{
    
    constructor(
        public loanNumber: number,
        public memberName: String,
        public loanType: String,
        public loanTerm: String,
        public amount: number,
        public originDate: Date,
        public endDate: Date        
    ){}
 
 
}    