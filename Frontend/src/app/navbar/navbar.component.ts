import { Component } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedinuser!:any;


constructor(private alertify:AlertifyService){}
  loggedin(){
    
     this.loggedinuser=localStorage.getItem('Username');
     return this.loggedinuser
  }
  loggedout(){

     localStorage.removeItem('Token');
     localStorage.removeItem('Username');
     this.alertify.success("logout succesfully")
    
  }
}
