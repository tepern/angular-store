import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from "../order.service";
import { HttpService } from "../http.service";
import { Subscription, Observable } from 'rxjs';
import { CarModel } from "../model/model";
import { CarService } from "../details/car-service/car-service";
import { Rate } from '../details/rate/rate';
import { Duration } from './duration';

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
  //duration: Duration | null = null;
 // cost: number | bigint | null = null;

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

  public get duration() {
    return this.getDuration();
  }

  public get cost() {
    return new Intl.NumberFormat().format(Number(this.getCost()));
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
        if(this.rate.rateTypeId.unit.indexOf('30')>-1) {
          cost = Math.ceil(this.duration.days/30)*price;
        } else if (this.rate.rateTypeId.unit.indexOf('час')>-1) {
          cost = Math.ceil(this.duration.minutes/60)*price;
        } else if (this.rate.rateTypeId.unit.indexOf('мин')>-1) {
          cost = this.duration.minutes*price;
        } else {
          const cost = Math.ceil(this.duration.hours/24)*price;
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
      } else if(cost && cost > 0 && (cost + servicePrice) > this.carModel.priceMax) {
        fullPrice = this.carModel.priceMax;
      } else if(cost && cost > 0 && cost > 0 && (cost + servicePrice) < this.carModel.priceMin) {
        fullPrice = this.carModel.priceMin;
      } 

      return fullPrice;
       
    } else return null;
    
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
