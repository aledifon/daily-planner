import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TaskListResponse } from '../models/task.models';

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
}
