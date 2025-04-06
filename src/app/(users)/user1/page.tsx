"use client";

import React from "react";
import Navbar from "@/components/navbar";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import UserStats from "@/components/user-stats";
import { useTodoStore } from "@/lib/store";

export default function User1Page() {
  const userId = "user1";
  const username = "User 1";
  const { users } = useTodoStore();
  const user = users.find((u) => u.id === userId);
  const avatar = user?.avatar;

  return (
    <main>
      <Navbar />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {username}&apos;s Tasks
        </h1>
        <p className="text-gray-600 mb-1">
          Manage your tasks and track your productivity
        </p>
        <p className="text-gray-600 rtl">
          إدارة المهام الخاصة بك وتتبع إنتاجيتك
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TodoForm userId={userId} />
          <TodoList userId={userId} />
        </div>

        <div className="md:col-span-1">
          <UserStats userId={userId} username={username} avatar={avatar} />
        </div>
      </div>
    </main>
  );
}
