import { getCaseStudyBySlug } from '@/data/case-studies';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { CheckCircle2, Quote, ArrowLeft, Target, Lightbulb, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ThreeCrystals } from '@/components/ui/three-crystals';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);
  
  if (!study) {
    return { title: 'Case Study Not Found | Hive' };
  }

  return {
    title: `${study.title} Case Study | Hive`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen relative font-sans tracking-tight bg-[#030611] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-900/20 via-[#030611]/50 to-[#030611] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <article className="pt-32 pb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-wider">Back to Case Studies</span>
          </Link>

          {/* Hero Section */}
          <header className="mb-24 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Client Success Story
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12 bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent max-w-4xl leading-tight">
              How we transformed <span className="text-blue-500">{study.title}</span>
            </h1>
            
            <div className="flex items-center justify-center p-8 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm w-full max-w-2xl shadow-2xl">
              {study.logoUrl !== '/logos/placeholder.png' ? (
                <img src={study.logoUrl} alt={`${study.title} Logo`} className="max-h-24 w-auto object-contain filter drop-shadow-lg" />
              ) : (
                <div className="h-16 px-8 flex items-center justify-center bg-white/5 rounded-xl text-2xl font-bold tracking-wider text-zinc-300">
                  {study.title}
                </div>
              )}
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column: Context & Solution */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Constraint Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-sm relative overflow-hidden group hover:bg-white/[0.03] transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Target className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-wide">The Constraint</h2>
                </div>
                <p className="text-lg leading-relaxed text-zinc-400 font-light">
                  {study.constraint}
                </p>
              </div>

              {/* Solution Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-sm relative overflow-hidden group hover:bg-white/[0.03] transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Lightbulb className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-wide">What We Built</h2>
                </div>
                <p className="text-lg leading-relaxed text-zinc-400 font-light">
                  {study.solution}
                </p>
              </div>

            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Results Card */}
              <div className="bg-gradient-to-b from-blue-900/20 to-white/[0.02] border border-blue-500/20 rounded-3xl p-10 backdrop-blur-sm h-full shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-wide">The Results</h2>
                </div>
                
                <ul className="space-y-6">
                  {study.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-500/20 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-base text-zinc-300 leading-relaxed font-light">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Full Width Bottom: Testimonial & Impact */}
            <div className="lg:col-span-12 grid lg:grid-cols-2 gap-8 mt-4">
              
              {/* Testimonial */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 lg:p-14 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
                <Quote className="absolute -top-6 -left-6 w-32 h-32 text-white/5 rotate-12" />
                <blockquote className="relative z-10">
                  <p className="text-2xl md:text-3xl text-white font-medium italic leading-snug mb-8">
                    "{study.testimonial}"
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${study.title}`} alt="Avatar" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{study.title} Team</div>
                      <div className="text-sm text-zinc-500">Verified Client</div>
                    </div>
                  </footer>
                </blockquote>
              </div>

              {/* Impact / CTA styled block */}
              <div className="bg-blue-600 rounded-3xl p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <h2 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-6 relative z-10">What This Means For You</h2>
                <p className="text-2xl lg:text-3xl leading-snug text-white font-medium relative z-10">
                  {study.impact}
                </p>
              </div>

            </div>
          </div>
          
        </div>
      </article>

      <Footer />
    </main>
  );
}
