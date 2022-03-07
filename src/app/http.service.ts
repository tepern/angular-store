import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { Model } from './model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public error$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getData():Observable<Model[]> {
        
    const $data = fetch('http://localhost:4200/api/db/car?page=2&limit=20',
      {
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
        },
        method: 'GET', // GET, POST, PUT, DELETE
      }

    ).then(response => {
        if (response.status !=200) {
          return null;
        } else {
          return response.json();
        }
      },
      failResponse => {
        catchError(this.handleError.bind(this));
        return null;
    });
    
    return from($data).pipe(map((data:any) => {
      return data["data"];
    }));
  }

  private handleError(errors: HttpErrorResponse) {
    const {message, error} = errors;
    console.log(throwError(errors));
    return throwError(errors);
  }
}
