"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AiInsights from "@/components/ai-insights";
import TaskList from "@/components/task-list";
import TodoForm from "@/components/todo-form";
import UserStats from "@/components/user-stats";
import { useTodoStore } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";
import ResponsiveContainer from "@/components/responsive-container";

export default function UserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const { todos, users, getUserStats } = useTodoStore();
  const userTodos = todos.filter((todo) => todo.userId === userId);
  const { isRTL } = useLanguage();
  const [showAiInsights, setShowAiInsights] = useState(false);
  const stats = getUserStats(userId);

  // Find the user to get their name and avatar
  const user = users.find((u) => u.id === userId);
  const username = user?.name || "";
  const avatar = user?.avatar;

  useEffect(() => {
    // This is where we would fetch data for a specific user
    useTodoStore.getState().loadTodos();
  }, [userId]);

  return (
    <div className="pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {isRTL ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isRTL
              ? `مهام ${
                  userId === "user1"
                    ? "المستخدم 1"
                    : userId === "user2"
                    ? "المستخدم 2"
                    : "المستخدم 3"
                }`
              : `${
                  userId === "user1"
                    ? "User 1"
                    : userId === "user2"
                    ? "User 2"
                    : "User 3"
                }'s Tasks`}
          </h1>
        </div>
        <button
          onClick={() => setShowAiInsights(!showAiInsights)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          {showAiInsights
            ? isRTL
              ? "إخفاء تحليلات الذكاء الاصطناعي"
              : "Hide AI Insights"
            : isRTL
            ? "عرض تحليلات الذكاء الاصطناعي"
            : "Show AI Insights"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ResponsiveContainer className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <TodoForm userId={userId} />
          </ResponsiveContainer>

          <ResponsiveContainer className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {isRTL ? "قائمة المهام" : "Task List"}
              <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {userTodos.length}
              </span>
            </h2>

            {userTodos.length === 0 ? (
              <div className="text-center py-6">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {isRTL ? "لا توجد مهام" : "No tasks"}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {isRTL
                    ? "ابدأ بإضافة مهمة جديدة باستخدام النموذج أعلاه."
                    : "Get started by adding a new task using the form above."}
                </p>
              </div>
            ) : (
              <TaskList todos={userTodos} />
            )}
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <UserStats userId={userId} username={username} avatar={avatar} />

          {showAiInsights && <AiInsights userId={userId} todos={userTodos} />}
        </div>
      </div>
    </div>
  );
}
