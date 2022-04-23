import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from "../order.service";
import { HttpService } from "../http.service";
import { CheckoutService } from "../../checkout/checkout.service";
import { Subscription, Observable } from 'rxjs';
import { CarModel } from "../model/model";
import { CarService } from "../details/car-service/car-service";
import { carAllService } from "../details/car-service/carAllservice";
import { Rate } from '../details/rate/rate';
import { Duration } from './duration';
import { CostPipe } from '../cost.pipe';
import { Order } from '../order';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent {

  subscription: Subscription;
  modelIdSub: Subscription;
  modelNameSub: Subscription;
  colorSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  rateSub: Subscription;
  serviceSub: Subscription;
  orderSub: Subscription;
  point: string | null = null;
  modelId: string = '';
  carModel: CarModel | null = null;
  color: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
  services: CarService[] = [];
  rate: Rate | null = null;
  order: Order | null = null;

  constructor(private orderService: OrderService, public httpService: HttpService, public checkoutService: CheckoutService) {
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
        this.color = color;
    });
    this.startDateSub = orderService.start$.subscribe(
      start => {
        this.start = start;
    });
    this.endDateSub = orderService.end$.subscribe(
      end => {
        this.end = end;
    });
    this.serviceSub = orderService.service$.subscribe(
      services => {
        if(services) {
          this.services = services;
        }
    });
    this.rateSub = orderService.rate$.subscribe(
      rate => {
        this.rate = rate;
    });
    this.orderSub = checkoutService.order$.subscribe(
      order => {
        if(order) {
          this.services = carAllService;
          this.services[0].checked = order.isFullTank;
          this.services[1].checked = order.isNeedChildChair
          this.services[2].checked = order.isRightWheel
          this.point = order.cityId.name + ', ' + order.pointId.address;
          this.carModel = order.carId;
          this.modelId = order.carId.id;
          this.rate = order.rateId;
          this.color = order.color;
          if(order.dateFrom) {
            this.start = new Date(order.dateFrom);
          }
          if(order.dateTo) {
            this.end = new Date(order.dateTo); 
          }
        }
    });
  }

  public get duration() {
    return this.getDuration();
  }

  public get cost() {
    return this.getCost();
  }

  getDuration(): Duration | null {
    if(this.start && this.end) {
      let duration = new Duration();
      const start = new Date(this.start);
      const end = new Date(this.end);
      const msec = end.getTime() - start.getTime();
      if(msec > 0) {
        const minutes = msec/1000/60;
        duration.minutes = Math.trunc(minutes);
        duration.hours = Math.trunc(minutes/60);
        duration.days = Math.trunc(minutes/60/24);
        return duration;
      } else return null;
    } else return null;
  }

  getCost(): bigint | number | null {
   //base cost
    if(this.carModel) {
      let cost = 0; 
      if(this.duration && this.rate) {
        const price = Number(this.rate.price);
        const unit = parseInt(this.rate.rateTypeId.unit);
        if(unit>0) {
          cost = Math.ceil(this.duration.minutes/60/24/unit)*price;
        } else if (this.rate.rateTypeId.unit.indexOf('час')>-1) {
          cost = Math.ceil(this.duration.minutes/60)*price;
        } else if (this.rate.rateTypeId.unit.indexOf('мин')>-1) {
          cost = this.duration.minutes*price;
        } else {
          cost = Math.ceil(this.duration.minutes/60/24)*price;
        }
      }
    
      //total cost
      let servicePrice = 0;
      if(this.services) {
        const services = this.services;
        for(let service of services) {
          if(service.checked) {
            servicePrice += service.price;
          }
        }
      }
      let fullPrice = null; 
      if(cost && cost > 0 && (cost + servicePrice) < this.carModel.priceMax && (cost + servicePrice) > this.carModel.priceMin) {
        fullPrice = cost + servicePrice;
      } else if(cost && cost > 0 && (cost + servicePrice) == Number(this.carModel.priceMax)) {
        fullPrice = cost + servicePrice;
      } else if(cost && cost > 0 && (cost + servicePrice) == Number(this.carModel.priceMin)) {
        fullPrice = cost + servicePrice;
      } else if(cost && cost > 0 && (cost + servicePrice) > this.carModel.priceMax) {
        fullPrice = this.carModel.priceMax;
      } else if(cost && cost > 0 && cost > 0 && (cost + servicePrice) < this.carModel.priceMin) {
        fullPrice = this.carModel.priceMin;
      } 
      
      this.orderService.getCost(fullPrice);
      
      return fullPrice;
       
    } else {
        this.orderService.getCost(null);
        return null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.modelIdSub.unsubscribe();
    this.modelNameSub.unsubscribe();
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
    this.serviceSub.unsubscribe();
    this.rateSub.unsubscribe();
    this.orderSub.unsubscribe();
  }

}
