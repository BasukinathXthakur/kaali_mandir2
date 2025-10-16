"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(getErrorMessage(errorParam));
    }
  }, [searchParams]);

  const getErrorMessage = (error) => {
    switch (error) {
      case "OAuthSignin":
        return "Error connecting to Google. Please check your Google OAuth credentials.";
      case "OAuthCallback":
        return "Error during Google sign in. Please try again.";
      case "OAuthCreateAccount":
        return "Could not create account. Please try again.";
      case "Configuration":
        return "Server configuration error. Please contact administrator.";
      default:
        return "An error occurred during sign in. Please try again.";
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Failed to sign in. Please try again.");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/kali.jpeg"
              alt="Kaali Mandir"
              className="w-20 h-20 rounded-full border-4 border-orange-600 object-cover shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-devanagari">
            काली मंदिर
          </h1>
          <p className="text-gray-600 text-lg">
            Enter the Sacred Space
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold text-sm">Authentication Error</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              {error.includes("OAuth credentials") && (
                <p className="text-red-600 text-xs mt-2">
                  Please check your .env.local file and ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set correctly.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <LogIn className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your spiritual journey
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 border-2 border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg hover:border-orange-400 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Signing in...</span>
              </>
            ) : (
              <>
                <FcGoogle className="w-6 h-6" style={{ fontSize: '24px' }} />
                <span className="text-lg">Sign in with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Secure & Fast Login
                </span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  Book Pujas & Prasad
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  Access Sacred Texts & Aartis
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  Join Sanatani Community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}


