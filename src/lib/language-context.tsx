"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  language: "en" | "ar";
  isRTL: boolean;
  toggleDirection: () => void;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"en" | "ar">("ar"); // Default to Arabic
  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  // Apply direction to document
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;

    // Add RTL class to body if needed
    if (isRTL) {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [language, dir, isRTL]);

  const toggleDirection = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleDirection, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
