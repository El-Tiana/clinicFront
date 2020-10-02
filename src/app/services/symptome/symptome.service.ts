import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Symptome } from 'src/app/models/Symptome';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/common/global-constants';

const baseUrl = `${GlobalConstants.apiURL}symptome/symptomes`;

@Injectable({
  providedIn: 'root'
})

export class SymptomeService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Symptome[]> {
    return this.http.get<Symptome[]>(baseUrl).pipe(catchError(this.errorHandler));
  }

  get(id): Observable<Symptome> {
    return this.http.get<Symptome>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(data): Observable<Symptome> {
    return this.http.post<Symptome>(baseUrl, data).pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<Symptome> {
    return this.http.put<Symptome>(`${baseUrl}/${id}`, data).pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<Symptome> {
    return this.http.delete<Symptome>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl).pipe(catchError(this.errorHandler));
  }

  findByName(name): Observable<Symptome> {
    return this.http.get<Symptome>(`${baseUrl}?title=${name}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

  }
}
