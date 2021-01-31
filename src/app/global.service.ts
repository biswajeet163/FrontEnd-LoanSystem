import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Loan } from './loan/loan';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  headerSearchEvent = new Subject<boolean>();
  loggedUser = new Subject<boolean>();

  getLoanList(): Observable<Loan[]> {
    let httpParams = new HttpParams().set('clientType', localStorage.getItem('clientType'));
    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { params: httpParams, headers: httpHeaders };

    return this.http.get<Loan[]>(
      'http://localhost:8100/loans/getloan', options
    );
  }

  createNewLoan(newloan: Loan): Observable<Loan> {
    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { headers: httpHeaders };
    return this.http.post<Loan>(
      'http://localhost:8100/loans/addnewloan', newloan, options
    );
  }

  deleteLoanItem(loanDeleteId: string): Observable<String> {
    let httpParams = new HttpParams().set('id', loanDeleteId);
    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { params: httpParams, headers: httpHeaders };

    return this.http.delete<String>(
      'http://localhost:8100/loans/delete', options
    );
  }

  modifyLoanItem(updatedLoan: Loan): Observable<String> {
    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { headers: httpHeaders };
    return this.http.put<String>(
      'http://localhost:8100/loans/update', updatedLoan, options
    );
  }

  ////////////////////////////////////

  getLoanListByFirstName(firstname: string): Observable<Loan[]> {
    let httpParams = new HttpParams().set('firstname', firstname);
    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { params: httpParams, headers: httpHeaders }

    return this.http.get<Loan[]>(
      'http://localhost:8100/loans/getloan/firstname', options
    );
  }

  getLoanListByLastName(lastname: string): Observable<Loan[]> {
    let httpParams = new HttpParams().set('lastname', lastname);
    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { params: httpParams, headers: httpHeaders }

    return this.http.get<Loan[]>(
      'http://localhost:8100/loans/getloan/lastname', options
    );
  }

  // getLoanListByLoanNumbers(loannumber: string): Observable<Loan[]> {

  //   let httpParams = new HttpParams().set('loannumber', loannumber);
  //   let option = { params: httpParams };

  //   return this.http.get<Loan[]>(
  //     'http://localhost:8100/loans/getloan/loannumber', option
  //   );
  // }


  getLoanListByLoanNumber(loannumber: string): Observable<Loan[]> {

    let httpParams = new HttpParams();//.set('clientType', localStorage.getItem('clientType'));
    httpParams = httpParams.append('clientType', localStorage.getItem('clientType'));
    httpParams = httpParams.append('loannumber', loannumber);

    const httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    let options = { params: httpParams, headers: httpHeaders };


    return this.http.get<Loan[]>(
      'http://localhost:8100/loans/getloan/loannumber', options
    );
  }

}
