import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CASE_STUDIES } from '@/data/case-studies';

export function CaseStudiesGrid() {
  return (
    <section id="case-studies-grid" className="py-24 bg-transparent text-white relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Proven Results Across Industries
          </h2>
          <p className="text-lg text-zinc-400">
            Read exactly how these companies transformed their outbound process, scaled revenue, and saved hundreds of hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="group flex flex-col bg-white/[0.02] rounded-3xl border border-white/10 p-8 hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-sm shadow-xl relative overflow-hidden">
              
              <div className="h-16 w-full flex items-center justify-start mb-8">
                {study.logoUrl !== '/logos/placeholder.png' ? (
                  <img src={study.logoUrl} alt={`${study.title} Logo`} className="max-h-full max-w-[150px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="h-10 px-4 flex items-center justify-center bg-white/10 rounded-lg text-lg font-bold tracking-wider">
                    {study.title}
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-white">{study.title}</h3>
              
              <p className="text-zinc-400 mb-8 flex-grow leading-relaxed">
                {study.summary}
              </p>
              
              <div className="pt-6 border-t border-white/10 mt-auto">
                <Link href={`/case-studies/${study.slug}`} className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:text-blue-400 transition-colors">
                  Read Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
