"use client";

import { useLanguage } from "../hooks/useLanguage";

export default function VirtualTemplePage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {t("home.divineTemple")}
        </h1>
        <p className="text-gray-600 mb-8">
          {t("home.virtualMandirExperience")}
        </p>
        <div className="bg-orange-100 p-8 rounded-lg max-w-2xl mx-auto">
          <p className="text-gray-700">
            Virtual temple experience coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}

