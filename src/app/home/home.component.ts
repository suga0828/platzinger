import { Component, OnInit } from '@angular/core';

import { User } from '../interfaces/user';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
	friends: User[]
	query: string = ''

	constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

	ngOnInit() {
    this.authenticationService.getStatus()
      .subscribe(
        status => {
          this.userService.getUserById(status.uid)
            .valueChanges()
            .subscribe(
              (data: User) => {
                console.log(data)
                this.user = data
              },
              error => console.log(error)
            )
        },
        error => console.log(error)
      )
		this.userService.getUsers()
      .valueChanges()
      .subscribe( (data: User[]) => {
        this.friends = data
      },
      error => {
        console.log(error)
      })
	}

  logOut() {
    this.authenticationService.logOut()
      .then( (result) => {
        console.log(result)
        alert('Sesión cerrada')
        this.router.navigate(['login'])
      })
      .catch( error => console.log(error) )
  }

}
