import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';
import { AuthGuard } from './core/auth.guard'
import { AuthService } from './core/auth.service';
import { CoreModule } from './core/core.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
// import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    SuggestionComponent,
    PasswordlessAuthComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'like-master'),
    FormsModule,
    AngularFireAuthModule, 
    AngularFirestoreModule.enablePersistence(),
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [ AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
