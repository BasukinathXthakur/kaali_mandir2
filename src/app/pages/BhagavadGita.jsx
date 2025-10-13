import React, { useState, useEffect } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../hooks/useLanguage";
import { getAllBhagavadGitaChapters, getBhagavadGitaChapter } from "divine-books";

const BhagavadGita = () => {
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load all chapters
    const allChapters = getAllBhagavadGitaChapters();
    setChapters(allChapters);
  }, []);

  const handleChapterSelect = (chapterNumber) => {
    const chapter = getBhagavadGitaChapter(chapterNumber);
    setSelectedChapter(chapterNumber);
    setChapterContent(chapter);
    setExpandedChapter(null);
  };

  const toggleChapterExpand = (chapterNumber) => {
    if (expandedChapter === chapterNumber) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterNumber);
      const chapter = getBhagavadGitaChapter(chapterNumber);
      setChapterContent(chapter);
    }
  };

  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.name_transliterated.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.name_translated.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="mr-2" />
              {currentLanguage === "hi"
                ? "साहित्य पर वापस जाएं"
                : currentLanguage === "mai"
                ? "साहित्य पर वापस जाउ"
                : "Back to Literature"}
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
              {currentLanguage === "hi"
                ? "श्रीमद्भगवद्गीता"
                : currentLanguage === "mai"
                ? "श्रीमद्भगवद्गीता"
                : "Śrīmad Bhagavad Gītā"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              {currentLanguage === "hi"
                ? "भगवान कृष्ण का दिव्य गीत"
                : currentLanguage === "mai"
                ? "भगवान कृष्ण के दिव्य गीत"
                : "The Divine Song of Lord Krishna"}
            </p>
            <p className="text-lg opacity-80 max-w-4xl mx-auto">
              {currentLanguage === "hi"
                ? "18 अध्याय, 700 श्लोक - महाभारत के भीष्म पर्व का भाग"
                : currentLanguage === "mai"
                ? "18 अध्याय, 700 श्लोक - महाभारत के भीष्म पर्व के भाग"
                : "18 Chapters, 700 Verses - Part of the Mahabharata's Bhishma Parva"}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">18</div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "अध्याय"
                  : currentLanguage === "mai"
                  ? "अध्याय"
                  : "Chapters"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-indigo-600 mb-2">700</div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "श्लोक"
                  : currentLanguage === "mai"
                  ? "श्लोक"
                  : "Verses"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                5000+
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "वर्ष"
                  : currentLanguage === "mai"
                  ? "वर्ष"
                  : "Years Old"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-pink-600 mb-2">
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

      {/* Search Bar */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  currentLanguage === "hi"
                    ? "अध्याय खोजें..."
                    : currentLanguage === "mai"
                    ? "अध्याय खोजू..."
                    : "Search chapters..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
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
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {currentLanguage === "hi"
                ? "अठारह अध्याय"
                : currentLanguage === "mai"
                ? "अठारह अध्याय"
                : "Eighteen Chapters"}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentLanguage === "hi"
                ? "भगवद गीता के प्रत्येक अध्याय का अन्वेषण करें"
                : currentLanguage === "mai"
                ? "भगवद गीता के प्रत्येक अध्याय के अन्वेषण करू"
                : "Explore each chapter of the Bhagavad Gita"}
            </p>
          </div>

          <div className="space-y-6">
            {filteredChapters.map((chapter, chapterIndex) => (
              <div
                key={`chapter-${chapter.chapter_number}-${chapterIndex}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleChapterExpand(chapter.chapter_number)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                          {chapter.chapter_number}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 font-devanagari">
                            {chapter.name}
                          </h3>
                          <p className="text-sm text-gray-600 italic">
                            {chapter.name_transliterated}
                          </p>
                          <p className="text-lg text-blue-600 font-medium">
                            {chapter.name_translated}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 ml-16">
                        {chapter.chapter_summary || chapter.name_meaning}
                      </p>
                      <div className="flex items-center space-x-6 ml-16 text-sm text-gray-500">
                        <span>{chapter.verses_count} Verses</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedChapter === chapter.chapter_number ? (
                        <ChevronDown className="text-blue-600" />
                      ) : (
                        <ChevronRight className="text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedChapter === chapter.chapter_number && chapterContent && (
                  <div className="border-t bg-gray-50 p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      {currentLanguage === "hi"
                        ? "श्लोक"
                        : currentLanguage === "mai"
                        ? "श्लोक"
                        : "Verses"}
                    </h4>
                    <div className="space-y-6 max-h-[600px] overflow-y-auto">
                      {chapterContent.verses &&
                        chapterContent.verses.map((verse, verseIndex) => (
                          <div
                            key={`gita-chapter-${chapterContent.chapter_number}-verse-${verse.verse_number}-${verseIndex}`}
                            className="bg-white p-4 rounded-lg shadow"
                          >
                            <div className="flex items-start mb-3">
                              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                                {verse.verse_number}
                              </div>
                              <div className="flex-1">
                                <p className="text-lg font-devanagari text-gray-800 mb-2 leading-relaxed">
                                  {verse.text}
                                </p>
                                {verse.transliteration && (
                                  <p className="text-sm text-gray-600 italic mb-2">
                                    {verse.transliteration}
                                  </p>
                                )}
                                {verse.word_meanings && (
                                  <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                                    <span className="font-semibold">
                                      {currentLanguage === "hi"
                                        ? "शब्दार्थ: "
                                        : currentLanguage === "mai"
                                        ? "शब्दार्थ: "
                                        : "Word Meanings: "}
                                    </span>
                                    {verse.word_meanings}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {chapterContent.verses && chapterContent.verses.length > 0 && (
                      <p className="text-center text-gray-600 mt-4 font-semibold">
                        {currentLanguage === "hi"
                          ? `कुल ${chapterContent.verses.length} श्लोक`
                          : currentLanguage === "mai"
                          ? `कुल ${chapterContent.verses.length} श्लोक`
                          : `Total ${chapterContent.verses.length} verses`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {currentLanguage === "hi"
              ? "और अधिक पवित्र ग्रंथ पढ़ें"
              : currentLanguage === "mai"
              ? "आओर अधिक पवित्र ग्रंथ पढ़ू"
              : "Explore More Sacred Texts"}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {currentLanguage === "hi"
              ? "प्राचीन भारत के ज्ञान की खोज करें"
              : currentLanguage === "mai"
              ? "प्राचीन भारत के ज्ञान के खोज करू"
              : "Discover the wisdom of ancient India"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/literature"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {currentLanguage === "hi"
                ? "साहित्य पर वापस जाएं"
                : currentLanguage === "mai"
                ? "साहित्य पर वापस जाउ"
                : "Back to Literature"}
            </Link>
            <Link
              href="/ramayana"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {currentLanguage === "hi"
                ? "रामायण पढ़ें"
                : currentLanguage === "mai"
                ? "रामायण पढ़ू"
                : "Read Ramayana"}
            </Link>
            <Link
              href="/mahabharat"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {currentLanguage === "hi"
                ? "महाभारत पढ़ें"
                : currentLanguage === "mai"
                ? "महाभारत पढ़ू"
                : "Read Mahabharata"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BhagavadGita;
