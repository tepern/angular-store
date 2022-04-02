import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpService } from "../http.service";
import { OrderService } from "../order.service";
import { CarModel } from "./model";
import { PaginationComponent } from './pagination/pagination.component';
import { Observable, Subject, Subscription, SubscriptionLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { pagination } from "./pagination";
import { OrderDataComponent } from "../order-data/order-data.component";
import { defaultCarModel, carAllModel } from "./car-filter/carAllModel";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  subscription: SubscriptionLike | null = null;
  countSub: SubscriptionLike | null = null;
  public model: CarModel[] = [];
  carModel: string = defaultCarModel[0].name;
  pagination = pagination;
  id: string = '';

  constructor(public httpService: HttpService, private orderService: OrderService) {
   
  }

  ngOnInit(): void {
    this.getModels(pagination.pageVar, pagination.perPageVar);
    this.countModels();
  }

  @Output() tab = new EventEmitter<string>();

  nextTab(tab: string) {
    this.tab.emit(tab);
  }

  onModelChange(event: string): void {
    if(this.carModel) {    
      const carModel = event;
      this.carModel = event;
      this.getModels(1, 0, event);
    } else {
      this.getModels(pagination.pageVar, pagination.perPageVar);
    }
  }

  prevPage() {
    const page = pagination.pageVar;
    if (page > 1) {
      pagination.pageVar = page - 1; 
    }
    this.getModels(page-1, pagination.perPageVar);
  }

  nextPage() {
    const page = pagination.pageVar; 
    if (page < pagination.countVar) {
      pagination.pageVar = page + 1; 
      this.getModels(page+1, pagination.perPageVar);
    }
  }

  goToPage(event: any) {
    if (event) {
      pagination.pageVar = event;
      this.getModels(event, pagination.perPageVar); 
    }
  }

  getModels(page: number, limit: number, filter?: string): void {
    this.subscription = this.httpService.getCarsModels(page,limit,filter).subscribe(
      (data: CarModel[]) => {
        this.model = data; 
      },
      err => console.error(err),
      () => {
        pagination.loadingVar = true;
      }
    );
  }

  countModels(): void {
    this.countSub = this.httpService.getCarCount().subscribe((data: number) => {
      pagination.countVar = data;
    });
  }

  modelId(carModel: CarModel) {
    if(carModel) {
      this.orderService.getModelId(carModel.id);
      this.id = carModel.id;
      this.orderService.getModel(carModel);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.countSub) {
      this.countSub.unsubscribe();
      this.countSub = null;
    }
  }
}
