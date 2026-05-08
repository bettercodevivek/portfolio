import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Call Vivek | Backend Engineer",
  description:
    "Need backend that survives chaos? Better Call Vivek. Lead Backend Developer specializing in production REST APIs, async job pipelines, and real-time systems.",
  keywords: [
    "backend developer",
    "Node.js",
    "REST API",
    "Socket.IO",
    "BullMQ",
    "Azure",
    "Vivek Singh",
  ],
  authors: [{ name: "Vivek Singh" }],
  openGraph: {
    title: "Better Call Vivek | Backend Engineer",
    description: "Need backend that survives chaos? Better Call Vivek.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a08] text-[#f0e6c8]">
        {children}
      </body>
    </html>
  );
}
