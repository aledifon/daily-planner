import { Component, OnInit, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('daily-planner-frontend');  
  
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);  

  // ngOnInit(): void {
  //   if (!this.authService.isAuthenticated()) {
  //     this.router.navigateByUrl('/login', {
  //       replaceUrl: true
  //     });

  //     return;
  //   }

  //   this.authService.getUserInfo().subscribe({
  //     next: (response) => {
  //       this.authService.saveAuthenticatedUser(response.user);

  //       this.router.navigateByUrl('/tasks', {
  //         replaceUrl: true
  //       });
  //     },

  //     error: () => {
  //       this.authService.logout();

  //       this.router.navigateByUrl('/login', {
  //         replaceUrl: true
  //       });
  //     }
  //   });
  // }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {            
      return;
    }

    this.authService.getUserInfo().subscribe({
      next: (response) => {
        this.authService.saveAuthenticatedUser(response.user);        
      },

      error: () => {
        this.authService.logout();
      }
    });
  }

  // The Logout button will only be visible if the use is already authenticated.
  logout(): void {
    console.log('The user has logged out. Going to the login page');
    this.authService.logout();
    this.router.navigateByUrl('/login', {  replaceUrl: true });
  }
}
