"use client";

import React from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
  const { isRTL, toggleDirection } = useLanguage();

  return (
    <Button
      onClick={toggleDirection}
      variant="primary"
      size="sm"
      className="fixed top-4 right-4 z-50 shadow-md bg-blue-600 hover:bg-blue-700 text-white border-0 px-4 py-2 font-medium rounded-full transition-all duration-300"
      aria-label={isRTL ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.096 1.02c-.353-.376-.7-.77-1.027-1.177a19.406 19.406 0 01-3.6 3.727.75.75 0 01-.944-1.169 18.671 18.671 0 003.331-3.49 18.75 18.75 0 01-1.152-1.6 49.41 49.41 0 00-5.341.338.75.75 0 01-.182-1.49 48.911 48.911 0 015.442-.34V3a.75.75 0 01.75-.75zm3.536 5.25H11.75a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V8.25h-1.25a.75.75 0 110-1.5h1.536z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold">{isRTL ? "English" : "العربية"}</span>
      </span>
    </Button>
  );
}
