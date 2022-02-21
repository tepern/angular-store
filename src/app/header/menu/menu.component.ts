import { Input, Component, OnInit } from '@angular/core';
import { menu } from '../../menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() visibility: boolean = false;
  readonly menu = menu;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.visibility=!this.visibility;
  }

}
