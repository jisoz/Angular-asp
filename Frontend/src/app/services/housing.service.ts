import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { IPropertyBase } from '../../model/ipropertybase';
import { Property } from '../../model/property';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private  http:HttpClient) { 

  }

Baseurl= "http://localhost:5089/api/"

getAllcities():Observable<any[]>{
return this.http.get<any[]>(`${this.Baseurl}City`)  
}




  getproperty(id: number) {
    return this.getallproperties().pipe(
      map(properties => {
        return properties.find(property => property.Id === id);
      })
    );
  }
 
  getallproperties(SellRent?:number):Observable<Property[]> {
  return this.http.get('Data/properties.json').pipe(
    map(
      (data: {[key: string]: any}) => {
        const propertiesArray: Property[] = [];
        const newprop=localStorage.getItem('newprop')
        if (newprop!==null){
          const localproperties=JSON.parse(newprop);
          if (localproperties){
            for (const id in localproperties ){
              if(SellRent){
                if(localproperties.hasOwnProperty(id) && localproperties[id].SellRent===SellRent){
                  propertiesArray.push(localproperties[id])
                }
              }else{
                propertiesArray.push(localproperties[id])
              }
              

            }
          }
        }
       
        for (const id in data) {
          if(SellRent){
            if (Object.prototype.hasOwnProperty.call(data, id)) {
              const property = data[id];
              if (typeof property === 'object' && property.SellRent === SellRent) {
                propertiesArray.push(property as Property);
              }
            }
          }else{
            propertiesArray.push(data[id] as Property);
          }
         
        }
        return propertiesArray;
      }
    )
  )
  }   

  addproperty(property: Property) {
   let properties=[];
   const newprop = localStorage.getItem("newprop");
   if (newprop!=null){
    try{
      properties=JSON.parse(newprop);
      if (!Array.isArray(properties)) {
        properties = [properties]; // If storedUsers is a single object, convert it to an array
      }
    }catch (e) {
      console.error('Error parsing stored users:', e);
    }
  
   }
   properties=[property , ...properties];
   localStorage.setItem('newprop', JSON.stringify(properties));
  }

  newpropid(){
    if(localStorage.getItem("PID")){
      const lpid=localStorage.getItem("PID");
      if (lpid !== null) {
        localStorage.setItem("PID", String(+lpid + 1));
        return +lpid;
      }
    }else{
      localStorage.setItem("PID",'101');
      return 101;
    }
  }
}
