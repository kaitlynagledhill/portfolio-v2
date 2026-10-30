import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500"],
});

const title = "Kaitlyn Gledhill | Full Stack Engineer, Digital Designer";
const description = "Full stack engineer and digital designer.";

export const metadata: Metadata = {
  // metadataBase: new URL("https://yourdomain.com"), // add once deployed
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1617",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
