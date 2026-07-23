import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',

    // Lazy-loads the LoginPage only when the user navigates to /login.
    // The dynamic import returns a Promise containing the module exports,
    // from which the LoginPage component is selected.
    loadComponent: () => 
      import('./pages/login/login.page')
        .then((m) => m.LoginPage),
  },
];
