import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from "../../order.service";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent {

  startDate: Date | null = null;
  endDate: Date | null = null;
  startDateSub: Subscription;
  endDateSub: Subscription;

  @Output() start = new EventEmitter<Date | null>();
  @Output() end = new EventEmitter<Date | null>();

  constructor(private orderService: OrderService) {
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
  }

  onStartDateChange() {
    if(this.startDate) {
      this.start.emit(this.startDate);
    } else this.start.emit(null);
  }

  onEndDateChange() { 
    if(this.endDate) {
      this.end.emit(this.endDate);
    } else this.end.emit(null);
  }

  reset(field: NgModel, id: string) {
    field.reset();
    const elem = document.getElementById(id);
    if(elem) {
      elem.setAttribute('type','text');
    }
  }

  ngOnDestroy(): void {
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
  }

}
