import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { SelectivePreloadingStrategy } from './selective-preloading.strategy';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error-inceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    //provideRouter(routes),

    // Activates background preloading across all lazy chunks
    //provideRouter(routes, withPreloading(PreloadAllModules)),

    //provideRouter(routes,withPreloading(SelectivePreloadingStrategy)),

    //This extracts router parameters and sends them straight to component inputs
    //provideRouter(routes,withComponentInputBinding()),

    provideRouter(routes,withPreloading(SelectivePreloadingStrategy),withComponentInputBinding()),

    //provideHttpClient()

    // Setup HttpClient and register your custom interceptor functions in sequential order
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor]))
  ]
};
