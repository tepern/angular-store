import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './home/main/main.component';
import { SliderComponent } from './home/slider/slider.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { OrderComponent } from './order/order.component';
import { LocationComponent } from './order/location/location.component';
import { MapComponent } from './order/location/map/map.component';
import { ModelComponent } from './order/model/model.component';
import { HttpService } from "./order/http.service";
import { OrderService } from "./order/order.service";
import { PaginationComponent } from './order/model/pagination/pagination.component';
import { CarFilterComponent } from './order/model/car-filter/car-filter.component';
import { DetailsComponent } from './order/details/details.component';
import { ColorComponent } from './order/details/color/color.component';
import { DatesComponent } from './order/details/dates/dates.component';
import { RateComponent } from './order/details/rate/rate.component';
import { CarServiceComponent } from './order/details/car-service/car-service.component';
import { TotalComponent } from './order/total/total.component';
import { OrderDataComponent } from './order/order-data/order-data.component';
import { CostPipe } from './order/cost.pipe';
import { PopupComponent } from './order/total/popup/popup.component';

const mapConfig: YaConfig = {
  apikey: '215898fb-7ea4-4f2a-97e4-e0e1f172c5c5',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    SliderComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    OrderComponent,
    LocationComponent,
    MapComponent,
    ModelComponent,
    PaginationComponent,
    CarFilterComponent,
    DetailsComponent,
    ColorComponent,
    DatesComponent,
    RateComponent,
    CarServiceComponent,
    TotalComponent,
    OrderDataComponent,
    CostPipe,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [HttpService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
