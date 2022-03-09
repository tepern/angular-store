import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpService } from "../../http.service";
import { Model, carAllModel } from "../../model";
import { PaginationComponent } from './pagination/pagination.component';

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
  countVar: number = 85;
  pageVar: number = 1;
  perPageVar: number = 20;
  pagesToShow: number = 4;
  loadingVar: boolean = false; 

  constructor(public httpService: HttpService) {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
      model: new FormControl('Hyndai, i30 N', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getModels(this.pageVar, this.perPageVar);
    this.countModels();
  }

  submit() {
    const formData = {...this.form.value};
    this.form.reset();
  }

  onModelChange(event: any): void {
    if(this.carModel) {
    
      const model = this.model;     
      const carModel = event;
      this.carModel = event;
  
      if (carModel == "Премиум") {
        const model = this.model;
        this.httpService.getData(1,0).subscribe((data: Model[]) => {
          this.model = data.filter(function(item) {
            return item.categoryId.name.indexOf('Люкс')>-1;
          });
        });     
      } else if (carModel == "Эконом") {
          const model = this.model;
          this.httpService.getData(1,0).subscribe((data: Model[]) => {
            this.model = data.filter(function(item) {
              return (item.categoryId.name.indexOf('эконом')>-1 ||  item.categoryId.name.indexOf('Эконом')>-1);
            });
          }); 
      } else if (carModel == "Все модели") {
          this.getModels(this.pageVar, this.perPageVar);
      }
       
    } else {
        this.getModels(this.pageVar, this.perPageVar);
    }
  }

  prevPage() {
    const page = this.pageVar;
    console.log(page); 
    if (page > 1) {
      this.pageVar = page - 1; 
    }
    this.getModels(page-1, this.perPageVar);
  }

  nextPage() {
    const page = this.pageVar; 
    if (page < this.countVar) {
      this.pageVar = page + 1; 
      this.getModels(page+1, this.perPageVar);
    }
  }

  goToPage(event: any) {
    if (event) {
      this.pageVar = event;
      this.getModels(event, this.perPageVar); 
    }
  }

  getModels(page: number, limit: number): void {
    this.httpService.getData(page,limit).subscribe((data: Model[]) => {
      this.model = data; 
    });
  }

  countModels(): void {
    this.httpService.getData(1,0).subscribe((data: Model[]) => {
      this.countVar = data.length;
      console.log(data.length);
    });
  }
}
