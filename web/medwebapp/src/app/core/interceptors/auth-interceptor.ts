import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Retrieve token safely from local state or storage
  const authToken = localStorage.getItem('auth_token');

  // If a token exists, clone the request and safely attach the Authorization Header
  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    // Pass the modified request forward to the next handler in line
    return next(clonedRequest);
  }

  // Pass the original request untouched if no token exists
  return next(req);
};
