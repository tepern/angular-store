import { CarModel } from './model/model';
import { Rate } from './details/rate/rate';
import { City } from './location/city';
import { Point } from './location/point';

export class OrderStatus {
  constructor(
    public name: string,
    public id: string
  ) {}
}

export class Order {
  constructor(
    public orderStatusId: OrderStatus,
    public cityId: City,
    public pointId: Point,
    public carId: CarModel,
    public color: string,
    public dateFrom: Date | number,
    public dateTo: Date | number,
    public rateId: Rate,
    public price: number | bigint,
    public isFullTank: boolean,
    public isNeedChildChair: boolean,
    public isRightWheel: boolean,
    public id?: string
  ) {
    
  }
} 