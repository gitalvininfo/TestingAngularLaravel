import { Expense } from './../model/expense.model';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExpensestableService {
  result: any;
  private baseUrl = 'http://localhost:8000/api/';
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    }
    else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service.');
  }


  LoginUser = (localStorage.getItem("token"));

  reqHeader: any = new HttpHeaders({
    Authorization: "Bearer " + this.LoginUser
  });

  constructor(private http: HttpClient) { }

  //get all list of expenses
  getExpenses(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/expenses', { headers: this.reqHeader })
      .pipe(catchError(this.handleError));
  }

  //store expense
  storeExpense(Expense): Promise<any> {
    return this.http.post(this.baseUrl + 'expense', Expense, { headers: this.reqHeader }).toPromise();
  }

  // show specific expense
  showExpense(id: number): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}expense/${id}`, { headers: this.reqHeader }).toPromise();
  }

  //edit specific expense
  editExpense(id: number, Expense): Promise<any> {
    return this.http.put<any>(`${this.baseUrl}expense/${id}`, Expense, { headers: this.reqHeader }).toPromise();
  }

  //delete specific expense
  deleteExpense(id: number): Promise<any> {
    return this.http.delete(`${this.baseUrl}expense/${id}`, { headers: this.reqHeader }).toPromise();
  }


  sessionStorageExists() {
    return localStorage.getItem("token") ? true : false;
  }

  getLoginUserKey() {
    if (this.sessionStorageExists()) {
      return this.reqHeader.key;
    }
  }

  // getLatest() {
  //   return this.http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
  //     headers: {
  //       'X-CMC_PRO_API_KEY': 'df191ae4-14b8-46aa-bb70-2efd391854c5',
  //       Authorization: "Bearer " + this.LoginUser
  //     }
  //   });
  // }

  getCrypto() {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS,IOT&tsyms=USD', { headers: this.reqHeader })
    // .map(result => this.result = result)
  }


}


