import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task, UpdateTaskRequest } from '../../models/task.models';

import { TaskCard } from '../../components/task-card/task-card';

@Component({
  selector: 'app-tasks-page',
  imports: [ReactiveFormsModule, TaskCard], // provides ngSubmit directive.
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit{  
  private readonly taskService = inject(TaskService);  
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected tasks = signal<Task[]>([]); // Initialize an empty array to hold the tasks
  protected taskFormMode = signal<'create' | 'update' | null>('create');
  protected selectedTask = signal<Task | null>(null); // Initialize with null, indicating no task is selected
  protected readonly isTaskModalVisible = signal(false);   

  // Forms fields declaration
  protected readonly taskForm = this.formBuilder.group({
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

  resetTaskForm(): void{
    if (this.taskFormMode() == 'update')
      this.selectedTask.set(null);          // Only when coming from update task.

    this.taskFormMode.set(null);
    this.taskForm.reset();    
    this.isTaskModalVisible.set(false);        
  }  

  onCloseTaskModal(): void{
    this.resetTaskForm();    
  }

  onDefineNewTask(): void {
    this.taskForm.reset();
    this.selectedTask.set(null);
    this.taskFormMode.set('create');
    this.isTaskModalVisible.set(true);
  }

  onEditTask(task: Task): void{        
    this.taskFormMode.set('update');

    const initialValue: UpdateTaskRequest = {
      title: task.title, 
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ?? ''
    };

    this.taskForm.setValue(initialValue);
    this.selectedTask.set(task);

    this.isTaskModalVisible.set(true);
  }

  onSubmitTaskForm(): void{    
    // Stop submission and reveal validation errors if the form is invalid.
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();      
      return;
    }

    if(!this.taskFormMode()){
      this.resetTaskForm();
      return;
    }      
    else if(this.taskFormMode() == 'create'){
      this.createTask();
    }
    else if (this.taskFormMode() == 'update'){
      const selectedTask = this.selectedTask();

      if(!selectedTask){
        this.resetTaskForm();
        return;
      }

      this.updateTask(selectedTask);
    }
  }  
  
  createTask(): void{
    console.log('Creating a new Task with data:', this.taskForm.getRawValue());

    this.taskService.createTask(this.taskForm.getRawValue()).
      subscribe({
        next: (response) => {          
          // Show the created Task data on the console
          console.log('New Task created successfully:', response.task);
          // Update the Task list again on the Task Page
          // this.showTasks();
          // Updating the signal with the created task we avoid having a 2nd HTTP req.          
          this.tasks.update(tasks => [...tasks, response.task]);

          // Reset the form and hide it again
          this.resetTaskForm();

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

  updateTask(task: Task): void{    
    const payload: UpdateTaskRequest = 
      this.taskForm.getRawValue();

    console.log(
      `Updating the Task with id: ${task._id} with data:`,
      payload
    );

    this.taskService.updateTask(task._id, payload)
      .subscribe({
        next: (response) => {                    
          console.log(
            'Task updated successfully:', 
            response.task
          );
          
          // Update the Task list again on the Task Page
          // this.showTasks();                
          this.tasks.update(tasks => 
            tasks.map(currentTask => 
              currentTask._id === response.task._id 
                ? response.task
                : currentTask
            )
          );

          // Reset the form and hide it again
          this.resetTaskForm();        
        },

        error: () => {
          alert("Error while updating the Task");                
        }
    });
  }
  
  onDeleteTask(task: Task): void{
    // User confirmation before deleting the task
    if (!window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    )) {
      return;
    }

    this.deleteTask(task._id);
  }

  deleteTask(id: string): void{
    console.log('Deleting the Task with id:', id);

    this.taskService.deleteTask(id).
      subscribe({
        next: (response) => {                    
          console.log('Task deleted successfully:', response.task);

          // Updating the signal deleting the current task from the list (we avoid having a 2nd HTTP req.)
          this.tasks.update(tasks => 
            tasks.filter(task => task._id !== id)
          );
        },
        error: () => {
          alert("Error while deleting the Task");          
        }
    });
    
  }
}
