import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
