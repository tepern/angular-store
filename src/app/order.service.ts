import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private pointSource = new Subject<string>();

  point$ = this.pointSource.asObservable();

  constructor() { }

  getPoint(point: string) {
    this.pointSource.next(point);
  }
}
