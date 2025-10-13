"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};

// Language configuration
export const LANGUAGES = {
  ENGLISH: "en",
  HINDI: "hi",
  MAITHILI: "mai",
};

// Language display names
export const LANGUAGE_NAMES = {
  [LANGUAGES.ENGLISH]: "English",
  [LANGUAGES.HINDI]: "हिन्दी",
  [LANGUAGES.MAITHILI]: "मैथली",
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isInitialized, setIsInitialized] = useState(false);
  const [i18n, setI18n] = useState(null);

  useEffect(() => {
    // Initialize i18n client-side only
    if (!isInitialized && typeof window !== 'undefined') {
      import("../i18n").then((module) => {
        const i18nInstance = module.default;
        const savedLanguage = localStorage.getItem('language') || 'en';
        i18nInstance.changeLanguage(savedLanguage);
        setCurrentLanguage(savedLanguage);
        setI18n(i18nInstance);
        setIsInitialized(true);
      });
    }
  }, [isInitialized]);

  const changeLanguage = async (language) => {
    if (i18n) {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }
    }
  };

  const t = (key, fallback = '') => {
    if (!i18n || !isInitialized) {
      // Return fallback or empty string during initialization to avoid showing keys
      return fallback || '';
    }
    return i18n.t(key);
  };

  const value = {
    t,
    currentLanguage,
    changeLanguage,
    languageNames: LANGUAGE_NAMES,
    languages: LANGUAGES,
    isEnglish: currentLanguage === LANGUAGES.ENGLISH,
    isHindi: currentLanguage === LANGUAGES.HINDI,
    isMaithili: currentLanguage === LANGUAGES.MAITHILI,
    isInitialized,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
