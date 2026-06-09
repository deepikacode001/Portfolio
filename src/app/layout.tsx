import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deepika Rajpurohit - Full Stack Developer | Portfolio",
    template: "%s | Deepika Rajpurohit",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Deepika Rajpurohit",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Deepika Rajpurohit", url: SITE_URL }],
  creator: "Deepika Rajpurohit",
  publisher: "Deepika Rajpurohit",
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  openGraph: {
    title: "Deepika Rajpurohit - Full Stack Developer Portfolio",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/deepika.jpeg",
        width: 1200,
        height: 630,
        alt: "Deepika Rajpurohit - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepika Rajpurohit - Full Stack Developer",
    description: SITE_DESCRIPTION,
    images: ["/images/deepika.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
