import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Ordonnance } from 'src/app/models/Ordonnance';
import { catchError } from 'rxjs/operators';

const baseUrl = `${GlobalConstants.apiURL}ordonnances`;
@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Ordonnance[]> {
    return this.http.get<Ordonnance[]>(baseUrl).pipe(catchError(this.errorHandler));
  }

  get(id): Observable<Ordonnance> {
    return this.http.get<Ordonnance>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }
  getByPatientId(id): Observable<Ordonnance[]> {
    return this.http.post<Ordonnance[]>(`${baseUrl}/patient`,id).pipe(catchError(this.errorHandler));
  }
  getByMedecinIdAndEtat(params): Observable<Ordonnance[]> {
    return this.http.post<Ordonnance[]>(`${baseUrl}/medecin`,params).pipe(catchError(this.errorHandler));
  }

  create(data): Observable<Ordonnance> {
    return this.http.post<Ordonnance>(baseUrl, data).pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<Ordonnance> {
    return this.http.put<Ordonnance>(`${baseUrl}/${id}`, data).pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<Ordonnance> {
    return this.http.delete<Ordonnance>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl).pipe(catchError(this.errorHandler));
  }

  findByName(name): Observable<Ordonnance> {
    return this.http.get<Ordonnance>(`${baseUrl}?title=${name}`).pipe(catchError(this.errorHandler));
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
