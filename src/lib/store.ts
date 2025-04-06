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
  loadTodos: () => void;
  reorderTodos: (userId: string, startIndex: number, endIndex: number) => void;
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
        const { todos } = get();
        const userTodos = todos.filter(t => t.userId === todo.userId);
        
        const newTodo: Todo = {
          ...todo,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date(),
          order: userTodos.length, // Add default order based on current number of todos
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
      
      loadTodos: () => {
        // This is a placeholder function since data is persisted locally
        // In a real application, this would fetch todos from an API
        console.log('Loading todos from local storage');
      },
      
      reorderTodos: (userId, startIndex, endIndex) => {
        console.log('reorderTodos called with:', { userId, startIndex, endIndex });
        
        try {
          // Get all todos from the store
          const { todos } = get();
          
          // Only get the non-completed todos for reordering for the specific user
          const userPendingTodos = todos.filter(todo => todo.userId === userId && !todo.completed);
          
          // Get all other todos (todos from other users + completed todos for this user)
          const otherTodos = todos.filter(todo => todo.userId !== userId || todo.completed);
          
          console.log('User pending todos before reordering:', userPendingTodos);
          
          // Don't proceed if indices are invalid
          if (startIndex < 0 || endIndex < 0 || startIndex >= userPendingTodos.length || endIndex >= userPendingTodos.length) {
            console.error('Invalid indices:', { startIndex, endIndex, todoCount: userPendingTodos.length });
            return;
          }
          
          // Move the item in the array
          const reorderedTodos = [...userPendingTodos];
          const [movedItem] = reorderedTodos.splice(startIndex, 1);
          reorderedTodos.splice(endIndex, 0, movedItem);
          
          // Update the order property for each item
          const updatedTodos = reorderedTodos.map((todo, index) => ({
            ...todo,
            order: index
          }));
          
          console.log('Reordered todos with updated order:', updatedTodos);
          
          // Combine all todos and update the store
          const newTodos = [...otherTodos, ...updatedTodos];
          
          // Set the new todos array in the store
          set({ todos: newTodos });
          
          console.log('Store updated with new todos array:', newTodos);
        } catch (error) {
          console.error('Error in reorderTodos:', error);
        }
      },
    }),
    {
      name: 'todo-storage',
    }
  )
); 