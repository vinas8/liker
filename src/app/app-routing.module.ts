import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { AuthGuard } from './core/auth.guard'
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component'

const routes: Routes = [
  { path: 'suggestions', component: SuggestionComponent, canActivate: [AuthGuard] },
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
