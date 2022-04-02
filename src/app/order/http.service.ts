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
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getCarsModels(page: number, limit: number, filter?: string):Observable<CarModel[]> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<CarModel[]>('http://localhost:4200/api/db/car?page=' + (page-1) + '&limit=' + limit, {headers: apiHeaders})
    .pipe(map((data:any) => {
      const carModels = data["data"];
      if(filter && filter!="Все модели") {
        const models = carModels.filter((item: CarModel) => {
          return (item.categoryId.name.indexOf(filter)>-1 || item.categoryId.name.indexOf(filter.toLowerCase())>-1);
        });
        return models;
      } else {
        return carModels;
      }
      
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  private handleError(errors: HttpErrorResponse) {
    const { error, message } = errors;

    if (error) {
      this.error$.next('Не удалось загрузить данные');
    } else if (message) {
      this.error$.next(message);
    }

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

  getCarCount():Observable<number> {
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<number>('http://localhost:4200/api/db/car', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["count"];
    }))
    .pipe(catchError(this.handleError.bind(this)));
  }
}
