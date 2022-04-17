import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CarModel } from "./model/model";
import { Rate } from './details/rate/rate';
import { Point } from './location/point';
import { City } from './location/city';
import { Duration } from './order-data/duration';
import { CarService } from "./details/car-service/car-service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public point$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public pointId$: BehaviorSubject<Point | null> = new BehaviorSubject<Point | null>(null);

  public cityId$: BehaviorSubject<City | null> = new BehaviorSubject<City | null>(null);

  public modelId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public modelName$: BehaviorSubject<CarModel | null> = new BehaviorSubject<CarModel | null>(null);

  public color$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public start$: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);

  public end$: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);

  public service$: BehaviorSubject<CarService[]> = new BehaviorSubject<CarService[]>([]);

  public rate$: BehaviorSubject<Rate | null> = new BehaviorSubject<Rate | null>(null);

  public duration$: BehaviorSubject<Duration | null> = new BehaviorSubject<Duration | null>(null);

  public cost$: BehaviorSubject<number | bigint | null> = new BehaviorSubject<number | bigint | null>(null);


  getPoint(point: string) {
    this.point$.next(point);
  }

  getPointId(point: Point) {
    this.pointId$.next(point);
  }

  getCityId(city: City) {
    this.cityId$.next(city);
  }

  getModelId(id: string) {
    this.modelId$.next(id);
  }

  getModel(carModel: CarModel) {
    this.modelName$.next(carModel);
  }

  getColor(color: string | null) {
    this.color$.next(color);
  }

  getStartDate(start: Date | null) {
    this.start$.next(start);
  }

  getEndDate(end: Date | null) {
    this.end$.next(end);
  }

  getService(services: CarService[]) {
    this.service$.next(services);
  }

  getRate(rate: Rate | null) {
    this.rate$.next(rate);
  }

  getDuration(duration: Duration | null) {
    this.duration$.next(duration);
  }

  getCost(cost: number | bigint | null) {
    this.cost$.next(cost);
  }
}
