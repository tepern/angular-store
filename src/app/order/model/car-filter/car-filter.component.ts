import { Component, Output, Input, EventEmitter } from '@angular/core';
import { carAllModel } from "./carAllModel";

@Component({
  selector: 'app-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.scss']
})
export class CarFilterComponent {
  
  carModel: string = "Все модели"; 
  carAllModel = carAllModel;
  @Input() loadingVar: boolean = false;

  @Output() filter = new EventEmitter<string>();

  onModelChange() {
    this.filter.emit(this.carModel);
  }

}
