import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LaunguageContext";
import ClientNavbar from "./components/ClientNavbar";
import ClientFooter from "./components/ClientFooter";
import SessionProvider from "../components/SessionProvider";

export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kaali Mandir - Divine Temple Experience",
  description: "Welcome to Kaali Mandir - Your Temple, Anytime, Anywhere. Book pujas, explore Hindu literature, and connect with the divine community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LanguageProvider>
            <ClientNavbar />
            <main className="min-h-screen">{children}</main>
            <ClientFooter />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
