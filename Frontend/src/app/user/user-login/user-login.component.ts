import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

constructor(private authservice:AuthService, private alertify:AlertifyService,private router:Router){

}
  onLogin(fm :NgForm){
   const user=this.authservice.authuser(fm.value);

   if (user){
    // console.log("success login")
    localStorage.setItem("Token", user.userName);
    this.alertify.success("login succesfully");
    this.router.navigate(['/']);
   }else{
    // console.log("error login")
    this.alertify.success("error login")
   }
  }
}
