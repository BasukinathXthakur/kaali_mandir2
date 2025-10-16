import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { DEITIES } from "../data/aarti";
import { useLanguage } from "../hooks/useLanguage";

  const AartiDetail = ({ slug: propSlug }) => {
  const params = useParams();
  const router = useRouter();
  const deitySlug = propSlug || params.slug;
  const { t } = useLanguage();
  const [selectedAarti, setSelectedAarti] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Find the deity by slug
  const deity = DEITIES.find((d) => d.slug === deitySlug);

  if (!deity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t("aarti.deityNotFound", "Deity not found")}
          </h1>
          <Link
            href="/literature"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            {t("aarti.backToLiterature", "Back to Literature")}
          </Link>
        </div>
      </div>
    );
  }

  const handleAartiSelect = (aarti) => {
    setSelectedAarti(aarti);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="text-white py-12 relative"
        style={{
          backgroundImage: `url(${deity.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="mr-2" />
              {t("aarti.back", "Back")}
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari drop-shadow-lg">
              {deity.name} {t("aarti.aarti", "Aarti")}
            </h1>
            <p className="text-xl opacity-90 drop-shadow-lg">
              {t(
                "aarti.devotionalPrayers",
                "Devotional Prayers and Sacred Texts"
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Aarti List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-devanagari border-b-2 border-orange-500 pb-3">
                {t("aarti.availableAartis", "Available Aartis")}
              </h2>

              <div className="space-y-3">
                {deity.aartis.map((aarti, index) => (
                  <button
                    key={index}
                    onClick={() => handleAartiSelect(aarti)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedAarti?.title === aarti.title
                        ? "bg-orange-100 border-2 border-orange-500 text-orange-800"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{aarti.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            {t("aarti.sanskrit", "Sanskrit")}
                          </span>
                        </div>
                      </div>
                      <BookOpen className="text-orange-400 w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Aarti Content */}
          <div className="lg:col-span-2">
            {selectedAarti ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Aarti Header */}
                <div
                  className="text-white p-6 relative"
                  style={{
                    backgroundImage: `url(${deity.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h2 className="text-3xl font-bold font-devanagari">
                        {selectedAarti.title}
                      </h2>
                      <p className="opacity-90 mt-2">
                        {t("aarti.devotionalPrayer", "Devotional Prayer")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={toggleMute}
                        className={`p-3 rounded-full transition-colors ${
                          isMuted
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-white bg-opacity-20 hover:bg-opacity-30"
                        }`}
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                      <button
                        onClick={togglePlayPause}
                        className={`p-3 rounded-full transition-colors ${
                          isPlaying
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-white bg-opacity-20 hover:bg-opacity-30"
                        }`}
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Aarti Content */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 font-devanagari">
                        {selectedAarti.title}
                      </h3>
                    </div>

                    {/* Actual Sanskrit Aarti Content */}
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <pre className="text-lg font-medium text-center whitespace-pre-wrap font-devanagari leading-relaxed">
                          {selectedAarti.sanskrit}
                        </pre>
                      </div>
                    </div>

                    {/* Meaning and Significance */}
                    <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {t("aarti.meaning", "Meaning and Significance")}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {t(
                          "aarti.sampleMeaning",
                          "This aarti is a devotional prayer that expresses deep reverence and love for the Divine. It is traditionally sung during evening prayers and special ceremonies to invoke blessings and protection."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg p-12 text-center border-2 border-orange-200">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <BookOpen className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-devanagari">
                  {t("aarti.selectAarti", "Select an Aarti")}
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-md mx-auto">
                  {t(
                    "aarti.selectAartiDescription",
                    "Choose an aarti from the list to view its content and listen to the devotional prayer"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AartiDetail;
