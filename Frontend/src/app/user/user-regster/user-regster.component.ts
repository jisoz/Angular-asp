import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-regster',
  templateUrl: './user-regster.component.html',
  styleUrl: './user-regster.component.css'
})
export class UserRegsterComponent implements OnInit {

registrationform!: FormGroup;

  ngOnInit(): void {
    this.registrationform=new FormGroup({
      userName: new FormControl('Mark',Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl(null,[Validators.required]),
      mobile: new FormControl(null,[Validators.required, Validators.maxLength(10)]),
    }, {validators:this.passwordMatchingValidator})
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

console.log(this.registrationform)
  }



}
