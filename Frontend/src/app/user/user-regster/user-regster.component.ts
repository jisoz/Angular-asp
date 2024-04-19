import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../../model/user';
import * as alertify from 'alertifyjs';
import { AlertifyService } from '../../services/alertify.service';
@Component({
  selector: 'app-user-regster',
  templateUrl: './user-regster.component.html',
  styleUrl: './user-regster.component.css'
})
export class UserRegsterComponent implements OnInit {

registrationform!: FormGroup;
user!:User
usersubmitted!: boolean
constructor(private fb: FormBuilder , private userservice:UserService,private alertifyservice:AlertifyService){

}

  ngOnInit(): void {
    // this.registrationform=new FormGroup({
    //   userName: new FormControl('Mark',Validators.required),
    //   email: new FormControl(null,[Validators.required, Validators.email]),
    //   password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    //   confirmpassword: new FormControl(null,[Validators.required]),
    //   mobile: new FormControl(null,[Validators.required, Validators.maxLength(10)]),
    // }, {validators:this.passwordMatchingValidator})
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationform=this.fb.group(
      {
        userName:[null,Validators.required],
        email:[null,[Validators.required,Validators.email]],
        password:[null,[Validators.required,Validators.minLength(8)]],
        confirmpassword:[null,Validators.required],
        mobile:[null,[Validators.required,Validators.maxLength(10)]],

      },{Validators:this.passwordMatchingValidator}
    );
  }

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmpassword')?.value ? null :
      { notmatched: true }
  };

  get userName(){
    return this.registrationform.get("userName") as FormControl
  }
  get email(){
    return this.registrationform.get("email") as FormControl
  }
  get password(){
    return this.registrationform.get("password") as FormControl
  }
  get confirmpassword(){
    return this.registrationform.get("confirmpassword") as FormControl
  }
  get mobile(){
    return this.registrationform.get("mobile") as FormControl
  }
  onSubmit() {
    this.usersubmitted=true;
if(this.registrationform.valid){
  // this.user=Object.assign(this.user,this.registrationform.value);
  this.userservice.addUser(this.userData());
  this.registrationform.reset();
  this.usersubmitted=false;
  this.alertifyservice.success("congrats , succesfuuly registred");
}else{
  this.alertifyservice.error("failed")
}
// console.log(this.registrationform.value);


  }

userData():User{
  return this.user={
    userName: this.userName.value,
    email: this.email.value,
    password:this.password.value,
    mobile: this.mobile.value,
  }
}

}
