import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description: profile.metaDescription,
  keywords: [
    "GoHighLevel",
    "AI Automation",
    "n8n",
    "CRM Automation",
    "Funnel Builder",
    "Workflow Automation",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description: profile.metaDescription,
    url: profile.siteUrl,
    siteName: title,
    images: [{ url: "/roy-manzo.png", width: 1024, height: 1024, alt: profile.name }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.metaDescription,
    images: ["/roy-manzo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-text">{children}</body>
    </html>
  );
}
