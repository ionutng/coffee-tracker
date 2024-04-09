import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, catchError, of } from 'rxjs';
import { Record } from './record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiURL = 'https://localhost:7245/api/records';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getRecords(): Observable<Record[]> {
    return this.httpClient.get<Record[]>(this.apiURL)
      .pipe(
        catchError(this.handleError<Record[]>('getRecords', []))
      );
  }

  getRecord(id: number): Observable<Record> {
    return this.httpClient.get<Record>(`${this.apiURL}/${id}`)
      .pipe(
        catchError(this.handleError<Record>(`getRecord id=${id}`))
      );
  }

  addRecord(record: Record): Observable<Record> {
    return this.httpClient.post<Record>(this.apiURL, record, this.httpOptions)
      .pipe(
        catchError(this.handleError<Record>('addRecord'))
      );
  }

  updateRecord(record: Record): Observable<any> {
    return this.httpClient.put(this.apiURL, record, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateRecord'))
      );
  }

  deleteRecord(id: number): Observable<Record> {
    return this.httpClient.delete<Record>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Record>('deleteRecord'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
