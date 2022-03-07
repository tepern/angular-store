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
      model: new FormControl('Hyndai, i30 N', Validators.required),
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
    if(this.carModel) {
    
      const model = this.model;     
      const carModel = this.carModel;
  
      if (carModel == "Премиум") {
        const model = this.model;
        this.httpService.getData().subscribe((data: Model[]) => {
          this.model = data.filter(function(item) {
            return item.categoryId.name.indexOf('Люкс')>-1;
          });
        });     
      } else if (carModel == "Эконом") {
          const model = this.model;
          this.httpService.getData().subscribe((data: Model[]) => {
            this.model = data.filter(function(item) {
              return item.categoryId.name.indexOf('эконом')>-1;
            });
          }); 
      } else if (carModel == "Все модели") {
          this.httpService.getData().subscribe((data: Model[]) => {
            this.model = data; 
          });
      }
       
    } else {
        this.httpService.getData().subscribe((data: Model[]) => {
          this.model = data; 
        });
    }
  }
}
