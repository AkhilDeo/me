import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
  title: "Akhil Deo | AI Researcher & Software Engineer",
  description: "Personal portfolio of Akhil Deo - AI/ML researcher at Johns Hopkins, focusing on LLM reasoning, NLP, and building intelligent systems.",
  keywords: ["AI", "Machine Learning", "NLP", "LLM", "Johns Hopkins", "Software Engineer"],
  authors: [{ name: "Akhil Deo" }],
  openGraph: {
    title: "Akhil Deo | AI Researcher & Software Engineer",
    description: "Personal portfolio of Akhil Deo - AI/ML researcher at Johns Hopkins",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
