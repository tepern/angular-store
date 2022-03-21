import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { CarModel } from './model/model';
import { Rate } from './details/rate/rate';
import { City } from './location/city';
import { Point } from './location/point';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public error$: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {
  }

  getCarsModels(page: number, limit: number):Observable<CarModel[]> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<CarModel[]>('http://localhost:4200/api/db/car?page=' + (page-1) + '&limit=' + limit, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  private handleError(errors: HttpErrorResponse) {
    const {message, error} = errors;
    return throwError(errors);
  }

  getCarModel(id: string):Observable<CarModel> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<CarModel>('http://localhost:4200/api/db/car/' + id, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  getRate(id: string):Observable<Rate> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Rate>('http://localhost:4200/api/db/rate/' + id, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  getRates():Observable<Rate[]> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Rate[]>('http://localhost:4200/api/db/rate', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  getCity():Observable<City[]> {
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<City[]>('http://localhost:4200/api/db/city', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));
  }

  getPoint():Observable<Point[]> {
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Point[]>('http://localhost:4200/api/db/point', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));
  }
}
