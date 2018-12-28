import { SuggestionComponent } from './suggestion/suggestion.component';
import { AuthGuard } from './core/auth.guard';
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';
import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
  { path: 'suggestions', component: SuggestionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: PasswordlessAuthComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
