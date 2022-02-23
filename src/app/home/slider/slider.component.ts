import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { slider } from './slider';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {

  readonly slider = slider;  

}
