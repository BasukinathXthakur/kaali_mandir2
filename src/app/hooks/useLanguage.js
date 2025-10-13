"use client";

import { useLanguageContext } from "../contexts/LaunguageContext";

// Custom hook for easier translation usage
export const useLanguage = () => {
  return useLanguageContext();
};
