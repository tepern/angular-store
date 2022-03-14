import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpService } from "../http.service";
import { CarModel } from "../model/model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  carModel: CarModel | null = null; 
  carId: string = '600fe367ad015e0bb6997d5d';
  form: FormGroup;

  constructor(public httpService: HttpService) {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
      model: new FormControl('Hyndai, i30 N', Validators.required),
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

  }

}
