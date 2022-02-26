import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      point: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const formData = {...this.form.value};
    this.form.reset();
  }

}
