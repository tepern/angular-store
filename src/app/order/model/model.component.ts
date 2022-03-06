import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpService } from "../../http.service";
import { Model, carAllModel } from "../../model";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  
  public model: Model[] = [];
  form: FormGroup;
  carModel: string = "Все модели"; 
  carAllModel = carAllModel;

  constructor(public httpService: HttpService) {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.httpService.getData().subscribe((data: Model[]) => {
      this.model = data; 
      console.log(this.model);
    });
  }

  submit() {
    const formData = {...this.form.value};
    this.form.reset();
  }

  onModelChange(): void {
    if(this.model) {
        
    } else {
        
    }
  }
}
