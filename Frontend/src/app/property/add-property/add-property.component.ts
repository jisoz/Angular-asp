import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { IPropertyBase } from '../../../model/ipropertybase';
import { Router } from '@angular/router';
import { Property } from '../../../model/property';
import { HousingService } from '../../services/housing.service';
import { AlertifyService } from '../../services/alertify.service';
import { KeyValuePair } from '../../../model/KeyValuePair';
import { propertyadd } from '../../../model/propertadd';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent implements OnInit {
  property=new propertyadd();
  nextClicked!: boolean;
// @viewC @ViewChild('Formtabs') formtabs:TabsetComponent;hild("Form") addpropertyform!:NgForm
constructor(private fb: FormBuilder , private router: Router , private housingservice:HousingService,private alertify:AlertifyService){

}
  ngOnInit(): void {
    this.housingservice.getAllcities().subscribe(cities =>
      
      this.CitiyList=cities
     
     )
     this.housingservice.getpropertytype().subscribe(proptypes=>this.propertytypes=proptypes)

     this.housingservice.getfurnishuretype().subscribe(furnish=>this.furnishtypes=furnish)
     
    this.createAddpropertyForm();
  }
@ViewChild('formtabs') formtabs!:TabsetComponent;
addPropertyForm!:FormGroup
hide:boolean=true;
CitiyList!:any[]
propertytypes!:Array<KeyValuePair> 
furnishtypes!:Array<KeyValuePair> 
propertieview:IPropertyBase={
        id: null,
        name: '',
        price: null,
        sellRent: null,
        propertyType: null,
        furnishingType: null,
        bhk: 4,
        builtArea: null,
        city: '',
        readyToMove: null,
        photo:"../../../assets/images/default.jpg"

};

createAddpropertyForm(){
  this.addPropertyForm =this.fb.group({
    BasicInfo:this.fb.group({
      SellRent:[1,Validators.required],
      BHK:[null,Validators.required],
      PType:[null,Validators.required],
      FType:[null,Validators.required],
      Name:[null,Validators.required],
      City:[null,Validators.required]
    }),
    PriceInfo:this.fb.group({
      Price:[null,Validators.required],
      BuiltArea:[null,Validators.required],
      CarpetArea:[null],
      Security:[0],
      Maintenance:[0]
    }),
    AddressInfo: this.fb.group({
      FloorNo: [null],
      TotalFloor: [null],
      Address: [null, Validators.required],
      LandMark: [null],
  }),

  OtherInfo: this.fb.group({
      RTM: [null, Validators.required],
      PossessionOn: [null, Validators.required],
      AOP: [null],
      Gated: [null],
      MainEntrance: [null],
      Description: [null]
  })
   
  })
}
  onSubmit(){
    this.nextClicked = true;
      // console.log(Form)
      if (this.allTabsValid()) {

      this.mapProperty();
      // console.log(this.property)
      // console.log(this.addPropertyForm.value);
      this.housingservice.addproperty(this.property).subscribe(()=>
        {
          this.alertify.success("new property added");
          if(this.SellRent.value=='2'){
            this.router.navigate(['/rent-property'])
          }else{
            this.router.navigate(['/']);
          }
        },error=>{
          this.alertify.error(error.error)
        }
      );
     
}




  }


  get BasicInfo(){
    return this.addPropertyForm.get('BasicInfo') as  FormGroup
  }
  get PriceInfo() {
    return this.addPropertyForm.get('PriceInfo') as FormGroup;
}

 get AddressInfo() {
    return this.addPropertyForm.get("AddressInfo") as FormGroup;
}

  get OtherInfo() {
    return this.addPropertyForm.get("OtherInfo") as FormGroup;
}

  get SellRent(){
    return this.BasicInfo.get("SellRent") as FormControl;
  }
  get BHK() {
    return this.BasicInfo.get("BHK") as FormControl;
}

get PType() {
    return this.BasicInfo.get("PType") as FormControl;
}

get FType() {
    return this.BasicInfo.get("FType") as FormControl;
}

get Name() {
    return this.BasicInfo.get("Name") as FormControl;
}

get City() {
    return this.BasicInfo.get("City") as FormControl;
}

get Price() {
  return this.PriceInfo.get("Price") as FormControl;
}

get BuiltArea() {
  return this.PriceInfo.get("BuiltArea") as FormControl;
}

get CarpetArea() {
  return this.PriceInfo.get("CarpetArea") as FormControl;
}

get Security() {
  return this.PriceInfo.get("Security") as FormControl;
}

get Maintenance() {
  return this.PriceInfo.get("Maintenance") as FormControl;
}

get FloorNo() {
  return this.AddressInfo.get("FloorNo") as FormControl;
}

get TotalFloor() {
  return this.AddressInfo.get("TotalFloor") as FormControl;
}

get Address() {
  return this.AddressInfo.get("Address") as FormControl;
}

get LandMark() {
  return this.AddressInfo.get("LandMark") as FormControl;
}

get RTM() {
  return this.OtherInfo.get("RTM") as FormControl;
}

get PossessionOn() {
  return this.OtherInfo.get("PossessionOn") as FormControl;
}

get AOP() {
  return this.OtherInfo.get("AOP")as FormControl;
}

get Gated() {
  return this.OtherInfo.get("Gated") as FormControl;
}

get MainEntrance() {
  return this.OtherInfo.get("MainEntrance") as FormControl;
}

get Description() {
  return this.OtherInfo.get("Description") as FormControl;
}


allTabsValid(): boolean {
  if (this.BasicInfo.invalid) {
      this.formtabs.tabs[0].active = true;
      return false;
  }

  if (this.PriceInfo.invalid) {
      this.formtabs.tabs[1].active = true;
      return false;
  }

  if (this.AddressInfo.invalid) {
      this.formtabs.tabs[2].active = true;
      return false;
  }

  if (this.OtherInfo.invalid) {
      this.formtabs.tabs[3].active = true;
      return false;
  }
  return true;
}

selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
  this.nextClicked = true;
  if (IsCurrentTabValid) {
      this.formtabs.tabs[NextTabId].active = true;
  }
}

  mapProperty(): void {
    // this.property.id=this.housingservice.newpropid();
    this.property.sellRent = +this.SellRent.value;
    this.property.bhk = this.BHK.value;
    this.property.propertyTypeId = this.PType.value;
    this.property.name = this.Name.value;
    this.property.CityId = +this.City.value;
    this.property.furnishingTypeId = this.FType.value;
    this.property.price = +this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = +this.BuiltArea.value;
    this.property.carpetArea = +this.CarpetArea.value;
    this.property.floorNo = +this.FloorNo.value;
    this.property.totalFloors = +this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.estPossessionOn =this.PossessionOn.value
    this.property.description = this.Description.value;
    this.property.aop=0;
}
}
 