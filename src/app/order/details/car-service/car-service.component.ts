import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { carAllService } from "./carAllservice";
import { CarService } from "./car-service";

@Component({
  selector: 'app-car-service',
  templateUrl: './car-service.component.html',
  styleUrls: ['./car-service.component.scss']
})
export class CarServiceComponent {
  carAllService = carAllService;

  carService: CarService[] = carAllService;

  @Output() service = new EventEmitter<CarService[]>();

  onServiceChange() {
    this.service.emit(this.carService);
  }

}
