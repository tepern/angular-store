import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpService } from "../http.service";
import { OrderService } from "../order.service";
import { CarModel } from "../model/model";
import { OrderStatus, Order } from "../order";
import { Rate } from "../details/rate/rate";
import { City } from "../location/city";
import { Point } from "../location/point";
import { CarService } from "../details/car-service/car-service";
import { OrderDataComponent } from "../order-data/order-data.component";

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {
  carModel: CarModel | null = null; 
  point: Point | null = null;
  city: City | null = null;
  //carId: string = '600fe367ad015e0bb6997d5d';
  modelSub: Subscription;
  pointSub: Subscription;
  citySub: Subscription;
  colorSub: Subscription;
  serviceSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  rateSub: Subscription;
  costSub: Subscription;
  color: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
  services: CarService[] = [];
  rate: Rate | null = null;
  cost: number | bigint | null = null;
  order: Order | null = null;

  constructor(public httpService: HttpService, private orderService: OrderService) {
    this.modelSub = orderService.modelName$.subscribe(
      carModel => {
        if(carModel) {
          this.carModel = carModel;
        }
    });
    this.pointSub = orderService.pointId$.subscribe(
      point => {
        if(point) {
          this.point = point;
        }
    });
    this.citySub = orderService.cityId$.subscribe(
      city => {
        if(city) {
          this.city = city;
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
    this.costSub = orderService.cost$.subscribe(
      cost => {
        if(cost) {
          this.cost = cost;
        }
    });
  }

  ngOnInit(): void {
    
  }

  submitOrder(): void {
    const orderStatus = new OrderStatus("Новые","5e26a191099b810b946c5d89");
    if(this.city && this.point && this.carModel && this.color && this.start && this.end && this.rate && this.cost && this.services.length>0) {
      const end = new Date(this.end);
      const start = new Date(this.start);
      const order = new Order(
      orderStatus,
      this.city,
      this.point,
      this.carModel,
      this.color,
      start.getTime(),
      end.getTime(),
      this.rate,
      this.cost,
      this.services[0].checked,
      this.services[1].checked,
      this.services[2].checked
      );
      this.order = order;
    } else if(this.city && this.point && this.carModel && this.color && this.start && this.end && this.rate && this.cost) {
      const end = new Date(this.end);
      const start = new Date(this.start);
      const order = new Order(
      orderStatus,
      this.city,
      this.point,
      this.carModel,
      this.color,
      start.getTime(),
      end.getTime(),
      this.rate,
      this.cost,
      false,false,false
      );
      this.order = order;
    } 
    
    console.log(this.order);
    if(this.order) {
      this.httpService.submitOrder(this.order).subscribe(order => {this.order = order});
    }
  }

  ngOnDestroy(): void {
    this.modelSub.unsubscribe();
    this.pointSub.unsubscribe();
    this.colorSub.unsubscribe();
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
    this.rateSub.unsubscribe();
    this.costSub.unsubscribe();
    this.serviceSub.unsubscribe();
  }

}
