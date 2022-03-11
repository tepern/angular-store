import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { Model } from './model/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public error$: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {
  }

  getData(page: number, limit: number):Observable<Model[]> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', '5e25c641099b810b946c5d5b');

    return this.http.get<Model[]>('http://localhost:4200/api/db/car?page=' + (page-1) + '&limit=' + limit, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  private handleError(errors: HttpErrorResponse) {
    const {message, error} = errors;
    return throwError(errors);
  }
}
