export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  logoUrl: string;
  constraint: string;
  solution: string;
  results: string[];
  testimonial: string;
  impact: string;
  summary: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'magic-dev',
    slug: 'magic-dev',
    title: 'Magic.dev',
    logoUrl: '/logos/placeholder.png',
    summary: 'Flooded their pipeline with high-intent enterprise leads and drastically reduced CAC for a $4.6B valuation company.',
    constraint: "As Magic.dev scaled to a $4.6B valuation, their enterprise sales team couldn't manually prospect fast enough to capture high-value enterprise engineering teams. Relying on human SDRs to research and engage technical leads was too slow and expensive.",
    solution: "We engineered a high-volume, autonomous outbound sales engine. The system bypassed manual B2B prospecting by automatically scraping, scoring, and engaging elite engineering leads with hyper-personalized messaging at scale.",
    results: [
      "Flooded their pipeline with high-intent enterprise leads.",
      "Drastically reduced Customer Acquisition Cost (CAC).",
      "Driven the top-of-funnel growth that supported their massive CapitalG and Sequoia funding rounds."
    ],
    testimonial: "Nexaworks built an outbound machine that completely automated our top-of-funnel pipeline, allowing our sales team to focus entirely on closing high-ticket enterprise deals.",
    impact: "We know how to build aggressive, high-converting outbound engines for billion-dollar companies. We will apply this exact automated lead-generation infrastructure to Your agency."
  },
  {
    id: 'sutra-hr',
    slug: 'sutra-hr',
    title: 'Sutra HR',
    logoUrl: '/logos/placeholder.png',
    summary: 'Replaced manual prospecting with a predictable, hands-free sales machine that organized deal flow into one central dashboard.',
    constraint: "Sutra HR’s client acquisition was entirely manual. Relying on spreadsheets and human follow-ups meant warm leads were constantly slipping through the cracks, severely throttling their consulting revenue.",
    solution: "We built an autonomous outbound engine connected to a custom CRM. The system automatically hunted for corporate leads, sent perfectly timed multi-step follow-ups, and organized all the deal flow into one central dashboard.",
    results: [
      "Zero leads lost to human error.",
      "Replaced manual prospecting with a predictable, hands-free sales machine.",
      "Allowed their team to stop hunting for leads and just focus on closing."
    ],
    testimonial: "The autonomous outbound engine shifted our entire focus. We stopped hunting for leads and just focused on closing the pipeline Nexaworks built for us.",
    impact: "We engineer systems that protect and generate revenue. We can centralize Your agency's fragmented pipelines into a single, automated source of truth that never misses a follow-up."
  },
  {
    id: 'epi-scholar',
    slug: 'epi-scholar',
    title: 'EPi Scholar & Epicred',
    logoUrl: '/logos/placeholder.png',
    summary: 'Transformed their lead capture into an AI-driven sales funnel that instantly qualified inbound leads.',
    constraint: "Capturing and qualifying student leads required hours of manual human counseling. This created a massive bottleneck in their sales pipeline, making it impossible to rapidly scale client acquisition.",
    solution: "We transformed their lead capture into an AI-driven sales funnel. We built a dynamic 16-question profiling system that instantly qualified inbound leads and automatically pitched highly personalized study-abroad packages without human intervention.",
    results: [
      "Completely bypassed the manual sales bottleneck.",
      "Converted raw web traffic into highly qualified, ready-to-buy leads instantly.",
      "Automated the entire top-of-funnel qualification process."
    ],
    testimonial: "The AI sales funnel Nexaworks engineered drastically reduced our lead qualification time and automated our core client acquisition from day one.",
    impact: "If Your agency has a sales process that currently requires heavy manual qualification, we know exactly how to automate that conversion logic so you only spend time talking to closed-won prospects."
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
