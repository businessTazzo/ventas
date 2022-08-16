import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  formLogin: FormGroup;
  constructor(private router: Router, private fb : FormBuilder) {

    this.formLogin = this.fb.group({
      usuario: ['felix.asto@hacom.com', Validators.required],
      password: ['123456', Validators.required]
    })
  }

  valid: boolean = false
  valid2: boolean = false

  fnValidarCampos(){
    if(this.formLogin.get("usuario").invalid || this.formLogin.get("password").invalid)
    {
      console.log("incompleto")
      this.valid = true
      
      this.valid2 = true
    }
    else{ 
    this.router.navigate(['/Hacom/dashboard'])
    }
  }

  fnIngresar() {
    this.fnValidarCampos();
  }

}
