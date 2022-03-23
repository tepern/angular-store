import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { NgForm } from "@angular/forms";
import { City } from '../city';
import { Point } from '../point';
import { HttpService } from "../../http.service";
import { YaReadyEvent, YaGeocoderService } from 'angular8-yandex-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  textSearch: string = '';
  city: string | null = null; 
  cities: City[] = [];
  points: Point[] = [];
  public errCity: string | null = null;
  public errPoint: string | null = null;

  constructor(public httpService: HttpService, private yaGeocoderService: YaGeocoderService) { }

  ngOnInit(): void {
    this.httpService.getCity().subscribe((data: City[]) => {
      this.cities = data;
    });
    this.httpService.getPoint().subscribe((data: Point[]) => {
      this.points = data;
    });
    this.getPoint(this.city);
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
        console.log(this.city);
        this.getPoint(this.city);
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
      }
    } else {
      this.textSearch = ''; 
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    const map = event.target;

    ymaps.geolocation
      .get({
        provider: 'browser',
        mapStateAutoApply: true,
      })
      .then((result) => {
        /**
         * We'll mark the position obtained through the browser in blue.
         * If the browser does not support this functionality, the placemark will not be added to the map.
         */
        const city = result.geoObjects.get(0).properties.get('name');
        this.city = city;

        //result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        map.geoObjects.add(result.geoObjects);
          
        const elem = document.getElementsByName('city')[0]; 
        elem.dispatchEvent(new Event("focus"));
        elem.dispatchEvent(new Event("blur"));
        const closestPoints = this.getPoint(this.city);
        const geocodeResult = this.yaGeocoderService.geocode(city + ',' + closestPoints[0].address, {
          results: 1,
        });

        geocodeResult.subscribe((result: any) => {
          // Selecting the first result of geocoding.
          const firstGeoObject = result.geoObjects.get(0);

          // The coordinates of the geo object.
          const coords = firstGeoObject.geometry.getCoordinates();

          // The viewport of the geo object.
          const bounds = firstGeoObject.properties.get('boundedBy');

          firstGeoObject.options.set(
            'preset',
            'islands#darkBlueDotIconWithCaption'
          );

          firstGeoObject.properties.set(
            'iconCaption',
            firstGeoObject.getAddressLine()
          );

          /*firstGeoObject.properties.set(
            'balloonContent',
            firstGeoObject.getAddressLine()
          );*/

          firstGeoObject.options.set({
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/icons/placemark.svg',
            iconImageSize: [18, 18],
          });

          // Adding first found geo object to the map.
          event.target.geoObjects.add(firstGeoObject);

          // Scaling the map to the geo object viewport.
          event.target.setBounds(bounds, {
            // Checking the availability of tiles at the given zoom level.
            checkZoomRange: true,
          });
        });
    });
  }

  getPoint(city: string | null): any {
    if(city) {
      const points = this.points;

      const closestPoints = points.filter(function(point) {
        return (point.cityId) && (point.cityId.name.indexOf(city)>-1);
      });
      console.log(closestPoints);
      
      return closestPoints;  
    }
  }

  placemarkProperties: ymaps.IPlacemarkProperties = {
    hintContent: 'Hint content',
    balloonContent: 'Baloon content',
  };

  placemarkOptions: ymaps.IPlacemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref:
      '/assets/images/icons/placemark.svg',
    iconImageSize: [18, 18],
  };

}
