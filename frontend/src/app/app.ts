import { Component, OnInit,signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('daily-planner-frontend');
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void{
    if(this.authService.isAuthenticated){
      console.log('The user is authenticated. Going to the private area of the application');
      this.router.navigate(['/tasks']);
    }
    else{
      console.log('The user is not authenticated. Going to the login page of the application');
      this.router.navigate(['/login']);
    }
  }
}
