import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../hooks/useLanguage";
import { getAllMahabharataParvas, getMahabharataParva } from "divine-books";

const Mahabharat = () => {
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const [parvas, setParvas] = useState([]);
  const [expandedParva, setExpandedParva] = useState(null);
  const [parvaContent, setParvaContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load all parvas
    const allParvas = getAllMahabharataParvas();
    setParvas(allParvas);
  }, []);

  const mahabharatData = {
    title: "Mahabharata",
    subtitle: "The Great Epic of Ancient India",
    description:
      "The Mahabharata is one of the two major Sanskrit epics of ancient India, the other being the Ramayana. It narrates the struggle between two groups of cousins in the Kurukshetra War and the fates of the Kaurava and the Pandava princes and their successors. This complete digital version contains all 18 parvas with detailed Sanskrit verses, translations, and comprehensive story content.",
  };

  const toggleParva = (parvaNumber) => {
    if (expandedParva === parvaNumber) {
      setExpandedParva(null);
      setParvaContent(null);
    } else {
      setExpandedParva(parvaNumber);
      const parva = getMahabharataParva(parvaNumber);
      setParvaContent(parva);
    }
  };

  const filteredParvas = parvas.filter(
    (parva) =>
      parva.parva_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parva.parva_name_transliterated?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-purple-200 transition-colors"
            >
              <ArrowLeft className="mr-2" />
              {t("mahabharat.backToLiterature", "Back to Literature")}
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
              {mahabharatData.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              {mahabharatData.subtitle}
            </p>
            <p className="text-lg opacity-80 max-w-4xl mx-auto">
              {mahabharatData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {parvas.length || 18}
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "पर्व"
                  : currentLanguage === "mai"
                  ? "पर्व"
                  : "Parvas (Books)"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                100,000+
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "श्लोक"
                  : currentLanguage === "mai"
                  ? "श्लोक"
                  : "Verses"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                3000 BCE
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "रचना काल"
                  : currentLanguage === "mai"
                  ? "रचना काल"
                  : "Composed"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                Sanskrit
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "भाषा"
                  : currentLanguage === "mai"
                  ? "भाषा"
                  : "Language"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parvas Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("mahabharat.eighteenParvas", "The Eighteen Parvas")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                "mahabharat.exploreParvas",
                "Explore each book of the great epic"
              )}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t(
                    "mahabharat.searchPlaceholder",
                    "Search parvas, chapters, or events..."
                  )}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2 text-center text-sm text-gray-600">
                  {filteredParvas.length} parva(s) found
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {filteredParvas.map((parva, parvaIndex) => (
              <div
                key={`parva-${parva.parva_number}-${parvaIndex}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleParva(parva.parva_number)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                          {parva.parva_number}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 font-devanagari">
                            {parva.parva_name}
                          </h3>
                          <p className="text-sm text-gray-600 italic">
                            {parva.parva_name_transliterated}
                          </p>
                          <p className="text-lg text-purple-600 font-medium">
                            {parva.parva_name_translated}
                          </p>
                        </div>
                      </div>
                      {parva.parva_summary && (
                        <p className="text-gray-600 mb-4 ml-16">
                          {parva.parva_summary}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      {expandedParva === parva.parva_number ? (
                        <ChevronDown className="text-purple-600" />
                      ) : (
                        <ChevronRight className="text-purple-600" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedParva === parva.parva_number && parvaContent && (
                  <div className="border-t bg-gray-50 p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      {currentLanguage === "hi"
                        ? "अनुभाग"
                        : currentLanguage === "mai"
                        ? "अनुभाग"
                        : "Sections"}
                    </h4>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {parvaContent.sections &&
                        parvaContent.sections.map((section, sectionIndex) => (
                          <div
                            key={`parva-${parva.parva_number}-section-${section.section_number}-${sectionIndex}`}
                            className="bg-white p-4 rounded-lg shadow"
                          >
                            <div className="flex items-start mb-2">
                              <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                                {section.section_number}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-800 mb-2">
                                  {section.title || `Section ${section.section_number}`}
                                </h5>
                                {section.content && (
                                  <div className="text-sm text-gray-600 leading-relaxed">
                                    <p className="whitespace-pre-wrap">
                                      {section.content.length > 500 
                                        ? `${section.content.substring(0, 500)}...` 
                                        : section.content}
                                    </p>
                                    {section.content.length > 500 && (
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const element = e.currentTarget.previousSibling;
                                          if (element.textContent.includes('...')) {
                                            element.textContent = section.content;
                                            e.currentTarget.textContent = 'Show Less';
                                          } else {
                                            element.textContent = section.content.substring(0, 500) + '...';
                                            e.currentTarget.textContent = 'Read More';
                                          }
                                        }}
                                        className="text-purple-600 hover:text-purple-700 font-medium mt-2 inline-block"
                                      >
                                        Read More
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {parvaContent.sections && parvaContent.sections.length > 0 && (
                      <p className="text-center text-gray-600 mt-4 font-semibold">
                        {currentLanguage === "hi"
                          ? `कुल ${parvaContent.sections.length} अनुभाग`
                          : currentLanguage === "mai"
                          ? `कुल ${parvaContent.sections.length} अनुभाग`
                          : `Total ${parvaContent.sections.length} sections`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bhagavad Gita Highlight */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("mahabharat.bhagavadGita", "Bhagavad Gita")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                "mahabharat.divineSong",
                "The Divine Song - A jewel within the Mahabharata"
              )}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🕉️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t(
                  "mahabharat.foundInParva",
                  "Found in Bhishma Parva (Book 6)"
                )}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">18</div>
                <div className="text-gray-700 font-medium">Chapters</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">700</div>
                <div className="text-gray-700 font-medium">Verses</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  4,500
                </div>
                <div className="text-gray-700 font-medium">Words</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-6">
                {t(
                  "mahabharat.gitaDescription",
                  "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Prince Arjuna and Lord Krishna, who serves as his charioteer. This sacred text addresses the moral and philosophical dilemmas faced by Arjuna on the battlefield of Kurukshetra."
                )}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                {t("mahabharat.readGita", "Read Bhagavad Gita")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("mahabharat.exploreMore", "Explore More Sacred Texts")}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t(
              "mahabharat.discoverWisdom",
              "Discover the wisdom of ancient India"
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/literature"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {t("mahabharat.backToLiterature", "Back to Literature")}
            </Link>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              {t("mahabharat.readRamayana", "Read Ramayana")}
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Detail Modal - TODO: Implement ChapterDetailModal component */}
      {/* <ChapterDetailModal
        isOpen={isChapterModalOpen}
        onClose={handleCloseChapterModal}
        parvaSlug={selectedParvaSlug}
        chapterNumber={selectedChapter}
        onNavigateChapter={handleNavigateChapter}
        epicType="mahabharata"
      /> */}
    </div>
  );
};

export default Mahabharat;
