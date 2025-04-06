import { create } from 'zustand';
import { TodoRow, UserRow, todosApi, usersApi } from './supabase';
import { Todo, User, TodoSize, UserStats } from './types';

// تحويل نوع البيانات من Supabase إلى النوع المستخدم في التطبيق
const mapTodoFromSupabase = (todo: TodoRow): Todo => ({
  id: todo.id,
  title: todo.title,
  description: todo.description || undefined,
  completed: todo.completed,
  createdAt: new Date(todo.created_at),
  userId: todo.user_id,
  size: todo.size as TodoSize
});

// تحويل نوع البيانات من التطبيق إلى النوع المستخدم في Supabase
const mapTodoToSupabase = (todo: Omit<Todo, 'id' | 'createdAt'>): Omit<TodoRow, 'id' | 'created_at'> => ({
  title: todo.title,
  description: todo.description || null,
  completed: todo.completed,
  user_id: todo.userId,
  size: todo.size
});

// تحويل نوع بيانات المستخدم من Supabase إلى النوع المستخدم في التطبيق
const mapUserFromSupabase = (user: UserRow): User => ({
  id: user.id,
  name: user.name,
  points: user.points,
  avatar: user.avatar || undefined
});

// النقاط المخصصة لكل حجم مهمة
const POINTS_MAP: Record<TodoSize, number> = {
  small: 1,
  medium: 3,
  large: 5,
};

interface TodoStore {
  todos: Todo[];
  users: User[];
  isLoading: boolean;
  loadTodos: () => Promise<void>;
  loadUsers: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  getUserStats: (userId: string) => UserStats;
  calculatePoints: (userId: string) => number;
}

export const useSupabaseTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  users: [],
  isLoading: false,
  
  // تحميل جميع المهام من Supabase
  loadTodos: async () => {
    set({ isLoading: true });
    try {
      const supabaseTodos = await todosApi.getAllTodos();
      const todos = supabaseTodos.map(mapTodoFromSupabase);
      set({ todos, isLoading: false });
    } catch (error) {
      console.error('Failed to load todos:', error);
      set({ isLoading: false });
    }
  },
  
  // تحميل جميع المستخدمين من Supabase
  loadUsers: async () => {
    set({ isLoading: true });
    try {
      const supabaseUsers = await usersApi.getAllUsers();
      const users = supabaseUsers.map(mapUserFromSupabase);
      set({ users, isLoading: false });
    } catch (error) {
      console.error('Failed to load users:', error);
      set({ isLoading: false });
    }
  },
  
  // إضافة مهمة جديدة
  addTodo: async (todo) => {
    set({ isLoading: true });
    try {
      const supabaseTodo = mapTodoToSupabase(todo);
      const newTodo = await todosApi.addTodo(supabaseTodo);
      
      if (newTodo) {
        const mappedTodo = mapTodoFromSupabase(newTodo);
        set(state => ({ 
          todos: [...state.todos, mappedTodo],
          isLoading: false 
        }));
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
      set({ isLoading: false });
    }
  },
  
  // تبديل حالة المهمة (مكتملة/غير مكتملة)
  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;
    
    set({ isLoading: true });
    try {
      const updatedTodo = await todosApi.toggleTodo(id, !todo.completed);
      
      if (updatedTodo) {
        // تحديث المهمة في القائمة المحلية
        set(state => ({
          todos: state.todos.map((t) => 
            t.id === id ? mapTodoFromSupabase(updatedTodo) : t
          ),
          isLoading: false
        }));
        
        // تحديث نقاط المستخدم
        const userId = todo.userId;
        const points = get().calculatePoints(userId);
        await usersApi.updateUserPoints(userId, points);
        
        // تحديث بيانات المستخدم في المخزن المحلي
        const updatedUser = await usersApi.getUser(userId);
        if (updatedUser) {
          set(state => ({
            users: state.users.map((u) => 
              u.id === userId ? mapUserFromSupabase(updatedUser) : u
            )
          }));
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      set({ isLoading: false });
    }
  },
  
  // حذف مهمة
  deleteTodo: async (id) => {
    set({ isLoading: true });
    try {
      const success = await todosApi.deleteTodo(id);
      
      if (success) {
        set(state => ({
          todos: state.todos.filter((todo) => todo.id !== id),
          isLoading: false
        }));
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
      set({ isLoading: false });
    }
  },
  
  // الحصول على إحصائيات المستخدم
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
  
  // حساب النقاط
  calculatePoints: (userId) => {
    const { todos } = get();
    const userTodos = todos.filter(
      (todo) => todo.userId === userId && todo.completed
    );
    
    return userTodos.reduce((total, todo) => {
      return total + POINTS_MAP[todo.size];
    }, 0);
  },
})); 