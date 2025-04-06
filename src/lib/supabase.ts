import { createClient } from '@supabase/supabase-js';

// هذه القيم يجب أن تأتي من متغيرات البيئة عند النشر
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// إنشاء عميل Supabase للاستخدام في كافة أنحاء التطبيق
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// نوع بيانات المهمة في Supabase
export type TodoRow = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  user_id: string;
  size: 'small' | 'medium' | 'large';
}

// نوع بيانات المستخدم في Supabase
export type UserRow = {
  id: string;
  name: string;
  points: number;
  avatar: string | null;
}

// وظائف التعامل مع المهام
export const todosApi = {
  // استرجاع جميع المهام
  async getAllTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
    
    return data as TodoRow[];
  },
  
  // استرجاع مهام مستخدم معين
  async getUserTodos(userId: string) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user todos:', error);
      return [];
    }
    
    return data as TodoRow[];
  },
  
  // إضافة مهمة جديدة
  async addTodo(todo: Omit<TodoRow, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('todos')
      .insert([todo])
      .select();
    
    if (error) {
      console.error('Error adding todo:', error);
      return null;
    }
    
    return data[0] as TodoRow;
  },
  
  // تحديث حالة المهمة (مكتملة أم لا)
  async toggleTodo(id: string, completed: boolean) {
    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error toggling todo:', error);
      return null;
    }
    
    return data[0] as TodoRow;
  },
  
  // حذف مهمة
  async deleteTodo(id: string) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
    
    return true;
  }
};

// وظائف التعامل مع المستخدمين
export const usersApi = {
  // استرجاع جميع المستخدمين
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    return data as UserRow[];
  },
  
  // استرجاع بيانات مستخدم معين
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data as UserRow;
  },
  
  // تحديث نقاط المستخدم
  async updateUserPoints(userId: string, points: number) {
    const { data, error } = await supabase
      .from('users')
      .update({ points })
      .eq('id', userId)
      .select();
    
    if (error) {
      console.error('Error updating user points:', error);
      return null;
    }
    
    return data[0] as UserRow;
  }
}; 