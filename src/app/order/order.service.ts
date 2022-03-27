import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CarModel } from "./model/model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public point$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public modelId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public modelName$: BehaviorSubject<CarModel | null> = new BehaviorSubject<CarModel | null>(null);

  constructor() { }

  getPoint(point: string) {
    this.point$.next(point);
  }

  getModelId(id: string) {
    this.modelId$.next(id);
  }

  getModel(carModel: CarModel) {
    this.modelName$.next(carModel);
  }
}
