import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { Property } from '../../../model/property';
import { IPropertyBase } from '../../../model/ipropertybase';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  public propertyid!:number;
  property=new Property()
  constructor(private root:ActivatedRoute, private router:Router, private housingservice:HousingService){}

  ngOnInit(): void {
   this.propertyid = Number(this.root.snapshot.params['id']);
   //for refreching component 
   this.root.params.subscribe(
    (params)=>{
      this.propertyid=+params['id'];
      this.housingservice.getproperty(this.propertyid).subscribe(
        (data: IPropertyBase | undefined) => {
          if (data) {
            this.property = data as Property;
          }
        }
      )
    }
   )
  }

  OnSelectNext(){
    this.propertyid+=1;
    this.router.navigate(['property-detail', this.propertyid])

  }

}
