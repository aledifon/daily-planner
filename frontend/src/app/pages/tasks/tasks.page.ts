import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit{  
  private readonly taskService = inject(TaskService);  
  protected tasks = signal<Task[]>([]); // Initialize an empty array to hold the tasks

  ngOnInit(): void {
    this.showTasks();
  }

  showTasks(): void {
    // this.taskService.getTasks();

    this.taskService.getTasks()
      .subscribe({
        // Executed when the HTTP Observable emits a successful response.
        next: (response) => { 
          this.tasks.set(response.task);       
          console.log('Tasks retrieved successfully:', this.tasks());          
        },

        // Executed when the request emits an HTTP or network error.
        error: () => {
          alert("Error while getting Tasks");
        },
    });
  }
}
