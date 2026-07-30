import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-tasks-page',
  imports: [ReactiveFormsModule], // provides ngSubmit directive.
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit{  
  private readonly taskService = inject(TaskService);  
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected tasks = signal<Task[]>([]); // Initialize an empty array to hold the tasks
  protected readonly isNewTaskVisible = signal(false); 

  // Form fields declaration
  protected readonly newTaskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['', [Validators.required]],
    dueDate: [''],
  });

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

  toogleNewTaskForm(): void {
    this.isNewTaskVisible.set(!this.isNewTaskVisible());
  }

  createTask(): void{
    // if(this.isSubmitting())
    //   return;

    // Stop submission and reveal validation errors if the form is invalid.
    if (this.newTaskForm.invalid) {
      this.newTaskForm.markAllAsTouched();
      return;
    }

    // Reset the UI state for the new create task attempt
    // this.isSubmitting.set(true);
    // this.errorMessage.set(null);
    // this.successMessage.set(null);

    console.log('Creating a new Task with data:', this.newTaskForm.getRawValue());

    this.taskService.createTask(this.newTaskForm.getRawValue()).
      subscribe({
        next: (response) => {          
          // Show the created Task data on the console
          console.log('New Task created successfully:', response.task);
          // Update the Task list again on the Task Page
          // this.showTasks();
          // Updating the signal with the created task we avoid having a 2nd HTTP req.          
          this.tasks.update(tasks => [...tasks, response.task]);

          // Reset the form and hide it again
          this.newTaskForm.reset();
          this.toogleNewTaskForm();

          // this.successMessage.set('Login successful.');
          // this.isSubmitting.set(false);
        },
        error: () => {
          alert("Error while creating a new Task");
          // this.errorMessage.set('Invalid email or password.');
          // this.isSubmitting.set(false);
        }
    });

  }
}
