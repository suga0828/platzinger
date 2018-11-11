import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from'../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	operation: string = 'login';

  email: string;
  password: string;

	constructor(private autheticationService: AuthenticationService) { }

	ngOnInit() { }

  login() {
    this.autheticationService.loginWithEmail(this.email, this.password)
      .then( data => {
        alert('Logeado correctamente')
        console.log(data)
      })
      .catch( error => {
        alert('Ocurrió un error')
        console.log(error)
      })
  }

  loginWithFacebook() {
    this.autheticationService.loginWithFacebook()
      .then( data => {
        alert('Logeado con Facebook correctamente')
        console.log(data)
      })
      .catch( error => {
        alert('Ocurrió un error')
        console.log(error)
      })
  }

  register() {
    this.autheticationService.registerWithEmail(this.email, this.password)
      .then( data => {
        alert('Registrado correctamente')
        console.log(data)
      })
      .catch( error => {
        alert('Ocurrió un error')
        console.log(error)
      })
  }

}
