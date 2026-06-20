// src/app/core/services/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { required, schema } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5001/api/User/IsUserAuthenticated'; // Replace with your real backend endpoint
  
  // Track login state reliably using a read-only public Signal
  readonly isAuthenticated = signal<boolean>(this.hasToken());
  
  /**
   * Sends user credentials to the API endpoint.
   * Transforms the server result into a boolean flag for your UI flows.
   */
  login(credentials: LoginCredentials): Observable<boolean> {

    debugger;

    localStorage.setItem('auth_token', 'true');
    this.isAuthenticated.set(true);

    return of(true);
    // return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
    //   map((response: AuthResponse) => {
    //     // If the API explicitly returns success: true, the user is authenticated
    //     if (response && response.success) {
    //       if (response.token) {
    //         localStorage.setItem('auth_token', response.token);
    //       }
    //       this.isAuthenticated.set(true);
    //       return true;
    //     }
        
    //     this.clearSession();
    //     return false;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     // Fallback gracefully on network failures, 401 Unauthorized, or 500 server crashes
    //     this.clearSession();
    //     return of(false); 
    //   })
    // );
  }


  logout(): void {
    this.clearSession();
  }


private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  private clearSession(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.set(false);
  }
}



export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;   // Backend returns true if authenticated, false otherwise
  token?: string;     // Optional API session token 
  message?: string;   // Optional error or status string
}

export const initialLoginData:LoginCredentials={
  email:'',
  password:'',
};

export const UserSchema= schema<LoginCredentials>((rootpath)=>{
  required(rootpath.email,{message:'Email is required'});

  required(rootpath.password,{message:'Password is required'});
});
