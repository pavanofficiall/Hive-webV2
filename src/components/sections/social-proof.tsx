"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

// Inline SVG logo marks for each VC
const vcLogos = [
    {
        name: "Sequoia",
        svg: (
            <svg viewBox="0 0 120 28" fill="currentColor" className="h-7 w-auto">
                <path d="M12.5 2C6.7 2 2 6.7 2 12.5S6.7 23 12.5 23c3.2 0 6-1.4 7.9-3.6l-2.1-1.7c-1.4 1.6-3.5 2.6-5.8 2.6-4.3 0-7.8-3.5-7.8-7.8S8.2 4.7 12.5 4.7c2.3 0 4.4 1 5.8 2.6l2.1-1.7C18.5 3.4 15.7 2 12.5 2z" />
                <text x="28" y="18" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.5">Sequoia</text>
            </svg>
        ),
    },
    {
        name: "Accel",
        svg: (
            <svg viewBox="0 0 100 28" fill="currentColor" className="h-7 w-auto">
                <polygon points="2,22 10,4 18,22 14,22 10,12 6,22" />
                <text x="22" y="18" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.5">Accel</text>
            </svg>
        ),
    },
    {
        name: "Y Combinator",
        svg: (
            <svg viewBox="0 0 150 28" fill="currentColor" className="h-7 w-auto">
                <rect x="1" y="1" width="22" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="6" y="18" fontSize="15" fontWeight="800" fontFamily="Inter, sans-serif">Y</text>
                <text x="28" y="18" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.5">Combinator</text>
            </svg>
        ),
    },
    {
        name: "Index Ventures",
        svg: (
            <svg viewBox="0 0 160 28" fill="currentColor" className="h-7 w-auto">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" />
                <text x="28" y="18" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.5">Index Ventures</text>
            </svg>
        ),
    },
]

export function SocialProof() {
    const t = useTranslations("SocialProof")
    return (
        <section className="py-16 border-b border-surface-2 bg-bg relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-xs font-medium tracking-widest text-text-muted uppercase mb-12"
                >
                    {t('title')}
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
                    {vcLogos.map((vc, i) => (
                        <motion.div
                            key={vc.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                            className="text-white/80 hover:text-white/100 transition-colors duration-300"
                        >
                            {vc.svg}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
