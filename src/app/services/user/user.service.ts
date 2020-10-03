import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { catchError } from 'rxjs/operators';

const baseUrl = `${GlobalConstants.apiURL}user/users`;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl).pipe(catchError(this.errorHandler));
  }

  get(id): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(data): Observable<User> {
    return this.http.post<User>(baseUrl, data).pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<User> {
    return this.http.put<User>(`${baseUrl}/${id}`, data).pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<User> {
    return this.http.delete<User>(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl).pipe(catchError(this.errorHandler));
  }

  findByName(name): Observable<User> {
    return this.http.get<User>(`${baseUrl}?title=${name}`).pipe(catchError(this.errorHandler));
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
