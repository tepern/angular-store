import { Component, Output, EventEmitter } from '@angular/core';
import { carAllModel } from "./carAllModel";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  
  carModel: string = "Все модели"; 
  carAllModel = carAllModel;

  @Output() filter = new EventEmitter<string>();

  onModelChange() {
    this.filter.emit(this.carModel);
  }

}
