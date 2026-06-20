import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MSAL_INSTANCE, MSAL_GUARD_CONFIG, MsalService, MsalGuard, MsalBroadcastService, MsalGuardConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { routes } from './app.routes';
import { msalConfig, loginRequest } from './msal.config';
import { msalInterceptor } from './http.interceptor';

// Initialize MSAL Public Client Application
const msalInstance = new PublicClientApplication(msalConfig);

const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: loginRequest
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([msalInterceptor])
    ),
    {
      provide: MSAL_INSTANCE,
      useValue: msalInstance
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: msalGuardConfig
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard
  ]
};
