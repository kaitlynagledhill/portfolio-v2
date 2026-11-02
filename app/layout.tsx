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

const title = "Kaitlyn Gledhill. Full-Stack Engineer & Digital Designer.";
const description =
  "Kaitlyn Gledhill is a full-stack engineer and digital designer based on the East Coast.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaitlyn-gledhill.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://kaitlyn-gledhill.com",
    siteName: "Kaitlyn Gledhill",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaitlyn Gledhill portfolio website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
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
