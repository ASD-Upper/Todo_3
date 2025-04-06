import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, TodoSize, User, UserStats } from './types';

interface TodoStore {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getUserStats: (userId: string) => UserStats;
  calculatePoints: (userId: string) => number;
}

// Initial users
const initialUsers: User[] = [
  { id: 'user1', name: 'User 1', points: 0, avatar: '/assets/User_1.jpg' },
  { id: 'user2', name: 'User 2', points: 0, avatar: '/assets/User_2.jpg' },
  { id: 'user3', name: 'User 3', points: 0, avatar: '/assets/User_3.jpg' },
];

// Points based on task size
const POINTS_MAP: Record<TodoSize, number> = {
  small: 1,
  medium: 3,
  large: 5,
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      users: initialUsers,
      
      addTodo: (todo) => {
        const newTodo: Todo = {
          ...todo,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date(),
        };
        
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
          users: state.users.map((user) => {
            if (state.todos.find((todo) => todo.id === id && todo.userId === user.id)) {
              return {
                ...user,
                points: get().calculatePoints(user.id),
              };
            }
            return user;
          }),
        }));
      },
      
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      
      getUserStats: (userId) => {
        const { todos } = get();
        const userTodos = todos.filter((todo) => todo.userId === userId);
        
        return {
          totalTasks: userTodos.length,
          completedTasks: userTodos.filter((todo) => todo.completed).length,
          pendingTasks: userTodos.filter((todo) => !todo.completed).length,
          points: get().calculatePoints(userId),
        };
      },
      
      calculatePoints: (userId) => {
        const { todos } = get();
        const userTodos = todos.filter(
          (todo) => todo.userId === userId && todo.completed
        );
        
        return userTodos.reduce((total, todo) => {
          return total + POINTS_MAP[todo.size];
        }, 0);
      },
    }),
    {
      name: 'todo-storage',
    }
  )
); 