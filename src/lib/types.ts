export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
  size: TodoSize;
  order?: number;
}

export type TodoSize = 'small' | 'medium' | 'large';

export interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  points: number;
} 