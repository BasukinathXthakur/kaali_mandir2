// Navbar.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  Bell,
  Heart,
  BookOpen,
  Music,
  Building2,
  Users,
  MapPin,
  DollarSign,
  Clock,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { data: session, status } = useSession();
  const currentUser = session?.user;
  const isAdmin = false; // You can add admin role logic later
  const { currentLanguage, changeLanguage, t, languageNames, languages } =
    useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const languageRef = useRef(null);
  const userMenuRef = useRef(null);
  const servicesRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    // Use mousedown for better detection
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close services menu when route changes
  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    setUserMenuOpen(false);
  };

  const handleLanguageChange = async (language) => {
    await changeLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-orange-600">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" onClick={() => setServicesOpen(false)}>
            <img
              src="/kali.jpeg"
              alt="Kaali Mandir"
              className="w-12 h-12 rounded-full border-2 border-orange-600 p-1 object-cover"
            />
          </Link>
          <Link href="/" onClick={() => setServicesOpen(false)}>
            <span className="text-xl font-devanagari text-orange-600">
              Kaali Mandir
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.home")}
          </Link>
          <div className="relative" ref={servicesRef}>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                setServicesOpen(!servicesOpen);
              }}
              className="flex items-center text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <span>{t("navbar.services")}</span>
              <ChevronDown className="ml-1" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-20">
                <Link
                  href="/pujas"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Heart className="mr-3 text-orange-600" /> Puja Booking
                </Link>
                <Link
                  href="/chhadava"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Heart className="mr-3 text-orange-600" /> Chhadava Service
                </Link>
                <Link
                  href="/prashad"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Heart className="mr-3 text-orange-600" /> Prashad Booking
                </Link>
                <Link
                  href="/panchang"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Clock className="mr-3 text-orange-600" />{" "}
                  {t("home.panchangHoroscope")}
                </Link>
                <Link
                  href="/music"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Music className="mr-3 text-orange-600" />{" "}
                  {t("home.devotionalMusic")}
                </Link>
                <Link
                  href="/literature"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <BookOpen className="mr-3 text-orange-600" />{" "}
                  {t("home.hinduLiterature")}
                </Link>
                <Link
                  href="/virtual-temple"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Building2 className="mr-3 text-orange-600" />{" "}
                  {t("home.divineTemple")}
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/events"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.events")}
          </Link>
          <Link
            href="/gallery"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            Gallery
          </Link>
          <Link
            href="/yatra"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.yatra")}
          </Link>
          <Link
            href="/community"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("home.sanataniCommunity")}
          </Link>
          <Link
            href="/donations"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.donations")}
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setServicesOpen(false)}
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              {t("navbar.admin")}
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                setLanguageOpen(!languageOpen);
              }}
              className="flex items-center border px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {languageNames[currentLanguage]}
              <ChevronDown className="ml-1" />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg">
                <button
                  onClick={() => handleLanguageChange(languages.ENGLISH)}
                  className={`block w-full text-left px-4 py-2 text-gray-800 font-medium hover:bg-orange-100 hover:text-orange-600 transition-colors ${
                    currentLanguage === languages.ENGLISH
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : ""
                  }`}
                >
                  {languageNames[languages.ENGLISH]}
                </button>
                <button
                  onClick={() => handleLanguageChange(languages.HINDI)}
                  className={`block w-full text-left px-4 py-2 text-gray-800 font-medium hover:bg-orange-100 hover:text-orange-600 transition-colors ${
                    currentLanguage === languages.HINDI
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : ""
                  }`}
                >
                  {languageNames[languages.HINDI]}
                </button>
                <button
                  onClick={() => handleLanguageChange(languages.MAITHILI)}
                  className={`block w-full text-left px-4 py-2 text-gray-800 font-medium hover:bg-orange-100 hover:text-orange-600 transition-colors ${
                    currentLanguage === languages.MAITHILI
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : ""
                  }`}
                >
                  {languageNames[languages.MAITHILI]}
                </button>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setUserMenuOpen(!userMenuOpen);
              }}
              className="cursor-pointer"
            >
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.image ? (
                    <img
                      src={currentUser.image}
                      alt={currentUser.name || "User"}
                      className="w-10 h-10 rounded-full border-2 border-orange-600 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                      {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              ) : (
                <User className="w-8 h-8 text-gray-500 hover:text-orange-600 transition-colors" />
              )}
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl overflow-hidden z-50">
                {currentUser ? (
                  <>
                    {/* User Info Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-white">
                      <div className="flex items-center gap-3">
                        {currentUser.image ? (
                          <img
                            src={currentUser.image}
                            alt={currentUser.name || "User"}
                            className="w-12 h-12 rounded-full border-2 border-white object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-xl">
                            {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">
                            {currentUser.name || "User"}
                          </p>
                          <p className="text-xs opacity-90 truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          {t("navbar.adminDashboard", "Admin Dashboard")}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t("navbar.logout", "Logout")}
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {t("navbar.login", "Login / Sign Up")}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
