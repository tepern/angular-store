import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpService } from "../http.service";
import { CarModel } from "./model";
import { PaginationComponent } from './pagination/pagination.component';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { pagination } from "./pagination";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  public carsModels$: Observable<CarModel[]> = new Observable<CarModel[]>();
  public model: CarModel[] = [];
  form: FormGroup;
  carModel: string = "Все модели";
  pagination = pagination;

  constructor(public httpService: HttpService) {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
      model: new FormControl('Hyndai, i30 N', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getModels(pagination.pageVar, pagination.perPageVar);
    this.countModels();
 
    this.carsModels$ = this.httpService.getCarsModels(1,0); 
  }

  submit() {
    const formData = {...this.form.value};
    this.form.reset();
  }

  onModelChange(event: string): void {
    if(this.carModel) {
    
      const model = this.model;     
      const carModel = event;
      this.carModel = event;
  
      if (carModel == "Премиум") {
        this.carsModels$.subscribe((data: CarModel[]) => {
          this.model = data.filter(function(item) {
            return item.categoryId.name.indexOf('Люкс')>-1;
          });
        });   
      } else if (carModel == "Эконом") {
          this.carsModels$.subscribe((data: CarModel[]) => {
            this.model = data.filter(function(item) {
              return (item.categoryId.name.indexOf('эконом')>-1 ||  item.categoryId.name.indexOf('Эконом')>-1);
            });
          }); 
      } else if (carModel == "Все модели") {
          this.getModels(pagination.pageVar, pagination.perPageVar);
      }
       
    } else {
        this.getModels(pagination.pageVar, pagination.perPageVar);
    }
  }

  prevPage() {
    const page = pagination.pageVar;
    if (page > 1) {
      pagination.pageVar = page - 1; 
    }
    this.getModels(page-1, pagination.perPageVar);
  }

  nextPage() {
    const page = pagination.pageVar; 
    if (page < pagination.countVar) {
      pagination.pageVar = page + 1; 
      this.getModels(page+1, pagination.perPageVar);
    }
  }

  goToPage(event: any) {
    if (event) {
      pagination.pageVar = event;
      this.getModels(event, pagination.perPageVar); 
    }
  }

  getModels(page: number, limit: number): void {
    this.httpService.getCarsModels(page,limit).subscribe(
      (data: CarModel[]) => {
        this.model = data; 
      },
      err => console.error(err),
      () => {
        pagination.loadingVar = true;
      }
    );
  }

  countModels(): void {
    this.httpService.getCarsModels(1,0).subscribe((data: CarModel[]) => {
      pagination.countVar = data.length;
    });
  }
}
