import { Component, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgModel} from '@angular/forms';
import { MapComponent } from './map/map.component';
import { OrderDataComponent } from "../order-data/order-data.component";
import { OrderService } from "../order.service";
import { Subscription, timeout } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  
  subscription: Subscription;
  point: string | null = null;

  constructor(private orderService: OrderService) {
    this.subscription = orderService.point$.pipe(timeout({ first: 7_000, each: 5_000 })).subscribe(
      point => {
        this.point = point;
    });
  }

  @Output() tab = new EventEmitter<string>();

  nextTab(tab: string) {
    this.tab.emit(tab);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
