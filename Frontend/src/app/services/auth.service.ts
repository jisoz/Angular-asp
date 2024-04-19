import { Injectable } from '@angular/core';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authuser(user: any) {
    let userarray=[];
    const userstorage=localStorage.getItem('Users')
    if(userstorage){
      userarray=JSON.parse(userstorage);
    }
    return userarray.find((p:any) => p.userName ===user.userName && p.password===user.password);




  }
}
