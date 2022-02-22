import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  visibility: boolean = false;

  // переключаем переменную
  toggle() {
    this.visibility = !this.visibility;
  }

}
