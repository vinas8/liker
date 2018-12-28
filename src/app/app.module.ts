import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';
import { AuthGuard } from './core/auth.guard'
import { AuthService } from './core/auth.service';
import { CoreModule } from './core/core.module';

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
    AppRoutingModule,
    AngularFireAuthModule, 
    AngularFirestoreModule.enablePersistence(),
    CoreModule
  ],
  providers: [ AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
