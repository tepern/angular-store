import { Input, Component, EventEmitter, Output } from '@angular/core';
import { menu } from '../../menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() onClick = new EventEmitter<boolean>();
    
  readonly menu = menu;
  visibility: boolean = true;

  toggle() {
    this.visibility = !this.visibility;
    this.onClick.emit(this.visibility);
  }

}
