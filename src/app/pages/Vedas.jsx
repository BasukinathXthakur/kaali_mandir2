import React, { useState } from "react";
import {
  BookOpen,
  Star,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Sun,
  Music,
  Heart,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../hooks/useLanguage";

const Vedas = () => {
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const [expandedVeda, setExpandedVeda] = useState(null);

  const vedasData = [
    {
      id: 1,
      name: "Rigveda",
      hindiName: "ऋग्वेद",
      maithiliName: "ऋग्वेद",
      icon: <Sun className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description:
        "The oldest of the four Vedas, containing hymns and mantras dedicated to various deities. It consists of 1,028 hymns organized in 10 books (Mandalas).",
      hindiDescription:
        "चार वेदों में सबसे प्राचीन, विभिन्न देवताओं को समर्पित भजन और मंत्रों वाला। इसमें 10 पुस्तकों (मंडलों) में व्यवस्थित 1,028 भजन हैं।",
      maithiliDescription:
        "चारू वेद मे सब स॑ पुरान, विभिन्न देवता के समर्पित भजन आ मंत्र सब। ई मे 10 पोथी (मंडल) मे व्यवस्थित 1,028 भजन छै।",
      mandalas: 10,
      hymns: 1028,
      verses: 10552,
      mainDeities: [
        "Agni",
        "Indra",
        "Varuna",
        "Surya",
        "Soma",
        "Vishnu",
        "Rudra",
        "Maruts",
      ],
      keyThemes: [
        "Cosmic order (Rita)",
        "Fire worship",
        "Natural phenomena",
        "Philosophical inquiries",
        "Creation hymns",
      ],
    },
    {
      id: 2,
      name: "Yajurveda",
      hindiName: "यजुर्वेद",
      maithiliName: "यजुर्वेद",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description:
        "The Veda of sacrificial formulas and rituals. It provides detailed instructions for performing Vedic sacrifices and ceremonies.",
      hindiDescription:
        "यज्ञ सूत्रों और अनुष्ठानों का वेद। यह वैदिक यज्ञों और समारोहों को करने के लिए विस्तृत निर्देश प्रदान करता है।",
      maithiliDescription:
        "यज्ञ सूत्र आ अनुष्ठान के वेद। ई वैदिक यज्ञ आ समारोह करबा के लेल विस्तृत निर्देश देत छै।",
      chapters: 40,
      verses: "Varies by recension",
      mainDeities: ["Agni", "Indra", "Vayu", "Adityas"],
      keyThemes: [
        "Sacrificial rituals",
        "Mantras for ceremonies",
        "Priestly procedures",
        "Ritual symbolism",
        "Sacred formulas",
      ],
      divisions: [
        {
          name: "Shukla Yajurveda",
          description: "Contains only mantras and hymns",
        },
        {
          name: "Krishna Yajurveda",
          description: "Contains both mantras and explanations",
        },
      ],
    },
    {
      id: 3,
      name: "Samaveda",
      hindiName: "सामवेद",
      maithiliName: "सामवेद",
      icon: <Music className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description:
        "The Veda of melodies and chants. Most of its verses are derived from the Rigveda but are set to music for liturgical purposes.",
      hindiDescription:
        "संगीत और मंत्रों का वेद। इसके अधिकांश श्लोक ऋग्वेद से लिए गए हैं लेकिन धार्मिक उद्देश्यों के लिए संगीत में सेट किए गए हैं।",
      maithiliDescription:
        "संगीत आ मंत्र के वेद। एकर अधिकांश श्लोक ऋग्वेद स॑ लेल गेल छै मुदा धार्मिक उद्देश्य के लेल संगीत मे सेट कैल गेल छै।",
      chapters: 2,
      verses: 1875,
      chants: 1549,
      mainDeities: ["Soma", "Agni", "Indra"],
      keyThemes: [
        "Musical renditions",
        "Melodic chanting",
        "Liturgical music",
        "Sacred songs",
        "Ritual melodies",
      ],
      specialFeature: "Known for its musical notation and chanting tradition",
    },
    {
      id: 4,
      name: "Atharvaveda",
      hindiName: "अथर्ववेद",
      maithiliName: "अथर्ववेद",
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description:
        "The Veda of everyday life and practical knowledge. It contains hymns, spells, and incantations for daily life, health, and wellbeing.",
      hindiDescription:
        "रोजमर्रा की जीवन और व्यावहारिक ज्ञान का वेद। इसमें दैनिक जीवन, स्वास्थ्य और कल्याण के लिए भजन, मंत्र और जादू शामिल हैं।",
      maithiliDescription:
        "रोजमर्रा के जीवन आ व्यावहारिक ज्ञान के वेद। ई मे दैनिक जीवन, स्वास्थ्य आ कल्याण के लेल भजन, मंत्र आ जादू शामिल छै।",
      books: 20,
      hymns: 730,
      verses: 6000,
      mainDeities: ["Rohita", "Kala", "Prithvi", "Varuna", "Brahma"],
      keyThemes: [
        "Healing and medicine",
        "Marriage and family",
        "Astrology",
        "Agriculture",
        "Protection spells",
        "Philosophical hymns",
      ],
      specialFeature: "Focus on practical aspects of daily life and wellbeing",
    },
  ];

  const toggleVeda = (vedaId) => {
    setExpandedVeda(expandedVeda === vedaId ? null : vedaId);
  };

  const getDescription = (veda) => {
    if (currentLanguage === "hi") return veda.hindiDescription;
    if (currentLanguage === "mai") return veda.maithiliDescription;
    return veda.description;
  };

  const getName = (veda) => {
    if (currentLanguage === "hi") return veda.hindiName;
    if (currentLanguage === "mai") return veda.maithiliName;
    return veda.name;
  };

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
              Back to Literature
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
              {currentLanguage === "hi"
                ? "वेद"
                : currentLanguage === "mai"
                ? "वेद"
                : "The Vedas"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              {currentLanguage === "hi"
                ? "प्राचीन भारतीय ज्ञान के पवित्र ग्रंथ"
                : currentLanguage === "mai"
                ? "प्राचीन भारतीय ज्ञान के पवित्र ग्रंथ"
                : "Ancient Sacred Scriptures of Divine Knowledge"}
            </p>
            <p className="text-lg opacity-80 max-w-4xl mx-auto">
              {currentLanguage === "hi"
                ? "वेद हिंदू धर्म के सबसे प्राचीन और पवित्र ग्रंथ हैं, जो दिव्य ज्ञान, दर्शन और आध्यात्मिक शिक्षाओं का भंडार हैं।"
                : currentLanguage === "mai"
                ? "वेद हिंदू धर्म के सब स॑ पुरान आ पवित्र ग्रंथ छै, जे दिव्य ज्ञान, दर्शन आ आध्यात्मिक शिक्षा के भंडार छै।"
                : "The Vedas are the oldest and most sacred scriptures of Hinduism, containing divine knowledge, philosophy, and spiritual teachings."}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "वेद"
                  : currentLanguage === "mai"
                  ? "वेद"
                  : "Vedas"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                20,000+
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
                1500 BCE
              </div>
              <div className="text-gray-700 font-medium">
                {currentLanguage === "hi"
                  ? "रचना काल"
                  : currentLanguage === "mai"
                  ? "रचना काल"
                  : "Composed"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">
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

      {/* Vedas Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {currentLanguage === "hi"
                ? "चार वेद"
                : currentLanguage === "mai"
                ? "चारू वेद"
                : "The Four Vedas"}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentLanguage === "hi"
                ? "प्रत्येक वेद के बारे में जानें"
                : currentLanguage === "mai"
                ? "प्रत्येक वेद के बारे मे जानू"
                : "Explore each sacred scripture"}
            </p>
          </div>

          <div className="space-y-6">
            {vedasData.map((veda) => (
              <div
                key={veda.id}
                className={`${veda.bgColor} ${veda.borderColor} border-2 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleVeda(veda.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${veda.color} text-white flex items-center justify-center`}
                      >
                        {veda.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {getName(veda)}
                        </h3>
                        <p className="text-gray-700 mt-2">
                          {getDescription(veda)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedVeda === veda.id ? (
                        <ChevronDown className="text-gray-600" />
                      ) : (
                        <ChevronRight className="text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedVeda === veda.id && (
                  <div className="border-t bg-white p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Statistics */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {currentLanguage === "hi"
                            ? "आंकड़े"
                            : currentLanguage === "mai"
                            ? "आंकड़ा"
                            : "Statistics"}
                        </h4>
                        <div className="space-y-2">
                          {veda.mandalas && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {currentLanguage === "hi"
                                  ? "मंडल"
                                  : currentLanguage === "mai"
                                  ? "मंडल"
                                  : "Mandalas"}
                                :
                              </span>
                              <span className="font-semibold">
                                {veda.mandalas}
                              </span>
                            </div>
                          )}
                          {veda.chapters && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {currentLanguage === "hi"
                                  ? "अध्याय"
                                  : currentLanguage === "mai"
                                  ? "अध्याय"
                                  : "Chapters"}
                                :
                              </span>
                              <span className="font-semibold">
                                {veda.chapters}
                              </span>
                            </div>
                          )}
                          {veda.books && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {currentLanguage === "hi"
                                  ? "पुस्तकें"
                                  : currentLanguage === "mai"
                                  ? "पोथी"
                                  : "Books"}
                                :
                              </span>
                              <span className="font-semibold">
                                {veda.books}
                              </span>
                            </div>
                          )}
                          {veda.hymns && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {currentLanguage === "hi"
                                  ? "भजन"
                                  : currentLanguage === "mai"
                                  ? "भजन"
                                  : "Hymns"}
                                :
                              </span>
                              <span className="font-semibold">
                                {veda.hymns}
                              </span>
                            </div>
                          )}
                          {veda.verses && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {currentLanguage === "hi"
                                  ? "श्लोक"
                                  : currentLanguage === "mai"
                                  ? "श्लोक"
                                  : "Verses"}
                                :
                              </span>
                              <span className="font-semibold">
                                {veda.verses}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Main Deities */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {currentLanguage === "hi"
                            ? "मुख्य देवता"
                            : currentLanguage === "mai"
                            ? "मुख्य देवता"
                            : "Main Deities"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {veda.mainDeities.map((deity, index) => (
                            <span
                              key={index}
                              className={`bg-gradient-to-r ${veda.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                            >
                              {deity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Themes */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {currentLanguage === "hi"
                            ? "मुख्य विषय"
                            : currentLanguage === "mai"
                            ? "मुख्य विषय"
                            : "Key Themes"}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {veda.keyThemes.map((theme, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              <Star className="w-4 h-4 text-yellow-500 mr-2" />
                              {theme}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Divisions (for Yajurveda) */}
                      {veda.divisions && (
                        <div className="lg:col-span-2">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            {currentLanguage === "hi"
                              ? "विभाजन"
                              : currentLanguage === "mai"
                              ? "विभाजन"
                              : "Divisions"}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {veda.divisions.map((division, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 p-4 rounded-lg"
                              >
                                <h5 className="font-semibold text-gray-800 mb-2">
                                  {division.name}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {division.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Special Feature */}
                      {veda.specialFeature && (
                        <div className="lg:col-span-2">
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <p className="text-gray-700 italic">
                              <Star className="w-4 h-4 inline text-orange-500 mr-2" />
                              {veda.specialFeature}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentLanguage === "hi"
                ? "वेदों का महत्व"
                : currentLanguage === "mai"
                ? "वेद के महत्व"
                : "Significance of the Vedas"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {currentLanguage === "hi"
                  ? "आध्यात्मिक ज्ञान"
                  : currentLanguage === "mai"
                  ? "आध्यात्मिक ज्ञान"
                  : "Spiritual Knowledge"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "hi"
                  ? "वेद आध्यात्मिक ज्ञान और जीवन के गहरे सत्य का स्रोत हैं।"
                  : currentLanguage === "mai"
                  ? "वेद आध्यात्मिक ज्ञान आ जीवन के गहींर सत्य के स्रोत छै।"
                  : "The Vedas are the source of spiritual knowledge and profound truths of life."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {currentLanguage === "hi"
                  ? "प्राचीन परंपरा"
                  : currentLanguage === "mai"
                  ? "प्राचीन परंपरा"
                  : "Ancient Tradition"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "hi"
                  ? "सहस्राब्दियों से मौखिक परंपरा के माध्यम से संरक्षित।"
                  : currentLanguage === "mai"
                  ? "सहस्राब्दी स॑ मौखिक परंपरा के माध्यम स॑ संरक्षित।"
                  : "Preserved through oral tradition for thousands of years."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {currentLanguage === "hi"
                  ? "सार्वभौमिक शिक्षाएं"
                  : currentLanguage === "mai"
                  ? "सार्वभौमिक शिक्षा"
                  : "Universal Teachings"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "hi"
                  ? "धर्म, दर्शन और जीवन के बारे में कालातीत ज्ञान।"
                  : currentLanguage === "mai"
                  ? "धर्म, दर्शन आ जीवन के बारे मे कालातीत ज्ञान।"
                  : "Timeless wisdom about dharma, philosophy, and life."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-100">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vedas;

