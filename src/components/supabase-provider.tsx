'use client';

import { useEffect } from 'react';
import { useSupabaseTodoStore } from '@/lib/store-supabase';

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadTodos, loadUsers } = useSupabaseTodoStore();

  useEffect(() => {
    // تحميل البيانات عند بدء التطبيق
    loadUsers();
    loadTodos();
  }, [loadTodos, loadUsers]);

  return <>{children}</>;
} 