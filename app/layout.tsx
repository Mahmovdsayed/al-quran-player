import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/provider/Providers";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Layout/Navigation";
import ScrollBar from "@/components/Layout/ScrollBar";
import Footer from "@/components/Layout/Footer";
import SmoothScroll from "../components/Layout/Scroll";
const font = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });


const metadataBase = new URL('https://alquran-player.vercel.app/');

export const metadata: Metadata = {
  metadataBase,
  title: "AL-Quran Player",
  description: "AL-Quran Player offers a comprehensive platform for an enriched Quranic experience. Listen to complete Surahs recited by over 70 renowned reciters, and follow along with the clear and accessible Quranic text. Explore detailed information about each Surah, including its background and themes. Customize and share beautifully designed Ayah cards, adjusting the background, text color, and visibility of Arabic text, English translation, and Ayah numbers. Download these personalized Ayah cards as images to share with friends and family. Additionally, effortlessly keep track of your daily prayers with real-time prayer time calculations based on your location. AL-Quran Player blends functionality and customization to provide a deeply personalized and spiritually fulfilling experience.",
  keywords: "Quran, Quran player, Islamic app, Ayah cards, Surah recitations, Quranic text, prayer times, Quranic information, customize Ayah cards, spiritual app, Islamic features, Quranic app, Surah details, prayer tracker, Quranic verses, Arabic text, English translation, Quranic audio, Muslim app",
  openGraph: {
    title: "AL-Quran Player",
    description: "Explore and enjoy the Quran with AL-Quran Player. Listen to over 70 reciters, view detailed Surah information, customize and share Ayah cards, and track daily prayer times.",
    url: "https://alquran-player.vercel.app/",
    siteName: "AL-Quran Player",
    images: [
      {
        url: "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1725806891/vkif9lkbhdj5k4ws5pdh.jpg",
        width: 1200,
        height: 630,
        alt: "AL-Quran Player Overview"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AL-Quran Player",
    description: "Explore and enjoy the Quran with AL-Quran Player. Listen to over 70 reciters, view detailed Surah information, customize and share Ayah cards, and track daily prayer times.",
    images: [
      {
        url: "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1725806891/vkif9lkbhdj5k4ws5pdh.jpg",
        width: 1200,
        height: 630,
        alt: "AL-Quran Player Overview"
      }
    ],
  },
  manifest: "/manifest.json",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className={`${font.className} overflow-x-hidden min-h-screen`}>
        <Providers>
{/*           <SmoothScroll> */}
          <ScrollBar />
          <Navigation />
            {children}
          <Footer />
          <Analytics />
{/*           </SmoothScroll> */}
        </Providers>
      </body>
    </html>
  );
}
