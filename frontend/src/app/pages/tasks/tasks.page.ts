import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {
  private readonly authService = inject(AuthService);
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login', {  replaceUrl: true });
  }

  showTasks(): void {
    // this.taskService.getTasks();

    this.taskService.getTasks()
      .subscribe({
        // Executed when the HTTP Observable emits a successful response.
        next: (response) => {        
          console.log('Tasks retrieved successfully:', response.task);
        },

        // Executed when the request emits an HTTP or network error.
        error: () => {
          alert("Error while getting Tasks");
        },
    });
  }
}
