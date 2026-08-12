import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bizhr.vercel.app";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dmmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BizHR | California HR Compliance for Small Businesses",
    template: "%s | BizHR",
  },
  description:
    "Free California HR compliance tools built by a former municipal HR administrator — try them before you ever pay for the harder, more personal parts of running a team. SB 1343, SB 553, PAGA, and more.",
  openGraph: {
    type: "website",
    siteName: "BizHR",
    title: "BizHR | California HR Compliance for Small Businesses",
    description:
      "Free tools first. HR compliance guidance, harassment & violence prevention training, and AI-assisted policy drafting for Los Angeles-area small businesses.",
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BizHR — California HR Compliance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizHR | California HR Compliance for Small Businesses",
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
  name: "BizHR / M.E. Consulting",
  description:
    "California HR compliance consulting for small businesses — harassment prevention (SB 1343), workplace violence prevention (SB 553), wage-and-hour compliance, and AI-assisted policy drafting.",
  url: SITE_URL,
  telephone: "+1-626-999-6239",
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
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-zinc-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
