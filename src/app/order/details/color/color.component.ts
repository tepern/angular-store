import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  carColor: string = '';

  @Input() carColors: string[] = [];

  @Output() color = new EventEmitter<string>();

  onColorChange() {
    this.color.emit(this.carColor);
  }
}
