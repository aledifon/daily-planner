export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: string | null;
  plannedDate: string | null;
  completedAt: string | null;
  createdAt: string;
}

export interface TaskResponse {
  status: 'success',
  task: Task,
}

export interface TaskListResponse {
  status: 'success',
  task: Task[],
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string | null;
  plannedDate: string | null;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  dueDate: string | null;
  plannedDate: string | null;
}
