import { Component, Input } from '@angular/core';
import { IProperty } from '../Property.Interface';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
 @Input() property!:IProperty;


}
