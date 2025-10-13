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
      {/* Hero Banner - Sri Mandir Inspired with Blurred Gradient */}
      <div className="relative min-h-[50vh] md:min-h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/durga.jpeg"
            alt="Maa Kali"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Gradient Overlay - Blends from left (dark) to right (transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 min-h-[50vh] md:min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl">
              {/* Left Side - Text Content */}
              <div className="text-white space-y-4 md:space-y-6 mt-16 md:mt-0">
                <div className="space-y-2 md:space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="block text-orange-400 font-devanagari">
                      {t("home.welcomeToKaaliMandir", "Welcome to")}
                    </span>
                    <span className="block text-white font-devanagari">
                      Kaali Mandir
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200">
                    {t("home.yourTempleAnytimeAnywhere", "Your Temple, Anytime, Anywhere")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href="/pujas"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                    >
                      {t("home.bookAPuja", "Book a Puja")}
                    </Link>
                    <Link
                      href="/donations"
                      className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 bg-white/10 backdrop-blur-sm text-center"
                    >
                      {t("home.donateNow", "Donate Now")}
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

      {/* Upcoming Events Section - full width background like Support Our Temple */}
      <div className="py-16 mt-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-devanagari">
              {t("home.upcomingEvents", "Upcoming Events")}
            </h2>
            <p className="text-gray-600">
              {t("home.joinUsForSacredCeremonies", "Join us for sacred ceremonies and celebrations")}
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

      {/* Quick Access Cards */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-devanagari">
              {t("home.divineServices", "Divine Services")}
            </h2>
            <p className="text-gray-600">
              {t("home.connectWithSpiritualJourney", "Connect with your spiritual journey")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <Link
              href="/pujas"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <HandHeart className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.bookPujaChadhava", "Book Puja/Chadhava")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.scheduleSacredRituals", "Schedule sacred rituals")}
              </p>
            </Link>

            <Link
              href="/panchang"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <Clock className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.panchangHoroscope", "Panchang/Horoscope")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.dailyAstrologicalGuidance", "Daily astrological guidance")}
              </p>
            </Link>

            <Link
              href="/music"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <Music className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.devotionalMusic", "Devotional Music")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.sacredBhajansMantras", "Sacred bhajans & mantras")}
              </p>
            </Link>

            <Link
              href="/literature"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <BookOpen className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.hinduLiterature", "Hindu Literature")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.ancientWisdomScriptures", "Ancient wisdom & scriptures")}
              </p>
            </Link>

            <Link
              href="/virtual-temple"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <Building2 className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.divineTemple", "Divine Temple")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.virtualMandirExperience", "Virtual mandir experience")}
              </p>
            </Link>

            <Link
              href="/community"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <Users className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.sanataniCommunity", "Sanatani Community")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.connectWithDevotees", "Connect with devotees")}
              </p>
            </Link>

            <Link
              href="/yatra"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <MapPin className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.yatraDarshan", "Yatra/Darshan")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.pilgrimageJourneys", "Pilgrimage journeys")}
              </p>
            </Link>

            <Link
              href="/donations"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 text-white p-3 rounded-full mb-4">
                <DollarSign className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {t("home.chandaDonations", "Chanda/Donations")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.supportTempleActivities", "Support temple activities")}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Donation Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="text-5xl text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("home.supportOurTemple", "Support Our Temple")}
            </h2>
            <p className="text-gray-600 mb-8">
              {t("home.yourGenerousDonations", "Your generous donations help us maintain the temple and conduct regular pujas")}
            </p>
            <Link
              href="/donations"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {t("home.donateNow", "Donate Now")}
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t("home.ourServices", "Our Services")}
            </h2>
            <p className="text-gray-600">{t("home.weOfferVariousReligious", "We offer various religious services and ceremonies")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">🙏</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("home.pujaServices", "Puja Services")}
              </h3>
              <p className="text-gray-600">{t("home.wePerformVariousPujas", "We perform various pujas for different occasions")}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">🔥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("home.hawanCeremonies", "Hawan Ceremonies")}
              </h3>
              <p className="text-gray-600">{t("home.sacredFireCeremonies", "Sacred fire ceremonies for purification and blessings")}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">💍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("home.weddingCeremonies", "Wedding Ceremonies")}
              </h3>
              <p className="text-gray-600">
                {t("home.traditionalHinduWedding", "Traditional Hindu wedding ceremonies and rituals")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
