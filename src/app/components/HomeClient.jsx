"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Heart,
  BookOpen,
  Music,
  Building2,
  Users,
  MapPin,
  DollarSign,
  HandHeart,
  Clock,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextEvent, setNextEvent] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { t } = useLanguage();

  // Mock data for demonstration - replace with actual backend when ready
  useEffect(() => {
    // Simulate loading
    setLoading(false);
  }, []);

  // Countdown timer for next event
  useEffect(() => {
    if (!nextEvent) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const eventTime = nextEvent.date;
      const difference = eventTime - now;

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner - Optimized for Mobile & Desktop */}
      <div className="relative h-screen max-h-[650px] sm:max-h-[700px] md:max-h-[850px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/durga.jpeg"
            alt="Maa Kali"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Enhanced Gradient Overlays for Better Text Visibility */}
        {/* Mobile: Strong gradient from bottom, Desktop: Left to right gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/60 md:to-transparent"></div>

        {/* Content Container - Bottom aligned on mobile, centered on desktop */}
        <div className="relative z-10 h-full flex items-end md:items-center pb-8 sm:pb-12 md:pb-0">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              {/* Text Content */}
              <div className="text-white space-y-4 sm:space-y-5 md:space-y-6">
                {/* Welcome Badge */}
                <div className="inline-block">
                  <span className="bg-orange-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                    {t("home.welcomeToKaaliMandir", "Welcome to")}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white font-devanagari drop-shadow-2xl">
                    Kaali Mandir
                  </span>
                  <span className="block text-orange-400 font-devanagari text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 sm:mt-2">
                    Divine Temple
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl drop-shadow-lg">
                  {t("home.yourTempleAnytimeAnywhere", "Your Sacred Space, Anytime, Anywhere")}
                </p>

                {/* Call to Action Buttons */}
                <div className="pt-4 sm:pt-6">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      href="/pujas"
                      className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 sm:py-3.5 sm:px-8 md:py-4 md:px-10 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-center text-sm sm:text-base md:text-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <HandHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t("home.bookAPuja", "Book a Puja")}
                      </span>
                    </Link>
                    <Link
                      href="/donations"
                      className="border-2 border-white/90 text-white hover:bg-white hover:text-orange-600 font-bold py-3 px-6 sm:py-3.5 sm:px-8 md:py-4 md:px-10 rounded-xl transition-all duration-300 bg-white/10 backdrop-blur-md text-center text-sm sm:text-base md:text-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t("home.donateNow", "Donate Now")}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Event Countdown */}
      {nextEvent && (
        <div className="bg-orange-100 py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {t("home.nextEvent", "Next Event")}: {nextEvent.name}
              </h2>
              <p className="text-gray-600">
                {new Date(nextEvent.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">
                    {timeRemaining.days}
                  </div>
                  <div className="text-gray-600">{t("home.days", "Days")}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">
                    {timeRemaining.hours}
                  </div>
                  <div className="text-gray-600">{t("home.hours", "Hours")}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">
                    {timeRemaining.minutes}
                  </div>
                  <div className="text-gray-600">{t("home.minutes", "Minutes")}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">
                    {timeRemaining.seconds}
                  </div>
                  <div className="text-gray-600">{t("home.seconds", "Seconds")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Events Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-orange-100 rounded-full px-6 py-2 mb-4">
              <span className="text-orange-600 font-semibold text-sm md:text-base">
                {t("home.upcomingEvents", "Upcoming Events")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-devanagari">
              Sacred Celebrations
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.joinUsForSacredCeremonies", "Join us for sacred ceremonies and divine celebrations")}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-100">
                        <Calendar className="text-5xl text-orange-500" />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-3 rounded-bl-lg">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      {t("home.bookNow", "Book Now")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>{t("home.noUpcomingEvents", "No upcoming events at the moment")}</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {t("home.viewAllEvents", "View All Events")}
            </Link>
          </div>
        </div>
      </div>

      {/* Divine Services Section */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-orange-100 rounded-full px-6 py-2 mb-4">
              <span className="text-orange-600 font-semibold text-sm md:text-base">
                {t("home.divineServices", "Divine Services")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-devanagari">
              Connect with Divinity
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.connectWithSpiritualJourney", "Explore our sacred services and deepen your spiritual connection")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <Link
              href="/pujas"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <HandHeart className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {t("home.bookPujaChadhava", "Book Puja")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.scheduleSacredRituals", "Sacred rituals & ceremonies")}
                </p>
              </div>
            </Link>

            <Link
              href="/panchang"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {t("home.panchangHoroscope", "Panchang")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.dailyAstrologicalGuidance", "Auspicious timings")}
                </p>
              </div>
            </Link>

            <Link
              href="/music"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Music className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {t("home.devotionalMusic", "Devotional Music")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.sacredBhajansMantras", "Bhajans & mantras")}
                </p>
              </div>
            </Link>

            <Link
              href="/literature"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BookOpen className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  {t("home.hinduLiterature", "Sacred Texts")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.ancientWisdomScriptures", "Ancient wisdom")}
                </p>
              </div>
            </Link>

            <Link
              href="/virtual-temple"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Building2 className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {t("home.divineTemple", "Virtual Temple")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.virtualMandirExperience", "Divine experience")}
                </p>
              </div>
            </Link>

            <Link
              href="/community"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                  {t("home.sanataniCommunity", "Community")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.connectWithDevotees", "Connect with devotees")}
                </p>
              </div>
            </Link>

            <Link
              href="/yatra"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {t("home.yatraDarshan", "Yatra")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.pilgrimageJourneys", "Sacred pilgrimages")}
                </p>
              </div>
            </Link>

            <Link
              href="/donations"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {t("home.chandaDonations", "Donations")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("home.supportTempleActivities", "Support temple")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Support Our Temple - Call to Action Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {t("home.supportOurTemple", "Support Our Temple")}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-50 mb-8 sm:mb-10 leading-relaxed">
              {t("home.yourGenerousDonations", "Your generous donations help us maintain the temple and conduct regular pujas")}
            </p>
            <Link
              href="/donations"
              className="inline-block bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 sm:py-5 sm:px-12 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 text-lg sm:text-xl"
            >
              {t("home.donateNow", "Donate Now")} →
            </Link>
          </div>
        </div>
      </div>

      {/* Temple Services Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-orange-100 rounded-full px-6 py-2 mb-4">
              <span className="text-orange-600 font-semibold text-sm md:text-base">
                {t("home.ourServices", "Our Services")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-devanagari">
              Temple Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.weOfferVariousReligious", "We offer various religious services and sacred ceremonies")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="group bg-white p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🙏</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                {t("home.pujaServices", "Puja Services")}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t("home.wePerformVariousPujas", "We perform various pujas for different occasions and celebrations")}
              </p>
            </div>

            <div className="group bg-white p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🔥</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                {t("home.hawanCeremonies", "Hawan Ceremonies")}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t("home.sacredFireCeremonies", "Sacred fire ceremonies for purification and divine blessings")}
              </p>
            </div>

            <div className="group bg-white p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">💍</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                {t("home.weddingCeremonies", "Wedding Ceremonies")}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t("home.traditionalHinduWedding", "Traditional Hindu wedding ceremonies and sacred rituals")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
