import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Medicine Management App');
  
  private authService = inject(AuthService);
  protected isLoggedIn$ = this.authService.isLoggedIn$;
  protected currentUser$ = this.authService.currentUser$;

  ngOnInit(): void {
    // Any initialization logic here
  }

  onLogin(): void {
    this.authService.login();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
