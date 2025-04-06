import React from "react";
import { Todo } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import ResponsiveContainer from "./responsive-container";

interface AiInsightsProps {
  userId: string;
  todos: Todo[];
}

export default function AiInsights({ userId, todos }: AiInsightsProps) {
  const { isRTL } = useLanguage();

  // Simple insights calculations
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = todos.filter((todo) => !todo.completed).length;
  const completionRate =
    todos.length > 0 ? Math.round((completedTasks / todos.length) * 100) : 0;

  return (
    <ResponsiveContainer className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {isRTL ? "تحليلات الذكاء الاصطناعي" : "AI Insights"}
      </h2>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
            {isRTL ? "معدل الإنجاز" : "Completion Rate"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL
              ? `أكملت ${completedTasks} من أصل ${todos.length} مهمات (${completionRate}%).`
              : `You've completed ${completedTasks} out of ${todos.length} tasks (${completionRate}%).`}
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
            {isRTL ? "حالة المهام" : "Task Status"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL
              ? `لديك ${pendingTasks} مهمة معلقة تحتاج إلى اهتمامك.`
              : `You have ${pendingTasks} pending tasks that need your attention.`}
          </p>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
