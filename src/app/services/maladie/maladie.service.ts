import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Maladie } from 'src/app/models/Maladie';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/common/global-constants';

const baseUrl = `${GlobalConstants.apiURL}maladie/maladies`;
@Injectable({
  providedIn: 'root'
})
export class MaladieService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Maladie[]> {
    return this.http.get<Maladie[]>(baseUrl).pipe(catchError(this.errorHandler));
  }

  get(id): Observable<Maladie> {
    return this.http.get<Maladie>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(data): Observable<Maladie> {
    return this.http.post<Maladie>(baseUrl, data).pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<Maladie> {
    return this.http.put<Maladie>(`${baseUrl}/${id}`, data).pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<Maladie> {
    return this.http.delete<Maladie>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl).pipe(catchError(this.errorHandler));
  }

  findByName(name): Observable<Maladie> {
    return this.http.get<Maladie>(`${baseUrl}?title=${name}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }
}
