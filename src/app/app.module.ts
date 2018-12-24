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

@NgModule({
  declarations: [
    AppComponent,
    SuggestionComponent,
    SuggestionDetailComponent,
    MessageComponent,
    DashboardComponent,
    SuggestionSearchComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
