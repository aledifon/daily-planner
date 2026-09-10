import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

// Functional HTTP interceptor.
// It runs as part of Angular's HttpClient pipeline.
//
// Request side:
// - Reads the JWT from AuthService.
// - If a token exists, clones the immutable HttpRequest
//   and adds the Authorization header.
//
// Response side:
// - Observes errors coming back through the HTTP Observable.
// - A 401 means the backend rejected the current authentication,
//   so the local session is cleared and the user is redirected to login.
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Dependencies obtained from Angular's DI container.
  const router = inject(Router);
  const authService = inject(AuthService);

  // Token existence only means the frontend has a stored token.
  // The backend is still responsible for validating whether it is valid.
  const token = authService.getToken();

  // Without a token, continue the HTTP pipeline with the original request.
  if (!token) {
    return next(req);
  }

  // HttpRequest is immutable, so it must be cloned to add headers.
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // next(authReq) continues the request through Angular's HTTP pipeline
  // and returns an Observable representing the rest of the HTTP operation.
  //
  // pipe() configures processing for values/errors that will later travel
  // back through that Observable when the backend responds.
  return next(authReq).pipe(

    // catchError() runs only when the HTTP Observable notifies an error.
    catchError((error) => {

      // 401 means authentication was rejected by the backend.
      if (error.status === 401) {
        // Clear token and authenticated user state.
        authService.logout();

        // Redirect to login and replace the current history entry,
        // preventing the protected page from remaining directly behind it.
        router.navigateByUrl('/login', { replaceUrl: true });
      }

      // Propagate the same error instead of swallowing it,
      // so downstream subscribers can still receive it in subscribe.error().
      return throwError(() => error);
    })
  );
};