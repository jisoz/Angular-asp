import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  public propertyid!:number;
  constructor(private root:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
   this.propertyid = Number(this.root.snapshot.params['id']);
   //for refreching component 
   this.root.params.subscribe(
    (params)=>{
      this.propertyid=+params['id'];
    }
   )
  }

  OnSelectNext(){
    this.propertyid+=1;
    this.router.navigate(['property-detail', this.propertyid])

  }


}
