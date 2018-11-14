import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

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
  }

  saveSettings() {
    console.log(this.user)
    this.userService.editUser(this.user)
      .then( () => alert('Cambios guardados correctamente') )
      .catch( error => {
        alert('Hubo un error')
        console.log(error)
      })
  }


}
