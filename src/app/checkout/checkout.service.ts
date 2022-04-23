import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Order } from '../order/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public order$: Subject<Order> = new Subject<Order>();


  setOrder(order: Order) {
    this.order$.next(order);
  }
}
