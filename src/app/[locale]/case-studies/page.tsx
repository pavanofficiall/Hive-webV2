import { getTranslations } from 'next-intl/server';
import { CaseStudiesHero } from '@/components/case-studies/CaseStudiesHero';
import { CaseStudiesGrid } from '@/components/case-studies/CaseStudiesGrid';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'metadata' });
  return {
    title: 'Case Studies | Hive',
    description: 'Discover how B2B companies grew their pipeline and automated workflows with Hive.',
  };
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen relative font-sans tracking-tight bg-[#030611] text-white">
      <Navbar />
      <div className="pt-20">
        <CaseStudiesHero />
        <CaseStudiesGrid />
      </div>
      <Footer />
    </main>
  );
}
