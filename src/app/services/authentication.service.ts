import { Injectable } from '@angular/core';

import { AngularFireAuth } from'@angular/fire/auth';
import * as firebase  from'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loginWithEmail(email:string, password:string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  registerWithEmail(email:string, password:string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.angularFireAuth.auth.onAuthStateChanged;
  }

  logOut() {
    return this.angularFireAuth.auth.signOut();
  }

}
