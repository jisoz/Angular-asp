import { Component, viewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
// @viewChild("Form") addpropertyform!:NgForm

  onSubmit(Form:NgForm){
    // console.log(Form)

  }
}
