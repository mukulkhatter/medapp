// selective-preloading.strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {

  // Angular passes every lazy route through this function automatically
  preload(route: Route, load: () => Observable<any>): Observable<any> 
  {
    // Check if the route has the custom 'preload' flag set to true
    if (route.data && route.data['preload'] === true) {

      //console.log(`🚀 Preloading chunk for path: /${route.path}`);
      return load(); // Downloads the file in the background
    }
    
    // Otherwise, do nothing. It will load only on user click.
    return of(null);
  }
}