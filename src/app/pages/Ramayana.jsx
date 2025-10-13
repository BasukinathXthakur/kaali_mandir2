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
import { getAllRamcharitmanasChapters, getRamcharitmanasChapter } from "divine-books";

const Ramayana = () => {
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load all chapters (Kandas)
    const allChapters = getAllRamcharitmanasChapters();
    setChapters(allChapters);
  }, []);

  const handleChapterSelect = (chapterNumber) => {
    const chapter = getRamcharitmanasChapter(chapterNumber);
    setSelectedChapter(chapterNumber);
    setChapterContent(chapter);
    setExpandedChapter(null);
  };

  const toggleChapterExpand = (chapterNumber) => {
    if (expandedChapter === chapterNumber) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterNumber);
      const chapter = getRamcharitmanasChapter(chapterNumber);
      setChapterContent(chapter);
    }
  };

  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.kanda_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.kanda_name_transliterated.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-orange-200 transition-colors"
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
                ? "श्री रामचरितमानस"
                : currentLanguage === "mai"
                ? "श्री रामचरितमानस"
                : "Śrī Rāmacaritamānasa"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              {currentLanguage === "hi"
                ? "गोस्वामी तुलसीदास द्वारा रचित"
                : currentLanguage === "mai"
                ? "गोस्वामी तुलसीदास द्वारा रचित"
                : "Composed by Goswami Tulsidas"}
            </p>
            <p className="text-lg opacity-80 max-w-4xl mx-auto">
              {currentLanguage === "hi"
                ? "7 काण्ड - भगवान राम की दिव्य यात्रा"
                : currentLanguage === "mai"
                ? "7 काण्ड - भगवान राम के दिव्य यात्रा"
                : "7 Kandas - The Divine Journey of Lord Rama"}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">7</div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "काण्ड"
                  : currentLanguage === "mai"
                  ? "काण्ड"
                  : "Kandas"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">
                1000+
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "दोहे व चौपाई"
                  : currentLanguage === "mai"
                  ? "दोहा आ चौपाई"
                  : "Dohas & Chaupais"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                1574 CE
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "रचना काल"
                  : currentLanguage === "mai"
                  ? "रचना काल"
                  : "Composed"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                Awadhi
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
                    ? "काण्ड खोजें..."
                    : currentLanguage === "mai"
                    ? "काण्ड खोजू..."
                    : "Search Kandas..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
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

      {/* Kandas Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {currentLanguage === "hi"
                ? "सात काण्ड"
                : currentLanguage === "mai"
                ? "सात काण्ड"
                : "Seven Kandas"}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentLanguage === "hi"
                ? "रामचरितमानस के प्रत्येक काण्ड का अन्वेषण करें"
                : currentLanguage === "mai"
                ? "रामचरितमानस के प्रत्येक काण्ड के अन्वेषण करू"
                : "Explore each Kanda of Ramcharitmanas"}
            </p>
          </div>

          <div className="space-y-6">
            {filteredChapters.map((chapter, chapterIndex) => (
              <div
                key={`kanda-${chapter.kanda_number}-${chapterIndex}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleChapterExpand(chapter.kanda_number)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                          {chapter.kanda_number}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 font-devanagari">
                            {chapter.kanda_name}
                          </h3>
                          <p className="text-sm text-gray-600 italic">
                            {chapter.kanda_name_transliterated}
                          </p>
                          <p className="text-lg text-orange-600 font-medium">
                            {chapter.kanda_name_translated}
                          </p>
                        </div>
                      </div>
                      {chapter.kanda_summary && (
                        <p className="text-gray-600 mb-4 ml-16">
                          {chapter.kanda_summary}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      {expandedChapter === chapter.kanda_number ? (
                        <ChevronDown className="text-orange-600" />
                      ) : (
                        <ChevronRight className="text-orange-600" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedChapter === chapter.kanda_number && chapterContent && (
                  <div className="border-t bg-gray-50 p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      {currentLanguage === "hi"
                        ? "दोहे व चौपाई"
                        : currentLanguage === "mai"
                        ? "दोहा आ चौपाई"
                        : "Dohas and Chaupais"}
                    </h4>
                    <div className="space-y-6 max-h-[600px] overflow-y-auto">
                      {chapterContent.verses &&
                        chapterContent.verses.map((verse, index) => (
                          <div
                            key={`kanda-${chapter.kanda_number}-verse-${index}`}
                            className="bg-white p-4 rounded-lg shadow"
                          >
                            <div className="flex items-start mb-3">
                              <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-lg font-devanagari text-gray-800 mb-2 leading-relaxed">
                                  {verse.text || verse.verse}
                                </p>
                                {verse.transliteration && (
                                  <p className="text-sm text-gray-600 italic mb-2">
                                    {verse.transliteration}
                                  </p>
                                )}
                                {verse.meaning && (
                                  <p className="text-sm text-gray-700 bg-orange-50 p-2 rounded">
                                    <span className="font-semibold">
                                      {currentLanguage === "hi"
                                        ? "अर्थ: "
                                        : currentLanguage === "mai"
                                        ? "अर्थ: "
                                        : "Meaning: "}
                                    </span>
                                    {verse.meaning}
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
                          ? `कुल ${chapterContent.verses.length} दोहे व चौपाई`
                          : currentLanguage === "mai"
                          ? `कुल ${chapterContent.verses.length} दोहा आ चौपाई`
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
      <div className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
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
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {currentLanguage === "hi"
                ? "साहित्य पर वापस जाएं"
                : currentLanguage === "mai"
                ? "साहित्य पर वापस जाउ"
                : "Back to Literature"}
            </Link>
            <Link
              href="/bhagavad-gita"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {currentLanguage === "hi"
                ? "भगवद गीता पढ़ें"
                : currentLanguage === "mai"
                ? "भगवद गीता पढ़ू"
                : "Read Bhagavad Gita"}
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

export default Ramayana;
