import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { NgForm } from "@angular/forms";
import { City } from '../city';
import { Point } from '../point';
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  textSearch: string = '';
  city: string | null = 'Ульяновск'; 
  cities: City[] = [];
  points: Point[] = [];
  public errCity: string | null = null;
  public errPoint: string | null = null;

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getCity().subscribe((data: City[]) => {
      this.cities = data;
    });
    this.httpService.getPoint().subscribe((data: Point[]) => {
      this.points = data;
    });
  }

  onSearchChange(): void {
    if(this.textSearch) {
        
    } else {
        
    }
  }

  reset(form: NgForm) {
    form.resetForm();
    if(this.errCity) {
      this.errCity = null;
    }
  }

  onCitySearch(): void {
    if(this.errCity) {
      this.errCity = null;
    }
    if(this.city) {
      const cities = this.cities;
      const citySearch = this.city;
      this.cities = cities.filter(function(city) {
        return city.name.indexOf(citySearch)>-1;
      });
      if(this.cities.length==0) {
        this.errCity = "Города нет в списке";
        throw "Города нет в списке";
      } else {
        this.city = this.cities[0].name;
      }
    } else {
      this.city = ''; 
    }
  }

  onPointSearch(): void {
    if(this.errPoint) {
      this.errPoint = null;
    }
    if(this.textSearch) {
      const points = this.points;
      const textSearch = this.textSearch;
      this.points = points.filter(function(point) {
        return point.name.indexOf(textSearch)>-1;
      });
      if(this.points.length==0) {
        this.errPoint = "Ничего не найдено";
        throw "Ничего не найдено";
      } else {
        this.textSearch = this.points[0].name;
        console.log(this.textSearch);
      }
    } else {
      this.textSearch = ''; 
    }
  }

}
