import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { CarModel } from './model/model';
import { Rate } from './details/rate/rate';
import { City } from './location/city';
import { Point } from './location/point';
import { Order } from './order';
import { CarService } from "./details/car-service/car-service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public error$: Subject<string | string[]> = new Subject<string | string[]>();

  constructor(private http: HttpClient) {
  }

  getCarsModels(page: number, limit: number, filter?: string):Observable<CarModel[]> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<CarModel[]>(environment.apiUrl + 'api/db/car?page=' + (page-1) + '&limit=' + limit, {headers: apiHeaders})
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

    return this.http.get<CarModel>(environment.apiUrl + 'api/db/car/' + id, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  getRate(id: string):Observable<Rate> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Rate>(environment.apiUrl + 'api/db/rate/' + id, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  getRates():Observable<Rate[]> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Rate[]>(environment.apiUrl + 'api/db/rate', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }

  getCity():Observable<City[]> {
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<City[]>(environment.apiUrl + 'api/db/city', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));
  }

  getPoint():Observable<Point[]> {
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Point[]>(environment.apiUrl + 'api/db/point', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));
  }

  getCarCount():Observable<number> {
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<number>(environment.apiUrl + 'api/db/car', {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["count"];
    }))
    .pipe(catchError(this.handleError.bind(this)));
  }

  submitOrder(order: Order): Observable<Order>{
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey).set('Content-Type', 'application/json');

    return this.http.post<Order>(environment.apiUrl + 'api/db/order/', order, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(
      catchError(this.handleError.bind(this))
    );  
  }

  updateOrder(order: Order): Observable<Order>{
    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey).set('Content-Type', 'application/json');
    
    return this.http.put<Order>(environment.apiUrl + 'api/db/order/' + order.id, order, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(
      catchError(this.handleError.bind(this))
    );  
  }

  getOrder(id: string):Observable<Order> {

    const apiHeaders = new HttpHeaders().set('X-Api-Factory-Application-Id', environment.apiKey);

    return this.http.get<Order>(environment.apiUrl + 'api/db/order/' + id, {headers: apiHeaders})
    .pipe(map((data:any) => {
      return data["data"];
    }))
    .pipe(catchError(this.handleError.bind(this)));      
  }
}
