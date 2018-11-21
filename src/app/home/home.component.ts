import { Component, OnInit } from '@angular/core';

import { User } from '../interfaces/user';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

import { Router } from '@angular/router';

import { RequestsService } from '../services/requests.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
	friends: User[];
	query: string = '';
  friendEmail: string = '';

	constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private requestsService: RequestsService) {}

	ngOnInit() {
    this.authenticationService.getStatus()
      .subscribe(
        status => {
          this.userService.getUserById(status.uid)
            .valueChanges()
            .subscribe(
              (data: User) => {
                this.user = data
                if (this.user.friends) {
                  this.user.friends = Object.values(this.user.friends)
                  console.log(this.user)
                }
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then( (result) => {}, (reason) => {});
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }
    this.requestsService.createRequest(request)
      .then( () => {
        alert('Solicitud enviada')
      })
      .catch( (error) => {
        alert('Hubo un error')
        console.log(error)
      })
  }

}
