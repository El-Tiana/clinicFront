import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Fiche } from 'src/app/models/Fiche';
import { catchError } from 'rxjs/operators';

const baseUrl = `${GlobalConstants.apiURL}ficheMalades`;
@Injectable({
  providedIn: 'root'
})
export class FicheService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Fiche[]> {
    return this.http.get<Fiche[]>(baseUrl).pipe(catchError(this.errorHandler));
  }
  getByUserId(patient): Observable<Fiche[]> {
    return this.http.post<Fiche[]>(`${baseUrl}/user`,patient).pipe(catchError(this.errorHandler));
  }
  getByDoctorId(id): Observable<Fiche[]> {
    return this.http.get<Fiche[]>(`${baseUrl}/doctor/${id}`).pipe(catchError(this.errorHandler));
  }

  get(id): Observable<Fiche> {
    return this.http.get<Fiche>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(data): Observable<Fiche> {
    return this.http.post<Fiche>(baseUrl, data).pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<Fiche> {
    return this.http.put<Fiche>(`${baseUrl}/${id}`, data).pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<Fiche> {
    return this.http.delete<Fiche>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl).pipe(catchError(this.errorHandler));
  }

  findByName(name): Observable<Fiche> {
    return this.http.get<Fiche>(`${baseUrl}?title=${name}`).pipe(catchError(this.errorHandler));
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
