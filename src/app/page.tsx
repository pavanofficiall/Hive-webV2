"use client"

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { WhoWeWorkWith } from "@/components/sections/who-we-work-with";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Services } from "@/components/sections/services";
import { CaseStudy } from "@/components/sections/case-study";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/ui/footer";
import { LogoLoop } from "@/components/ui/logo-loop";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import { BookingModal } from "@/components/ui/booking-modal";

const INTEGRATION_LOGOS = [
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/hubspot.svg" 
          alt="HubSpot" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">HUBSPOT</span>
      </div>
    ),
    title: "HubSpot",
    href: "https://hubspot.com"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/salesforce.svg" 
          alt="Salesforce" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">SALESFORCE</span>
      </div>
    ),
    title: "Salesforce",
    href: "https://salesforce.com"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/linkedin.svg" 
          alt="LinkedIn" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">LINKEDIN</span>
      </div>
    ),
    title: "LinkedIn",
    href: "https://linkedin.com"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/zapier.svg" 
          alt="Zapier" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">ZAPIER</span>
      </div>
    ),
    title: "Zapier",
    href: "https://zapier.com"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/openai.svg" 
          alt="OpenAI" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">OPENAI</span>
      </div>
    ),
    title: "OpenAI",
    href: "https://openai.com"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/apollo.png" 
          alt="Apollo" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">APOLLO</span>
      </div>
    ),
    title: "Apollo.io",
    href: "https://apollo.io"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/smartlead.png" 
          alt="Smartlead" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">SMARTLEAD</span>
      </div>
    ),
    title: "Smartlead",
    href: "https://smartlead.ai"
  },
  {
    node: (
      <div className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors duration-300 select-none group/logo">
        <img 
          src="/logos/instantly.png" 
          alt="Instantly" 
          className="h-5 w-auto brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300 select-none shrink-0"
        />
        <span className="text-xs font-semibold tracking-wider font-mono">INSTANTLY</span>
      </div>
    ),
    title: "Instantly.ai",
    href: "https://instantly.ai"
  }
];

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);

  useEffect(() => {
    // 1. Timer trigger: automatically open after 20 seconds on page
    const timer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem("hive-popup-seen");
      if (!hasSeen) {
        setIsBookingOpen(true);
        sessionStorage.setItem("hive-popup-seen", "true");
      }
    }, 20000);

    // 2. Exit Intent trigger: open when mouse moves towards browser tab boundary
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 30) {
        const hasSeen = sessionStorage.getItem("hive-popup-seen");
        if (!hasSeen) {
          setIsBookingOpen(true);
          sessionStorage.setItem("hive-popup-seen", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <main className="min-h-screen relative font-sans tracking-tight">
      <Navbar />
      <Hero />
      
      {/* Integrations Logo Loop Section */}
      <div className="w-full bg-[#030611] border-y border-surface-2/40 py-8 relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase shrink-0">
            Automated Stack Integrations
          </div>
          <div className="flex-1 w-full overflow-hidden">
            <LogoLoop
              logos={INTEGRATION_LOGOS}
              speed={55}
              direction="left"
              logoHeight={28}
              gap={48}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#030611"
              ariaLabel="Integrated platform partners"
            />
          </div>
        </div>
      </div>

      <WhoWeWorkWith />
      
      {/* Scroll Velocity Marquee */}
      <div className="w-full bg-[#030611] py-8 lg:py-12 border-y border-surface-2/40 overflow-hidden relative z-20">
        <ScrollVelocity
          texts={[
            "SCALE OUTBOUND VOLUME • AUTOMATE LEAD RESEARCH • 10X DEMO APPOINTMENTS • NO MORE MANUAL OPS •",
            "HYPER-PERSONALIZED OUTBOUND • REAL-TIME INTENT TRIGGERED • AUTO SYNC CRM FIELD DATA •"
          ]}
          velocity={40}
          className="text-4xl md:text-[5rem] font-black tracking-tighter uppercase text-white/[0.04] md:text-white/[0.03] font-sans selection:bg-transparent"
        />
      </div>

      <HowItWorks />
      <Services />
      <CaseStudy />
      <FAQ />
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
