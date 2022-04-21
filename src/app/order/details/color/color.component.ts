import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from "../../order.service";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  carColor: string = '';
  colorSub: Subscription;

  @Input() carColors: string[] = [];

  @Output() color = new EventEmitter<string>();

  constructor(private orderService: OrderService) {
    this.colorSub = orderService.color$.subscribe(
      color => {
        if(color) {
          this.carColor = color;
        }
    });
  }

  onColorChange() {
    this.color.emit(this.carColor);
  }

  ngOnDestroy(): void {
    this.colorSub.unsubscribe();
  }
}
