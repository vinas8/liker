import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'passwordless-auth',
  templateUrl: './passwordless-auth.component.html',
  styleUrls: ['./passwordless-auth.component.scss']
})

export class PasswordlessAuthComponent implements OnInit {
  user;
  userData: User;
  email: string;
  emailSent = false;
  

  errorMessage: string;

  constructor(public afAuth: AngularFireAuth, private router: Router,     private afs: AngularFirestore) {}

  ngOnInit() {
    this.user = this.afAuth.authState;

    const url = this.router.url;

    if (url.includes('signIn')) {
      this.confirmSignIn(url);
    }
  }

  async sendEmailLink() {
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.email,
        environment.actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
      this.emailSent = true;
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url)
          .then((credential) => {
            console.log(credential)
            this.updateUserData(credential.user)
            window.localStorage.setItem('uid', credential.user.uid)
          })

        // this.updateUserData(result)
        window.localStorage.removeItem('emailForSignIn');
        this.router.navigate(['/suggestions'])
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  private updateUserData(user) {
    console.log('updating')
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}