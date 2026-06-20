// src/app/core/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Use functional inject inside the interceptor stream

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Session expired. Redirecting to login...');
        localStorage.removeItem('auth_token');
        router.navigate(['/user-login']);
      }
      
      // Bubble the error up to the consuming component to display UI alerts
      return throwError(() => error);
    })
  );
};
