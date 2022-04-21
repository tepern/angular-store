import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpService } from "../http.service";
import { OrderService } from "../order.service";
import { CarModel } from "../model/model";
import { Rate } from './rate/rate';
import { CarService } from "./car-service/car-service";
import { RateComponent } from './rate/rate.component';
import { OrderDataComponent } from "../order-data/order-data.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  carModel: CarModel | null = null; 
  carId: string | null = null;
  carColor: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  rate: Rate | null = null;
  services: CarService[] = [];
  modelIdSub: Subscription;
  colorSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  rateSub: Subscription;

  constructor(public httpService: HttpService, private orderService: OrderService) {
    this.modelIdSub = orderService.modelName$.subscribe(
      carModel => {
        if(carModel) {
          this.carModel = carModel;
        }
    });
    this.colorSub = orderService.color$.subscribe(
      color => {
        if(color) {
          this.carColor = color;
        }
    });
    this.startDateSub = orderService.start$.subscribe(
      start => {
        if(start) {
          this.startDate = start;
        }
    });
    this.endDateSub = orderService.end$.subscribe(
      end => {
        if(end) {
          this.endDate = end;
        }
    });
    this.rateSub = orderService.rate$.subscribe(
      rate => {
        if(rate) {
          this.rate = rate;
        }
    });
  }

  @Output() tab = new EventEmitter<string>();

  nextTab(tab: string) {
    this.tab.emit(tab);
  }

  onColorChange(event: string) {
    this.carColor = event;
    this.orderService.getColor(event);
  }

  getStartDate(event: Date | null) {
    this.startDate = event;
    this.orderService.getStartDate(event);
    this.orderService.getCost(null);
  }

  getEndDate(event: Date | null) {
    this.endDate = event;
    this.orderService.getEndDate(event);
    this.orderService.getCost(null);
  }

  getRate(event: Rate) {
    this.rate = event;
    this.orderService.getRate(event);
    this.orderService.getCost(null);
  }

  getService(event: CarService[]) {
    this.services = event;
    this.orderService.getService(event);
    this.orderService.getCost(null);
  }

  ngOnDestroy(): void {
    this.modelIdSub.unsubscribe();
    this.colorSub.unsubscribe();
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
    this.rateSub.unsubscribe();
  }

}
