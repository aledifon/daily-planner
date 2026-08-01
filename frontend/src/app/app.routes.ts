import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    // Lazy-loads the LoginPage only when the user navigates to /login.
    // The dynamic import returns a Promise containing the module exports,
    // from which the LoginPage component is selected.
    loadComponent: () => 
      import('./pages/login/login.page')
        .then((m) => m.LoginPage),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/tasks/tasks.page')
        .then((m) => m.TasksPage),
  },
];
