import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateTaskRequest, UpdateTaskRequest, TaskListResponse, TaskResponse } from '../models/task.models';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);    
  private readonly tasksApiUrl = 'http://localhost:3977/api/tasks';

  private readonly authService = inject(AuthService);  

  getTasks(): Observable<TaskListResponse> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<TaskListResponse>(this.tasksApiUrl, {headers});
  }

  createTask(payload: CreateTaskRequest): Observable<TaskResponse> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<TaskResponse>(this.tasksApiUrl, payload, {headers});
  }

  deleteTask(id: string): Observable<TaskResponse>{
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<TaskResponse>(`${this.tasksApiUrl}/${id}`, {headers});
  }

  updateTask(id: string, payload: UpdateTaskRequest): Observable<TaskResponse>{
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<TaskResponse>(`${this.tasksApiUrl}/${id}`, payload, {headers});
  
  }
}
