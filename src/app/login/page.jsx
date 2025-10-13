"use client";

import { useLanguage } from "../hooks/useLanguage";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {t("auth.loginToYourAccount")}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {t("auth.enterSacredSpace")}
        </p>
        <div className="bg-orange-100 p-6 rounded-lg text-center">
          <p className="text-gray-700">
            Login functionality coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}

