
import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';

import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from '../../../model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit{

  properties!:Array<IPropertyBase>;
  SellRent=1;

  constructor(private root:ActivatedRoute ,private housingservice:HousingService){
   
  }

  ngOnInit(): void {
    if(this.root.snapshot.url.toString()){
      this.SellRent=2;
    
    }
    this.housingservice.getallproperties(this.SellRent).subscribe(
      data=>{
       
       this.properties = data
   
      //  console.log(this.root.snapshot.url.toString());
      },
      error=>{
        console.log(error);
      }
    )
   
  }
  
}
