import { Injectable } from '@angular/core';
import { UserForRegister, UserForLogin } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  authuser(user:UserForLogin):Observable<UserForLogin> {
    return this.http.post<UserForLogin>(this.baseUrl + "Account/login", user);
    // let userarray=[];
    // const userstorage=localStorage.getItem('Users')
    // if(userstorage){
    //   userarray=JSON.parse(userstorage);
    // }
    // return userarray.find((p:any) => p.userName ===user.userName && p.password===user.password);




  }

  register(user:UserForRegister){
    return this.http.post(this.baseUrl +'Account/Register',user );
  }
}
