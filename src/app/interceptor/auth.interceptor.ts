import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the auth token
  const token = authService.getToken();


  // Clone the request and add the authorization header if token exists
  const authReq = token ? 
    req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // Send the request and handle errors
  return next(authReq)
      .pipe(
        catchError((error)=> {
          if (error.status === 401) {
            // Token is invalid or expired - handle accordingly
            authService.logout();
            router.navigate(['/login']);
            
          }
          return throwError(() => error);

        })
      )
      
};
