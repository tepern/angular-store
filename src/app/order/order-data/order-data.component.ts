import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from "../order.service";
import { HttpService } from "../http.service";
import { Subscription, Observable } from 'rxjs';
import { CarModel } from "../model/model";

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit{

  subscription: Subscription;
  modelIdSub: Subscription;
  modelNameSub: Subscription;
  point: string | null = null;
  modelId: string = '';
  carModel: CarModel | null = null;

  constructor(private orderService: OrderService, public httpService: HttpService) {
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
    this.modelNameSub = orderService.modelName$.subscribe(
      carModel => {
        if(carModel) {
          this.carModel = carModel;
        }
    });
  }

  ngOnInit(): void {
    this.httpService.getCarModel(this.modelId).subscribe((data: CarModel) => {
      this.carModel = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
