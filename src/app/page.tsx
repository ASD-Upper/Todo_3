"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { useTodoStore } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";
import ResponsiveContainer from "@/components/responsive-container";

export default function Home() {
  const { isRTL, language } = useLanguage();

  return (
    <main>
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
          {isRTL
            ? "قائمة المهام المدعومة بالذكاء الاصطناعي"
            : "AI-Powered ToDo List"}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2 max-w-3xl mx-auto">
          {isRTL
            ? "إدارة المهام والحصول على رؤى الذكاء الاصطناعي حول الإنتاجية"
            : "Manage tasks and get AI insights on productivity"}
        </p>
      </div>

      <Navbar />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <ResponsiveContainer>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {isRTL ? "أهلا بك! 👋" : "Welcome! 👋"}
            </h2>
          </ResponsiveContainer>
        </div>

        <ResponsiveContainer className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {isRTL
              ? "هذا تطبيق قائمة مهام للعديد من المستخدمين مع تحليلات مدعومة بالذكاء الاصطناعي. يمكن لكل مستخدم:"
              : "This is a ToDo list application for multiple users with AI-powered insights. Each user can:"}
          </p>
        </ResponsiveContainer>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 my-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
            <ul className="list-none space-y-4">
              {[
                isRTL
                  ? "إضافة وإدارة المهام الخاصة بهم"
                  : "Add and manage their own tasks",
                isRTL
                  ? "تحديد أحجام المهام (صغيرة، متوسطة، كبيرة) لحساب النقاط"
                  : "Set task sizes (small, medium, large) for point calculation",
                isRTL
                  ? "تتبع حالة الإنجاز وكسب النقاط"
                  : "Track completion status and earn points",
                isRTL
                  ? "الحصول على تحليل للإنتاجية وتوصيات شخصية من الذكاء الاصطناعي"
                  : "Get AI analysis of productivity and personalized recommendations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 p-1 rounded-full flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <ResponsiveContainer>
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </ResponsiveContainer>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <UserCard userId="user1" name={isRTL ? "المستخدم 1" : "User 1"} />
          <UserCard userId="user2" name={isRTL ? "المستخدم 2" : "User 2"} />
          <UserCard userId="user3" name={isRTL ? "المستخدم 3" : "User 3"} />
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        <p className="flex items-center justify-center gap-2">
          <span>
            {isRTL
              ? "مدعوم بواسطة Next.js و Google Gemini AI"
              : "Powered by Next.js and Google Gemini AI"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zM10 7a1 1 0 100-2 1 1 0 000 2zm-1 3a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </div>
    </main>
  );
}

interface UserCardProps {
  userId: string;
  name: string;
}

function UserCard({ userId, name }: UserCardProps) {
  const { getUserStats, users } = useTodoStore();
  const { isRTL } = useLanguage();
  const stats = getUserStats(userId);
  const user = users.find((u) => u.id === userId);
  const avatar = user?.avatar;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <h3 className="text-xl font-bold flex items-center gap-2">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={30}
              height={30}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          )}
          {name}
        </h3>
      </div>
      <div className="p-5 bg-white dark:bg-gray-800">
        {avatar && (
          <div className="flex justify-center mb-4">
            <Image
              src={avatar}
              alt={name}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-blue-200"
            />
          </div>
        )}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {isRTL ? "إجمالي المهام:" : "Total Tasks:"}
            </span>
            <span className="font-medium dark:text-white">
              {stats.totalTasks}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              {isRTL ? "المكتملة:" : "Completed:"}
            </span>
            <span className="font-medium dark:text-white">
              {stats.completedTasks}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
              {isRTL ? "النقاط:" : "Points:"}
            </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {stats.points}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/${userId}`}
            className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 1a1 1 0 10-2 0v3a1 1 0 102 0v-3zm1-4a1 1 0 10-2 0 1 1 0 102 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
                clipRule="evenodd"
              />
            </svg>
            {isRTL ? "عرض المهام" : "View Tasks"}
          </Link>
        </div>
      </div>
    </div>
  );
}
