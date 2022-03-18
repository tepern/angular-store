import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpService } from "../http.service";
import { CarModel } from "../model/model";
import { RateComponent } from './rate/rate.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  carModel: CarModel | null = null; 
  carId: string = '600fe367ad015e0bb6997d5d';
  carColor: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  rate: string = '';
  services: string[] = [];
  form: FormGroup;

  constructor(public httpService: HttpService) {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
      model: new FormControl('Hyndai, i30 N', Validators.required),
      duration: new FormControl('1д 2ч', Validators.required),
      rate: new FormControl('На сутки', Validators.required),
      fullTank: new FormControl('Да', Validators.required),
    })
  }

  ngOnInit(): void {

    this.httpService.getCarModel(this.carId).subscribe((data: CarModel) => {
      this.carModel = data;
    });
  }

  submit() {
    const formData = {...this.form.value};
    this.form.reset();
  }

  onColorChange(event: any) {
    this.carColor = event;
  }

  getStartDate(event: any) {
    this.startDate = event;
  }

  getEndDate(event: any) {
    this.endDate = event;
  }

  getRate(event: any) {
    this.rate = event;
  }

  getService(event: any) {
    this.services = event;
  }

}
