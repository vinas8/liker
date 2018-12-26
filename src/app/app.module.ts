import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

import { FormsModule } from '@angular/forms';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { SuggestionSearchComponent } from './suggestion-search/suggestion-search.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CoreModule } from './core/core.module';
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';
import { AuthGuard } from './core/auth.guard'
import { AuthService } from './core/auth.service'

@NgModule({
  declarations: [
    AppComponent,
    SuggestionComponent,
    SuggestionDetailComponent,
    MessageComponent,
    DashboardComponent,
    SuggestionSearchComponent,
    UserLoginComponent,
    UserProfileComponent,
    PasswordlessAuthComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
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
