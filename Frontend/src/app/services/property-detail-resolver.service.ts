// import { Injectable, inject } from '@angular/core';
// import { ActivatedRouteSnapshot, MaybeAsync, ResolveFn, RouterStateSnapshot } from '@angular/router';
// import {  Property } from '../../model/property';
// import { HousingService } from './housing.service';
// import { Observable, filter, map, take } from 'rxjs';



// export const PropertyDetailResolverService:ResolveFn<Property>=(
// route: ActivatedRouteSnapshot,
// state:RouterStateSnapshot,
// housingService:HousingService=inject(HousingService),
// ):Observable<Property>=>housingService.getproperty(route.params['id']).pipe(
//   filter<Property>((property: Property): property is Property => !!property),
//   take(1)
// );




  

//   // Inside your resolver class
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> {
//     const propid = route.params['id'];
//     return this.housingService.getproperty(propid);
//   }
  
  
  
// }