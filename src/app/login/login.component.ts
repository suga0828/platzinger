import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from'../services/authentication.service';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	operation: string = 'login';

  email: string = null;
  password: string = null;
  nick: string = null;

	constructor(
    private autheticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

	ngOnInit() { }

  login() {
    this.autheticationService.loginWithEmail(this.email, this.password)
      .then( data => {
        alert('Logeado correctamente')
        console.log(data)
        this.router.navigate(['home'])
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
        const user = {
          uid: data.user.uid,
          email: data.user.email,
          nick: this.nick
        }
        this.userService.createUser(user)
          .then( data => {
            alert('Registrado correctamente')
            console.log(data)
            this.operation = 'login'
          })
          .catch( error => {
            alert('Ocurrió un error')
            console.log(error)
          })
      })
      .catch( error => {
        console.log(error)
      })
  }

}
