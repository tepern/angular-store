import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rate } from './rate';
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  carRate: string | null = null;
  currentRate: Rate | null = null;
  rates: Rate[] = [];
  subscription: Subscription = new Subscription();

  constructor(public httpService: HttpService) {}

  ngOnInit(): void {

    this.subscription = this.httpService.getRates().subscribe((data: Rate[]) => {
      this.rates = data;
    });
  }

  @Output() rateId = new EventEmitter<Rate>();

  onRateChange() {
    if(this.carRate) {
      this.subscription = this.httpService.getRate(this.carRate).subscribe((data: Rate) => {
        this.currentRate = data;
      },
      err => console.error(err),
      () => {
        if(this.currentRate) {
          this.rateId.emit(this.currentRate);
        }
      });
    }  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
