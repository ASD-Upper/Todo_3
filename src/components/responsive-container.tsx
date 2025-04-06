"use client";

import React from "react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveContainer({
  children,
  className,
}: ResponsiveContainerProps) {
  const { isRTL } = useLanguage();

  return (
    <div
      className={cn(
        "transition-all duration-300",
        isRTL ? "text-right" : "text-left",
        className
      )}
    >
      {children}
    </div>
  );
}
