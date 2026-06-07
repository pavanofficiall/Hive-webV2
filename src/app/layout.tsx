import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const sora = Sora({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "HIVE",
  description: "Identify companies actively buying software and book qualified meetings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} font-sans antialiased bg-bg text-text-primary`}>
        {/* Aurora gradient background — fixed, behind everything */}
        <div aria-hidden="true" className="aurora-bg" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}
