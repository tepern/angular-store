import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent {

  startDate: Date | null = null;
  endDate: Date | null = null;

  @Output() start = new EventEmitter<Date>();
  @Output() end = new EventEmitter<Date>();

  onStartDateChange() {
    if(this.startDate) {
      this.start.emit(this.startDate);
    }
  }

  onEndDateChange() { 
    if(this.endDate) {
      this.end.emit(this.endDate);
    }
  }

  reset(field: NgModel, id: string) {
    field.reset();
    const elem = document.getElementById(id);
    if(elem) {
      elem.setAttribute('type','text');
    }
  }

}
