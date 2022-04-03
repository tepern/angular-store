import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { NgForm } from "@angular/forms";
import { City } from '../city';
import { Point } from '../point';
import { HttpService } from "../../http.service";
import { OrderService } from "../../order.service";
import { YaReadyEvent, YaGeocoderService } from 'angular8-yandex-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: ymaps.Map | null = null;
  textSearch: string | null = null;
  city: string | null = null; 
  points: Point[] = [];
  public errCity: string | null = null;
  public errPoint: string | null = null;
  private objectManager: ymaps.ObjectManager | null = null;

  constructor(
    public httpService: HttpService, 
    public yaGeocoderService: YaGeocoderService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.httpService.getPoint().subscribe((data: Point[]) => {
      this.points = data;
    });
  }

  reset(field: NgModel) {
    field.reset();
    if(this.errCity) {
      this.errCity = null;
    }
    if(this.errPoint) {
      this.errPoint = null;
    }
  }

  onCitySearch(): void {
    if(this.errCity) {
      this.errCity = null;
    }
    if(this.city) {
      const citySearch = this.city;
      const points = this.points;
      const cityFilter = points.filter(function(point) {
        return (point.cityId && point.cityId.name.indexOf(citySearch)>-1);  
      });
      if(cityFilter.length==0) {
        this.errCity = "Города нет в списке";
        throw "Города нет в списке";
      } else {
        this.getPoints(this.map,cityFilter);
      }
    } else {
      this.city = null; 
    }
  }


  onPointSearch(): void {
    if(this.errPoint) {
      this.errPoint = null;
    }
    if(this.textSearch) {
      const points = this.points;
      const city = this.city;
      const textSearch = this.textSearch;
      const pointsFilter = points.filter(function(point) {
        return (point.cityId && point.name.indexOf(textSearch)>-1 || point.cityId && point.address.indexOf(textSearch)>-1);
      });
      if(pointsFilter.length==0) {
        this.errPoint = "Ничего не найдено";
        throw "Ничего не найдено";
      } else {
        this.getPoints(this.map,pointsFilter);
      }
    } else {
      this.textSearch = null; 
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    const map = event.target;

    ymaps.geolocation
      .get({
        provider: 'browser',
        mapStateAutoApply: true,
      })
      .then((result) => {
        //Если пользователь разрешил определить геолокацию
        const city = result.geoObjects.get(0).properties.get('name');
        
        this.city = city;
        const elem = document.getElementsByName('city')[0]; 
        elem.dispatchEvent(new Event("focus"));
        elem.dispatchEvent(new Event("blur"));
        const closestPoints = this.getPoint(this.city);
        if(closestPoints) {
        //Если в городе есть пункты
          this.getPoints(map,closestPoints);
        } else {
        //Если в городе нет пунктов - то выводятся все
          this.getPoints(map,this.points);
        }         
      },
      () => { 
        if(this.city) {
          const closestPoints = this.getPoint(this.city);
          this.getPoints(map,closestPoints);
        }
        this.getPoints(map,this.points); 
      }
    );
  }

  getPoint(city: string | null): any {
    if(city) {
      const points = this.points;

      const closestPoints = points.filter(function(point) {
        return (point.cityId && point.cityId.name.indexOf(city)>-1);
      });
      
      return closestPoints;  
    }
  }

  getPoints(map: any, allPoints: Point[]):void {
    const points = allPoints;
    
    points.forEach((point: Point) => {
      const currentCity = point.cityId.name;
      const address = point.address;
      if(currentCity) {
        const geocodeResult = this.yaGeocoderService.geocode(currentCity + ',' + address, {
          results: 1,
        });
   
        geocodeResult.subscribe((result: any) => {
        
          const firstGeoObject = result.geoObjects.get(0);

          const coords = firstGeoObject.geometry.getCoordinates();

          const bounds = firstGeoObject.properties.get('boundedBy');

          firstGeoObject.properties.set(
            'iconCaption',
            firstGeoObject.getAddressLine()
          );

          firstGeoObject.options.set({
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/icons/placemark.svg',
            iconImageSize: [18, 18],
          });

          firstGeoObject.events.add('click', (event: ymaps.Event) => {
            const address = firstGeoObject.properties.get('name')
            this.textSearch = address;
            const elem = document.getElementsByName('search')[0]; 
            elem.setAttribute('value', address);
            elem.dispatchEvent(new Event("focus"));
            elem.dispatchEvent(new Event("blur"));
            this.location();
          })

          map.geoObjects.add(firstGeoObject);

          map.setBounds(bounds, {
            checkZoomRange: true,
          });
        });
      }
    });
  }
  
  location() {
    if(this.city && this.textSearch) {
      const point = this.city + ', ' + this.textSearch;
      this.orderService.getPoint(point);
    }
  }
}
