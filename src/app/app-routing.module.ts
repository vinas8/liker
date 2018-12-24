import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'suggestions', component: SuggestionComponent },
  { path: 'detail/:id', component: SuggestionDetailComponent },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { 

}
