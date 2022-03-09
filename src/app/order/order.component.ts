import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LocationComponent } from './location/location.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  tab: string = 'location';

  constructor() { }

  ngOnInit(): void {
  }

  tabs(tab: string): void {
    this.tab = tab;
  }

}
