import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Rate } from './rate';
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  carRate: Rate | null = null;
  rates: Rate[] = [];

  constructor(public httpService: HttpService) {}

  ngOnInit(): void {

    this.httpService.getRates().subscribe((data: Rate[]) => {
      this.rates = data;
    });
  }

  @Output() rateId = new EventEmitter<Rate>();

  onRateChange() {
    if(this.carRate) {
      this.rateId.emit(this.carRate);
    }
  }

}
