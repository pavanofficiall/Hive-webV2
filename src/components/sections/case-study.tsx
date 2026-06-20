"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2, TrendingUp, Sparkles, Zap, Quote } from "lucide-react"
import { ThreeCrystals } from "@/components/ui/three-crystals"
import { useTranslations } from "next-intl"

interface CaseStudyItem {
    industry: string
    clientName: string
    tagline: string
    logo?: string
    metrics: {
        value: string
        label: string
        icon: React.ComponentType<{ className?: string }>
    }[]
    problem: string
    solution: string
    delivered?: string[]
    quote?: string
    speaker?: {
        name: string
        role: string
        avatarInitials: string
    }
}

export function CaseStudy() {
    const t = useTranslations("CaseStudy")
    const [mounted, setMounted] = useState(false)

    const CASE_STUDIES: CaseStudyItem[] = [
        {
            industry: t('studies.0.industry'),
            clientName: "YourCase AI",
            tagline: t('studies.0.tagline'),
            logo: "/yourcase-logo.png",
            metrics: [
                { value: "8 hrs", label: t('studies.0.metrics.0.label'), icon: Zap },
                { value: "3.5x", label: t('studies.0.metrics.1.label'), icon: TrendingUp },
                { value: "99%", label: t('studies.0.metrics.2.label'), icon: Sparkles }
            ],
            problem: t('studies.0.problem'),
            solution: t('studies.0.solution'),
        },
        {
            industry: t('studies.1.industry'),
            clientName: "Lead OS",
            tagline: t('studies.1.tagline'),
            metrics: [
                { value: "34%", label: t('studies.1.metrics.0.label'), icon: Zap },
                { value: "82%", label: t('studies.1.metrics.1.label'), icon: TrendingUp },
                { value: "4.2x", label: t('studies.1.metrics.2.label'), icon: Sparkles }
            ],
            problem: t('studies.1.problem'),
            solution: t('studies.1.solution')
        }
    ]

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section id="case-studies" className="pt-4 pb-24 lg:pt-6 lg:pb-32 bg-[#030611] border-t border-surface-2/40 relative overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)] rounded-full blur-[120px]" />
            </div>

            {/* WebGL 3D Crystals Background Component */}
            {mounted && (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <ThreeCrystals layout="case-studies-bg" />
                </div>
            )}

            {/* WebGL 3D Crystals Foreground Component */}
            {mounted && (
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                    <ThreeCrystals layout="case-studies-fg" />
                </div>
            )}

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-16 lg:mb-20">
                    <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-4">{t('sectionLabel')}</p>
                    <h2 className="text-2xl font-medium tracking-tight text-white md:text-4xl">
                        {t('headline')}
                    </h2>
                    <p className="mt-4 text-sm text-text-dim max-w-2xl">
                        {t('subhead')}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {CASE_STUDIES.map((study, idx) => (
                        <motion.div
                            key={study.clientName}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                            whileHover={{ y: -6 }}
                            className="flex flex-col bg-surface-1/20 border border-surface-subtle/40 rounded-2xl p-5 sm:p-8 lg:p-10 hover:border-brand-400/25 transition-all duration-300 relative group overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                        >
                            {/* Card Hover Glow effect */}
                            <div className="absolute -inset-px bg-gradient-to-tr from-brand-500/10 via-transparent to-accent-1/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Client Header */}
                            <div className="mb-8 pb-6 border-b border-surface-2/60 relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-mono text-accent-2 tracking-widest font-semibold uppercase bg-accent-1/10 px-2.5 py-1 rounded-md border border-accent-1/10">
                                        {study.industry}
                                    </span>
                                    {study.logo ? (
                                        <Image
                                            src={study.logo}
                                            alt={`${study.clientName} logo`}
                                            width={36}
                                            height={36}
                                            className="invert opacity-85 group-hover:opacity-100 transition-all duration-300 object-contain max-h-[36px] w-auto"
                                        />
                                    ) : (
                                        <span className="text-[10px] text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full font-medium">
                                            {t('delivered')}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-semibold text-white tracking-tight">{study.clientName}</h3>
                                <p className="text-xs text-text-dim mt-1.5 font-medium">{study.tagline}</p>
                            </div>

                            {/* Metrics Display */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 bg-[#050818]/60 border border-surface-subtle/35 p-3.5 sm:p-5 rounded-xl relative z-10">
                                {study.metrics.map((metric, mIdx) => {
                                    const Icon = metric.icon
                                    return (
                                        <div key={mIdx} className="text-center">
                                            <div className="flex justify-center mb-1">
                                                <Icon className="w-3.5 h-3.5 text-text-muted opacity-80" />
                                            </div>
                                            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none mb-1">
                                                {metric.value}
                                            </p>
                                            <p className="text-[9px] font-mono text-text-muted uppercase tracking-wider font-semibold">
                                                {metric.label}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Details (Problem & Solution) */}
                            <div className="space-y-4 mb-8 relative z-10 flex-1">
                                <div>
                                    <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">{t('theStruggle')}</h4>
                                    <p className="text-xs text-text-dim leading-relaxed">
                                        {study.problem}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">{t('theSolution')}</h4>
                                    <p className="text-xs text-text-dim leading-relaxed">
                                        {study.solution}
                                    </p>
                                </div>
                            </div>

                            {/* Automated Workflows Checklist */}
                            {study.delivered && study.delivered.length > 0 && (
                                <div className="mb-8 p-4 sm:p-5 rounded-xl bg-surface-1/45 border border-surface-subtle/30 relative z-10">
                                    <h4 className="text-[10px] font-mono text-white uppercase tracking-widest font-semibold mb-3">
                                        {t('automatedInfrastructureBuilt')}
                                    </h4>
                                    <ul className="space-y-2">
                                        {study.delivered.map((item, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-2 text-xs text-text-dim">
                                                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Testimonial Quote */}
                            {study.quote && study.speaker && (
                                <div className="mt-auto pt-6 border-t border-surface-2/60 relative z-10">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-accent-1/10 text-accent-2 border border-accent-1/25 font-bold text-sm">
                                            {study.speaker.avatarInitials}
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <Quote className="absolute -top-1 -left-2 w-4 h-4 text-accent-1/15 rotate-180" />
                                                <p className="text-xs text-text-dim italic leading-relaxed mb-3 pl-2.5">
                                                    &quot;{study.quote}&quot;
                                                </p>
                                            </div>
                                            <footer className="text-xs text-text-muted pl-2.5">
                                                <strong className="text-white font-medium">{study.speaker.name}</strong> — {study.speaker.role}
                                            </footer>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
