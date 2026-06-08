import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { GoogleAnalytics } from "@next/third-parties/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sans" });

const BASE_URL = "https://hive.nexaworks.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HIVE — Outbound Automation for Lead Gen Agencies",
    template: "%s | HIVE",
  },
  description:
    "HIVE automates your entire outbound pipeline — lead research, personalisation, CRM sync — so your agency books 3× more demos without adding headcount.",
  keywords: [
    "outbound automation",
    "lead generation agency",
    "B2B outbound automation",
    "cold email automation",
    "CRM automation",
    "lead research automation",
    "outbound pipeline",
    "sales automation agency",
  ],
  authors: [{ name: "Nexaworks", url: "https://nexaworks.tech" }],
  creator: "Nexaworks",
  publisher: "Nexaworks",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "HIVE by Nexaworks",
    title: "HIVE — Outbound Automation for Lead Gen Agencies",
    description:
      "HIVE automates your entire outbound pipeline — lead research, personalisation, CRM sync — so your agency books 3× more demos without adding headcount.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HIVE — Outbound Automation for Lead Gen Agencies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIVE — Outbound Automation for Lead Gen Agencies",
    description:
      "Automate your outbound pipeline. Book 3× more demos without adding headcount.",
    images: ["/og-image.png"],
    creator: "@nexaworks",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "google85224852cc74b547",
  },
};

// Organization JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HIVE by Nexaworks",
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  description:
    "HIVE automates outbound pipelines for lead generation agencies — lead research, personalisation, CRM sync, and deliverability at scale.",
  sameAs: [
    "https://linkedin.com/in/pavanbabar",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "pavan@nexaworks.tech",
    availableLanguage: "English",
  },
};

// Website JSON-LD for sitelinks searchbox eligibility
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HIVE",
  url: BASE_URL,
  description: "Outbound Automation for Lead Gen Agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Supabase for faster data fetching */}
        <link rel="preconnect" href="https://hftctbmruaepokrokdwv.supabase.co" />
        <link rel="dns-prefetch" href="https://hftctbmruaepokrokdwv.supabase.co" />
        {/* Preconnect to Google Fonts (already handled by next/font but belt-and-suspenders) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${sora.variable} font-sans antialiased bg-bg text-text-primary`}>
        {/* Aurora gradient background — fixed, behind everything */}
        <div aria-hidden="true" className="aurora-bg" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <WhatsAppButton />
        <GoogleAnalytics gaId="G-YD34N1NRVL" />
      </body>
    </html>
  );
}
