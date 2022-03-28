import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from "../order.service";
import { HttpService } from "../http.service";
import { Subscription, Observable } from 'rxjs';
import { CarModel } from "../model/model";
import { CarService } from "../details/car-service/car-service";
import { Rate } from '../details/rate/rate';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit{

  subscription: Subscription;
  modelIdSub: Subscription;
  modelNameSub: Subscription;
  colorSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  rateSub: Subscription;
  serviceSub: Subscription;
  point: string | null = null;
  modelId: string = '';
  carModel: CarModel | null = null;
  color: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
  services: CarService[] = [];
  rate: Rate | null = null;

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
    this.colorSub = orderService.color$.subscribe(
      color => {
        if(color) {
          this.color = color;
        }
    });
    this.startDateSub = orderService.start$.subscribe(
      start => {
        if(start) {
          this.start = start;
        }
    });
    this.endDateSub = orderService.end$.subscribe(
      end => {
        if(end) {
          this.end = end;
        }
    });
    this.serviceSub = orderService.service$.subscribe(
      services => {
        if(services) {
          this.services = services;
        }
    });
    this.rateSub = orderService.rate$.subscribe(
      rate => {
        if(rate) {
          this.rate = rate;
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
    this.modelIdSub.unsubscribe();
    this.modelNameSub.unsubscribe();
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
    this.serviceSub.unsubscribe();
    this.rateSub.unsubscribe();
  }

}
