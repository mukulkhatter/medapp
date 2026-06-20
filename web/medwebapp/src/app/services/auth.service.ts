import { Injectable, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { apiScopes } from '../msal.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private msalService = inject(MsalService);

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isMsalInitializedSubject = new BehaviorSubject<boolean>(false);
  private isMsalInitialized$ = this.isMsalInitializedSubject.asObservable();

  constructor() {
    this.msalService.initialize().subscribe({
      next: () => {
        this.isMsalInitializedSubject.next(true);
        this.updateLoginStatus();
        this.subscribeToAuthChanges();
        this.msalService.handleRedirectObservable().subscribe({
          next: (result) => {
            if (result?.account) {
              this.handleAuthResult(result);
            } else {
              this.updateLoginStatus();
            }
          },
          error: (error) => {
            console.error('MSAL redirect handling failed:', error);
          }
        });
      },
      error: (error) => {
        console.error('MSAL initialization failed:', error);
      }
    });
  }

  private whenMsalReady<T>(request: () => Observable<T>): Observable<T> {
    return this.isMsalInitialized$.pipe(
      filter(initialized => initialized),
      take(1),
      switchMap(() => request())
    );
  }

  /**
   * Trigger login redirect flow
   */
  login(): void {
    this.whenMsalReady(() => this.msalService.loginRedirect({
      scopes: ['User.Read'],
      prompt: 'select_account'
    })).subscribe({
      error: (error) => {
        console.error('MSAL login redirect failed:', error);
      }
    });
  }

  /**
   * Trigger login redirect (full-page redirect)
   */
  loginRedirect(): void {
    this.login();
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  /**
   * Get access token for API calls
   */
  getAccessToken(scopes: string[]): Observable<string> {
    return this.whenMsalReady(() =>
      new Observable(observer => {
        const account = this.msalService.instance.getActiveAccount();
        if (!account) {
          observer.error(new Error('No active account'));
          return;
        }

        this.msalService.acquireTokenSilent({
          scopes,
          account: account,
        }).subscribe(
          (result: AuthenticationResult) => {
            observer.next(result.accessToken);
            observer.complete();
          },
          (error) => {
            if (error instanceof InteractionRequiredAuthError) {
              this.msalService.acquireTokenPopup({
                scopes,
                account: account,
              }).subscribe(
                (result: AuthenticationResult) => {
                  observer.next(result.accessToken);
                  observer.complete();
                },
                err => observer.error(err)
              );
            } else {
              observer.error(error);
            }
          }
        );
      })
    );
  }

  /**
   * Get access token for API calls (common scopes)
   */
  getToken(): Observable<string> {
    const scopes = apiScopes.scopes; // Set once here
    return this.getAccessToken(scopes);
  }

  /**
   * Get current user account
   */
  getCurrentUser() {
    return this.msalService.instance.getActiveAccount();
  }

  /**
   * Update login status
   */
  private updateLoginStatus(): void {
    const account = this.msalService.instance.getActiveAccount();
    this.isLoggedInSubject.next(account !== null);
    this.currentUserSubject.next(account);
  }

  /**
   * Subscribe to authentication changes
   */
  private subscribeToAuthChanges(): void {
    this.msalService.instance.addEventCallback((event: any) => {
      if (event.eventType === 'msal:loginSuccess' || event.eventType === 'msal:acquireTokenSuccess') {
        this.updateLoginStatus();
      } else if (event.eventType === 'msal:logout') {
        this.updateLoginStatus();
      }
    });
  }

  /**
   * Handle authentication result
   */
  private handleAuthResult(result: AuthenticationResult): void {
    this.msalService.instance.setActiveAccount(result.account);
    this.updateLoginStatus();
  }
}
