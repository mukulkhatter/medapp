import { HttpInterceptorFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * HTTP Interceptor to attach MSAL access token to API requests
 */
export const msalInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  // Skip token attachment for non-API requests
  if (!shouldAttachToken(req)) {
    return next(req);
  }

  // Get token from common auth service method
  return authService.getToken().pipe(
    mergeMap((token) => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authReq);
    }),
    catchError((error) => {
      console.error('Token acquisition failed:', error);
      return next(req);
    })
  );
};

/**
 * Determine if token should be attached to the request
 */
function shouldAttachToken(req: HttpRequest<any>): boolean {
  // Attach token only to your API requests
  const apiUrl = 'http://localhost:5000'; // Update with your API URL
  return req.url.startsWith(apiUrl);
}
