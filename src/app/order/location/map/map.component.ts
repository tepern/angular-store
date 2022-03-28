import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  textSearch: string = '';
  city: string = 'Ульяновск'; 

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange(): void {
    if(this.textSearch) {
        
    } else {
        
    }
  }

  reset(form: NgForm) {
    form.resetForm();
  }

}
