import React, { useState } from "react";
import Image from "next/image";
import { useTodoStore } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";
import { Button } from "./ui/button";
import { analyzeUserPerformance } from "@/lib/ai-service";
import { UserStats as IUserStats } from "@/lib/types";
import ResponsiveContainer from "./responsive-container";

interface UserStatsProps {
  userId: string;
  username: string;
  avatar?: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId, username, avatar }) => {
  const { getUserStats } = useTodoStore();
  const { isRTL } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    analysis: string;
    recommendations: string[];
    performance: string;
  } | null>(null);

  const stats = getUserStats(userId);

  const getAIAnalysis = async () => {
    setLoading(true);
    try {
      const analysis = await analyzeUserPerformance(stats, username);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error("Error getting AI analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "text-emerald-600";
      case "good":
        return "text-blue-600";
      case "average":
        return "text-amber-600";
      case "needs-improvement":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case "excellent":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "good":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
          </svg>
        );
      case "average":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "needs-improvement":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const translatePerformance = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "ممتاز";
      case "good":
        return "جيد";
      case "average":
        return "متوسط";
      case "needs-improvement":
        return "يحتاج إلى تحسين";
      default:
        return "";
    }
  };

  return (
    <div className="mb-6 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <ResponsiveContainer className="mb-5">
        <div className="flex items-center gap-3">
          {avatar && (
            <Image
              src={avatar}
              alt={username}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          )}
          <h2 className="text-xl font-bold text-gray-800">
            {isRTL ? `إحصائيات ${username}` : `${username}'s Statistics`}
          </h2>
        </div>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <StatCard
          title={isRTL ? "إجمالي المهام" : "Total Tasks"}
          value={stats.totalTasks}
          icon="clipboard-list"
        />
        <StatCard
          title={isRTL ? "المهام المكتملة" : "Completed Tasks"}
          value={stats.completedTasks}
          icon="check"
        />
        <StatCard
          title={isRTL ? "المهام المعلقة" : "Pending Tasks"}
          value={stats.pendingTasks}
          icon="clock"
        />
        <StatCard
          title={isRTL ? "مجموع النقاط" : "Total Points"}
          value={stats.points}
          highlight
          icon="star"
        />
      </div>

      <div className="mt-5 flex justify-center">
        <Button
          onClick={getAIAnalysis}
          isLoading={loading}
          disabled={loading || stats.totalTasks === 0}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M13.5 4.938a7 7 0 11-9.417 1.17.75.75 0 111.5-.334 5.5 5.5 0 107.596-3.115.75.75 0 01.921 1.174 7 7 0 01-1.152.607A4.002 4.002 0 0112 9h4a.75.75 0 010 1.5h-4a2.5 2.5 0 01-2.5 2.5c0 .87.26 1.68.705 2.355a.75.75 0 11-1.252.814A6.503 6.503 0 018 13.5a5 5 0 015-5c.324 0 .64.03.947.086A.75.75 0 0114.5 8c0-.146-.012-.29-.036-.43.004-.013.01-.026.014-.039zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9z"
                clipRule="evenodd"
              />
            </svg>
            {loading
              ? isRTL
                ? "جاري التحليل..."
                : "Analyzing..."
              : isRTL
              ? "الحصول على تحليل الذكاء الاصطناعي"
              : "Get AI Analysis"}
          </span>
        </Button>
      </div>

      {aiAnalysis && (
        <div className="mt-6 p-5 border border-blue-200 rounded-lg bg-blue-50">
          <ResponsiveContainer className="mb-3">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path
                  fillRule="evenodd"
                  d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              {isRTL ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}
            </h3>
          </ResponsiveContainer>

          <ResponsiveContainer className="mb-5">
            <p className="text-gray-700 leading-relaxed">
              {aiAnalysis.analysis}
            </p>
          </ResponsiveContainer>

          <ResponsiveContainer className="mb-3">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm-.75 11.5a.75.75 0 001.5 0v-4.5a.75.75 0 00-1.5 0v4.5z"
                  clipRule="evenodd"
                />
                <path d="M10 8a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {isRTL ? "التوصيات" : "Recommendations"}
            </h4>
          </ResponsiveContainer>

          <ul className="list-none mb-5 space-y-2">
            {aiAnalysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <ResponsiveContainer>
                  <span>{rec}</span>
                </ResponsiveContainer>
              </li>
            ))}
          </ul>

          <div className="mt-5 p-3 bg-white border border-gray-200 rounded-lg flex justify-between items-center">
            <span className="font-bold text-gray-800 flex items-center gap-2">
              {isRTL ? "تقييم الأداء: " : "Performance Rating: "}
              <span
                className={`font-bold ${getPerformanceColor(
                  aiAnalysis.performance
                )} flex items-center gap-1`}
              >
                {getPerformanceIcon(aiAnalysis.performance)}
                {isRTL
                  ? translatePerformance(aiAnalysis.performance)
                  : aiAnalysis.performance.charAt(0).toUpperCase() +
                    aiAnalysis.performance.slice(1)}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  highlight?: boolean;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  highlight,
  icon,
}) => {
  const { isRTL } = useLanguage();

  const renderIcon = () => {
    switch (icon) {
      case "clipboard-list":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 ${
              highlight ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5v-3.379a3 3 0 00-.879-2.121l-3.12-3.121a3 3 0 00-1.923-.88 2.997 2.997 0 00-1.12.183V5.25a2.25 2.25 0 012.25-2.25h.012a2.25 2.25 0 012.5.003l3.769.001zM13.5 18a.75.75 0 01-.75.75h-9a.75.75 0 010-1.5h9a.75.75 0 01.75.75zm-8.25-4.5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm3 0a.75.75 0 01-.75.75H6a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm3 0a.75.75 0 01-.75.75H9a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM6 11.25a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm3 0a.75.75 0 01-.75.75H6.75a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "check":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 ${
              highlight ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "clock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 ${
              highlight ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 ${
              highlight ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          {renderIcon()}
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-blue-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default UserStats;
