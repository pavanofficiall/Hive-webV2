'use client';

import { ArrowRight, Star } from 'lucide-react';
import { ScrollingColumns } from './ScrollingColumns';
import Link from 'next/link';
import { ThreeCrystals } from '@/components/ui/three-crystals';
import { useState, useEffect } from 'react';

export function CaseStudiesHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden bg-transparent text-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/10 to-transparent pointer-events-none" />
      
      {mounted && <ThreeCrystals layout="hero" />}
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Customer Stories
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              How Clients Transform Their Workflow With <span className="text-blue-500">Hive</span>
            </h1>
            
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-xl">
              See how modern teams booked 36+ meetings in just 22 days and built a massive pipeline in 3 months with our automation platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#case-studies-grid" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
                Read the Case Studies
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            
          </div>

          {/* Right Column - Scrolling Animation */}
          <div className="lg:block">
            <ScrollingColumns />
          </div>

        </div>
      </div>
    </section>
  );
}
