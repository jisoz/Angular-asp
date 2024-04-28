import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { IPropertyBase } from '../../model/ipropertybase';
import { Property } from '../../model/property';
import { environment } from '../../environments/environment.development';
import { KeyValuePair } from '../../model/KeyValuePair';
import { propertyadd } from '../../model/propertadd';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private  http:HttpClient) { 

  }

baseurl=environment.baseUrl;

getAllcities():Observable<any[]>{
  // const token = localStorage.getItem('Token');
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
return this.http.get<any[]>(`${this.baseurl}City`)  
}




  // getproperty(id: number) {
  //   return this.getallproperties().pipe(
  //     map(properties => {
  //       return properties.find(property => property.Id === id);
  //     })
  //   );
  // }

  getproperty(id:number){
    return this.http.get<Property>(this.baseurl + 'Property/detail/' + id.toString())
  }
 
  getallproperties(SellRent?:number):Observable<Property[]> {
     return this.http.get<Property[]>(this.baseurl + 'Property/type/' + SellRent?.toString())
  // return this.http.get('Data/properties.json').pipe(
  //   map(
  //     (data: {[key: string]: any}) => {
  //       const propertiesArray: Property[] = [];
  //       const newprop=localStorage.getItem('newprop')
  //       if (newprop!==null){
  //         const localproperties=JSON.parse(newprop);
  //         if (localproperties){
  //           for (const id in localproperties ){
  //             if(SellRent){
  //               if(localproperties.hasOwnProperty(id) && localproperties[id].SellRent===SellRent){
  //                 propertiesArray.push(localproperties[id])
  //               }
  //             }else{
  //               propertiesArray.push(localproperties[id])
  //             }
              

  //           }
  //         }
  //       }
       
  //       for (const id in data) {
  //         if(SellRent){
  //           if (Object.prototype.hasOwnProperty.call(data, id)) {
  //             const property = data[id];
  //             if (typeof property === 'object' && property.SellRent === SellRent) {
  //               propertiesArray.push(property as Property);
  //             }
  //           }
  //         }else{
  //           propertiesArray.push(data[id] as Property);
  //         }
         
  //       }
  //       return propertiesArray;
  //     }
  //   )
  // )
  }   

  addproperty(property: propertyadd) {
   let head_obj=new HttpHeaders().set("Authorization","bearer " +localStorage.getItem("Token"));
    console.log(localStorage.getItem('Token'))
    return this.http.post(this.baseurl +"Property/post", property,{headers:head_obj})
  //  let properties=[];
  //  const newprop = localStorage.getItem("newprop");
  //  if (newprop!=null){
  //   try{
  //     properties=JSON.parse(newprop);
  //     if (!Array.isArray(properties)) {
  //       properties = [properties]; // If storedUsers is a single object, convert it to an array
  //     }
  //   }catch (e) {
  //     console.error('Error parsing stored users:', e);
  //   }
  
  //  }
  //  properties=[property , ...properties];
  //  localStorage.setItem('newprop', JSON.stringify(properties));
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


 getPropertyAge(dateofEstablishment: Date | undefined): number {
    if (dateofEstablishment === undefined) {
        return 0;
    }

    const today = new Date();
    const estDate = new Date(dateofEstablishment);

    // Calculate the difference in years
    const age = today.getFullYear() - estDate.getFullYear();

    return age;
}


getpropertytype():Observable<KeyValuePair[]>{
 return this.http.get<KeyValuePair[]>(this.baseurl + 'PropertyType/list');
}



getfurnishuretype():Observable<KeyValuePair[]>{

return this.http.get<KeyValuePair[]>(this.baseurl + 'FurnishureType/list');



}



}