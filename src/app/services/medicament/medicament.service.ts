import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Medicament } from 'src/app/models/Medicament';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/common/global-constants';

const baseUrl = `${GlobalConstants.apiURL}medicament/medicaments`;
@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(baseUrl).pipe(catchError(this.errorHandler));
  }

  get(id): Observable<Medicament> {
    return this.http.get<Medicament>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(data): Observable<Medicament> {
    return this.http.post<Medicament>(baseUrl, data).pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<Medicament> {
    return this.http.put<Medicament>(`${baseUrl}/${id}`, data).pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<Medicament> {
    return this.http.delete<Medicament>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl).pipe(catchError(this.errorHandler));
  }

  findByName(name): Observable<Medicament> {
    return this.http.get<Medicament>(`${baseUrl}?title=${name}`).pipe(catchError(this.errorHandler));
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
