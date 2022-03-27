import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

 // private pointSource = new Subject<string>();

  public point$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  getPoint(point: string) {
    this.point$.next(point);
  }
}
