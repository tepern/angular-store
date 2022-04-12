import { Component, OnInit, Injector } from '@angular/core';
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
import { createCustomElement } from '@angular/elements';
import { PopupService } from './popup/popup.service';
import { PopupComponent } from './popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent {
  carModel: CarModel | null = null; 
  point: Point | null = null;
  city: City | null = null;
  modelSub: Subscription;
  pointSub: Subscription;
  citySub: Subscription;
  colorSub: Subscription;
  serviceSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  submissionSub: Subscription;
  rateSub: Subscription;
  costSub: Subscription;
  color: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
  services: CarService[] = [];
  rate: Rate | null = null;
  cost: number | bigint | null = null;
  order: Order | null = null;

  constructor(public httpService: HttpService, private orderService: OrderService, injector: Injector, public popup: PopupService) {
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
    this.submissionSub = popup.confirmation$.subscribe(
      confirmation => {
        if(confirmation) {
          this.confirmOrder();
        }
    });
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }

  submitOrder(): void {
    const orderStatus = new OrderStatus("Новые","5e26a191099b810b946c5d89");
    
   if(this.city && this.point && this.carModel && this.color && this.start && this.end && this.rate && this.cost) {
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

    if(this.order && this.services.length>0) {
      this.order.isFullTank = this.services[0].checked;
      this.order.isNeedChildChair = this.services[1].checked;
      this.order.isRightWheel = this.services[2].checked;
    };
    
    if(this.order) {
      this.httpService.submitOrder(this.order)
      .subscribe(order => {
        this.order = order;
        console.log(order);
      });

    }

    this.popup.showPopupComponent();
  }

  confirmOrder(): void {
    const orderStatus = new OrderStatus("Подтвержденные","5e26a1f0099b810b946c5d8b");
      
    if(this.order) {
      this.order.orderStatusId = orderStatus;
      this.httpService.confirmOrder(this.order)
      .subscribe(order => {
        this.order = order;
        console.log(order);
      });
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
    this.submissionSub.unsubscribe();
  }

}
