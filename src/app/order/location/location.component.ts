import { Component } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
    })
  }

  submit() {
    const formData = {...this.form.value};
    this.form.reset();
  }

}
