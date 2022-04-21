import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LocationComponent } from './location/location.component';
import { ModelComponent } from './model/model.component';
import { HttpService } from "./http.service";
import { OrderService } from "./order.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  tab: string = 'location';
  point: string | null = null;
  modelId: string | null = null;
  cost: number | bigint | null = null;
  subscription: Subscription;
  modelIdSub: Subscription;
  costSub: Subscription;

  constructor(private orderService: OrderService) {
     this.subscription = orderService.point$.subscribe(
      point => {
        this.point = point;
    });
    this.modelIdSub = orderService.modelId$.subscribe(
      id => {
        if(id) {
          this.modelId = id;
        }
    });
    this.costSub = orderService.cost$.subscribe(
      cost => {
        this.cost = cost;
    });
  }

  ngOnInit(): void {
  }

  tabs(tab: string): void {
    this.tab = tab;
  }

  ngOnDestroy(): void {
    this.modelIdSub.unsubscribe();
    this.subscription.unsubscribe();
    this.costSub.unsubscribe();
  }

}
