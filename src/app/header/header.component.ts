import { Component, OnInit } from '@angular/core';
import { menu } from '../menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  visibility: boolean = false;
  readonly menu = menu;

    // переключаем переменную
    toggle(){
        this.visibility=!this.visibility;
    }

}
