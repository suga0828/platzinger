import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';

import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) { }

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
    if (this.croppedImage) {
      const currentPictureId = Date.now()
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg')
        .putString(this.croppedImage, 'data_url')
      pictures
        .then( result => {
          console.log(result)
          this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL()
          this.picture
            .subscribe( path => {
              this.userService.setAvatar(path, this.user.uid)
                .then( () => {
                  alert('Avatar subido correctamente')
                })
                .catch( error => {
                  console.log(error)
                  alert('Hubo un error al tratar de subir la imagen')
                })
            })
        } )
        .catch( error => console.log(error) )
    } else {
      console.log(this.user)
      this.userService.editUser(this.user)
        .then( () => alert('Cambios guardados correctamente') )
        .catch( error => {
          alert('Hubo un error')
          console.log(error)
        })
    }

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

}
