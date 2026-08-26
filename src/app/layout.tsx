import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calbizhr.com";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-sourcesans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrainsmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CalBizHR | California HR Compliance for Small Businesses",
    template: "%s | CalBizHR",
  },
  description:
    "Free California HR compliance tools built by a former municipal HR administrator — try them before you ever pay for the harder, more personal parts of running a team. SB 1343, SB 553, PAGA, and more.",
  openGraph: {
    type: "website",
    siteName: "CalBizHR",
    title: "CalBizHR | California HR Compliance for Small Businesses",
    description:
      "Free tools first. HR compliance guidance, harassment & violence prevention training, and AI-assisted policy drafting for Los Angeles-area small businesses.",
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CalBizHR — California HR Compliance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalBizHR | California HR Compliance for Small Businesses",
    description: "Free California HR compliance tools — try them before you ever pay for anything else.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CalBizHR / M.E. Consulting",
  description:
    "California HR compliance consulting for small businesses — harassment prevention (SB 1343), workplace violence prevention (SB 553), wage-and-hour compliance, and AI-assisted policy drafting.",
  url: SITE_URL,
  telephone: "+1-626-708-2220",
  areaServed: {
    "@type": "State",
    name: "California",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  priceRange: "$$",
  founder: {
    "@type": "Person",
    name: "Mario Espindola",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#1A2D4D] text-zinc-100 font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <div className="flex-grow flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-grow flex flex-col min-w-0">{children}</main>
        </div>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
