import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpService } from "../http.service";
import { CarModel } from "../model/model";
import { OrderDataComponent } from "../order-data/order-data.component";

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {
  carModel: CarModel | null = null; 
  carId: string = '600fe367ad015e0bb6997d5d';

  constructor(public httpService: HttpService) {
   
  }

  ngOnInit(): void {
    this.httpService.getCarModel(this.carId).subscribe((data: CarModel) => {
      this.carModel = data;
    });
  }

}
