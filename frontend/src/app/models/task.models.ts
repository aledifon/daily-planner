export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
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
