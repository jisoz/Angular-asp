import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProperty } from '../property/Property.Interface';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private  http:HttpClient) { 

  }

  getallproperties(SellRent:number):Observable<IProperty[]> {
  return this.http.get('Data/properties.json').pipe(
    map(
      (data: {[key: string]: any}) => {
        const propertiesArray: IProperty[] = [];
        for (const id in data) {
          if (Object.prototype.hasOwnProperty.call(data, id)) {
            const property = data[id];
            if (typeof property === 'object' && property.SellRent === SellRent) {
              propertiesArray.push(property as IProperty);
            }
          }
        }
        return propertiesArray;
      }
    )
  )
  }
}
