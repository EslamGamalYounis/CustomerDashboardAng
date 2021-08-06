import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './../classes/Customer';
import { Observable } from "rxjs";
import { PaginatedResult } from '../classes/Pagination';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerPaginationService {

  customers:Customer[];
  constructor(private httpClient: HttpClient) { }

  getCustomers(searchQuery?: string, pageNumber?, pageSize?): Observable<PaginatedResult<Customer[]>> {

    const paginatedResults: PaginatedResult<Customer[]> = new PaginatedResult<Customer[]>();

    let params = new HttpParams();

    if (searchQuery != null && searchQuery.trim() != '') {
      params = params.append('searchQuery', searchQuery);
    }

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return this.httpClient.get<Customer[]>(
      "http://localhost:51329/api/customer",
      { responseType: "json", observe: 'response', params })
      .pipe(
        map(res => {
        paginatedResults.result = res.body;
        if (res.headers.get('X-Pagination') != null) {
          paginatedResults.pagination = JSON.parse(res.headers.get('X-Pagination'))
        }
        return paginatedResults;
      }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error: ', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
  }
}
