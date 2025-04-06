import React, { useState, useEffect } from "react";
import { Todo } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import ResponsiveContainer from "./responsive-container";

interface AiInsightsProps {
  userId: string;
  todos: Todo[];
}

export default function AiInsights({ userId, todos }: AiInsightsProps) {
  const { isRTL } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState({
    completedTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
  });

  useEffect(() => {
    try {
      // Simulate processing delay to make the component feel more "AI-like"
      setLoading(true);
      setError(null);

      setTimeout(() => {
        // Simple insights calculations
        const completedTasks = todos.filter((todo) => todo.completed).length;
        const pendingTasks = todos.filter((todo) => !todo.completed).length;
        const completionRate =
          todos.length > 0
            ? Math.round((completedTasks / todos.length) * 100)
            : 0;

        setInsights({
          completedTasks,
          pendingTasks,
          completionRate,
        });

        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error calculating insights:", err);
      setError(
        isRTL ? "حدث خطأ أثناء تحليل البيانات." : "Error analyzing data."
      );
      setLoading(false);
    }
  }, [todos, userId, isRTL]);

  if (loading) {
    return (
      <ResponsiveContainer className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {isRTL ? "تحليلات الذكاء الاصطناعي" : "AI Insights"}
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {isRTL ? "جاري التحليل..." : "Analyzing..."}
          </span>
        </div>
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {isRTL ? "تحليلات الذكاء الاصطناعي" : "AI Insights"}
        </h2>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h3 className="font-medium text-red-700 dark:text-red-300 mb-2">
            {isRTL ? "خطأ" : "Error"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isRTL ? "التوصيات" : "Recommendations"}
            </h4>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li>{isRTL ? "حاول مرة أخرى لاحقًا" : "Try again later"}</li>
              <li>{isRTL ? "تحقق من اتصالك" : "Check your connection"}</li>
              <li>
                {isRTL
                  ? "اتصل بالدعم إذا استمرت المشكلة"
                  : "Contact support if the issue persists"}
              </li>
            </ul>
          </div>
        </div>
      </ResponsiveContainer>
    );
  }

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
              ? `أكملت ${insights.completedTasks} من أصل ${todos.length} مهمات (${insights.completionRate}%).`
              : `You've completed ${insights.completedTasks} out of ${todos.length} tasks (${insights.completionRate}%).`}
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
            {isRTL ? "حالة المهام" : "Task Status"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL
              ? `لديك ${insights.pendingTasks} مهمة معلقة تحتاج إلى اهتمامك.`
              : `You have ${insights.pendingTasks} pending tasks that need your attention.`}
          </p>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
