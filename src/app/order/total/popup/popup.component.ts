import { Component, OnInit, EventEmitter, Output, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  host: {
    '[@state]': 'state',
  },
  animations: [
    trigger('state', [
      state('opened', style({opacity: 1})),
      state('void, closed', style({opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ])
  ],
})
export class PopupComponent implements OnInit{
   
  @HostBinding('@state')

  state: 'opened' | 'closed' = 'closed';

  @Output()
  closed = new EventEmitter<void>();
  
  constructor(public popup: PopupService) {

  }

  ngOnInit(): void {
    this.state = 'opened';
  }

  confirmOrder():void {
    this.popup.confirmSubmission();
    this.closed.next();
  }

}
