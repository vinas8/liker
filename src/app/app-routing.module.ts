import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { AuthGuard } from './core/auth.guard'
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component'

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'suggestions', component: SuggestionComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: SuggestionDetailComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: PasswordlessAuthComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
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
