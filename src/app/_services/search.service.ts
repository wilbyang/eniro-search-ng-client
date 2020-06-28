import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {ISearchResult} from '../_models/index.dto';
import {Company, SearchResult} from '../_models/index.domain';
import {DomainDTOConverter} from '../_helpers/domain-dto.converter';



@Injectable({
  providedIn: 'root'
})
export class SearchService {
  currentErrorMsg: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http: HttpClient) { }
  search(query: string): Observable<SearchResult> {
    const base64 = window.btoa(`${environment.user}:${environment.key}`);
    const httpOptions = {
      params: {
        query,
        sources: ['COMPANY']
      },
      headers: new HttpHeaders({
        Authorization: `Basic ${base64}`
      })
    };
    return this.http.get<ISearchResult>(`${environment.baseUrl}`, httpOptions)
      .pipe(
        map(iSearchResult => {
          return DomainDTOConverter.fromDto<SearchResult>(SearchResult, iSearchResult);
        }),
        tap(_ => this.log('fetched rooms')),
        catchError(this.handleError('', null))
      );
  }
  searchMock(query: string): Observable<SearchResult> {
    return this.http.get<ISearchResult>('api')
      .pipe(
        map(iSearchResult => {
          return DomainDTOConverter.fromDto<SearchResult>(SearchResult, iSearchResult);
        }),
        tap(_ => this.log('fetched rooms')),
        catchError(this.handleError('', null))
      );
  }


  private log(s: string) {
    console.log(s);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.currentErrorMsg.next(error.error.message); // log to console instead

      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
