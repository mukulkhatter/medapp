import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  debugger;


  const ss=route.url;

  const authService=inject(AuthService);

  const router=inject(Router);

  // Check your application's authentication state
  if (authService.isAuthenticated()) {
    return true; // Allow navigation
  }

  // Redirect unauthorized users to the login route
  return router.createUrlTree(['/user-login']);
};


// export function hasRole(requiredRole: string): CanActivateFn {
//   return (route, state) => {
//     const userRole = inject(UserService).getRole();
//     const router = inject(Router);

//     if (userRole === requiredRole) {
//       return true;
//     }

//     return router.createUrlTree(['/unauthorized']);
//   };
// }