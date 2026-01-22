import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://deepika-rajpurohit.vercel.app"),
  title: "Deepika Rajpurohit - Full Stack Developer | Portfolio",
  description: "Full-Stack Developer passionate about creating modern, fast, and scalable web applications. Specialized in JavaScript, React.js, Next.js, Node.js, and MongoDB. Explore my projects, skills, and experience.",
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
  authors: [{ name: "Deepika Rajpurohit" }],
  creator: "Deepika Rajpurohit",
  publisher: "Deepika Rajpurohit",
  openGraph: {
    title: "Deepika Rajpurohit - Full Stack Developer Portfolio",
    description: "Full-Stack Developer passionate about creating modern, fast, and scalable web applications.",
    url: "https://deepikarajpurohit.vercel.app",
    siteName: "Deepika Rajpurohit Portfolio",
    images: [
      {
        url: "/images/logo.png",
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
    description: "Full-Stack Developer passionate about creating modern, fast, and scalable web applications.",
    images: ["/images/logo.png"],
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
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", type: "image/png" },
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
