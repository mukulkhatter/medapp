import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const msalService = inject(MsalService);
  const authService = inject(AuthService);

  // Check if user is authenticated
  const account = msalService.instance.getActiveAccount();

  if (account) {
    return true; // Allow navigation if authenticated
  } else {
    // Call single method from auth service
    authService.login();
    return false; // Block navigation until login is complete
  }
};