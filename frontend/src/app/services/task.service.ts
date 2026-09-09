import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateTaskRequest, UpdateTaskRequest, TaskListResponse, TaskResponse } from '../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);    
  private readonly tasksApiUrl = 'http://localhost:3977/api/tasks';  

  getTasks(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(this.tasksApiUrl);
  }

  createTask(payload: CreateTaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.tasksApiUrl, payload);
  }

  deleteTask(id: string): Observable<TaskResponse>{
    return this.http.delete<TaskResponse>(`${this.tasksApiUrl}/${id}`);
  }

  updateTask(id: string, payload: UpdateTaskRequest): Observable<TaskResponse>{
    return this.http.put<TaskResponse>(`${this.tasksApiUrl}/${id}`, payload);  
  }
}
