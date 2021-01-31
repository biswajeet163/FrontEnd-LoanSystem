import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
}) 
export class HeaderService {  

  searchBy = new Subject<String>();

  constructor() { } 

  searchByFirstName(value: String) {  
    this.searchBy.next("firstName " + value);
  }   
 
  searchByLastName(value: String) {
    this.searchBy.next("lastName " + value); 
  } 

  searchByLoanNumber(value: number) {
    var str_value = value.toString();
    this.searchBy.next("loanNumber " + str_value);
  }

}
