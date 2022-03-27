import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from "../order.service";
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent {

  //point$: Observable<string>;
  subscription: Subscription;
  point: string | null = null;

  constructor(private orderService: OrderService) {
    this.subscription = orderService.point$.subscribe(
      point => {
        this.point = point;
        console.log(this.point);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
