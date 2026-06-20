"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { useTranslations } from "next-intl"

export function HowItWorks() {
    const t = useTranslations("HowItWorks")
    
    const PHASES = [
        {
            week: t('phases.0.week'),
            title: t('phases.0.title'),
            body: t('phases.0.body'),
        },
        {
            week: t('phases.1.week'),
            title: t('phases.1.title'),
            body: t('phases.1.body'),
        },
        {
            week: t('phases.2.week'),
            title: t('phases.2.title'),
            body: t('phases.2.body'),
        },
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observers = cardRefs.current.map((ref, i) => {
            if (!ref) return null
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
                { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
            )
            obs.observe(ref)
            return obs
        })
        return () => observers.forEach(o => o?.disconnect())
    }, [])

    const active = PHASES[activeIndex]

    return (
        // CRITICAL: NO overflow-hidden here — it breaks position:sticky on children
        <section id="how-it-works" className="bg-bg border-t border-surface-2 pt-24 pb-8 lg:pt-32 lg:pb-12 relative">
            {/* Background radial glow — pointer-events-none so it doesn't interfere */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] rounded-full blur-[130px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-16 lg:mb-20">
                    <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-4">{t('sectionLabel')}</p>
                    <h2 className="text-2xl font-medium tracking-tight text-white md:text-4xl">
                        {t('headline')}
                    </h2>
                </div>

                {/* ── DESKTOP ── */}
                <div className="hidden md:flex md:gap-12 lg:gap-16">

                    {/* LEFT COLUMN — sticky cards stack as you scroll */}
                    <div className="w-5/12 flex-shrink-0 self-start">
                        {PHASES.map((phase, i) => (
                            <div
                                key={phase.week}
                                style={{ minHeight: i < PHASES.length - 1 ? "100vh" : "60vh" }}
                            >
                                <div
                                    ref={el => { cardRefs.current[i] = el }}
                                    className="sticky top-24 rounded-2xl border border-surface-subtle/40 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                                    style={{
                                        zIndex: (i + 1) * 10,
                                        background: `rgba(9, 14, 36, ${0.9 + i * 0.03})`,
                                        backgroundImage: `radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)`,
                                        backgroundSize: "18px 18px",
                                    }}
                                >
                                    <p className="text-[10px] font-mono text-accent-2 uppercase tracking-widest mb-3 font-semibold">
                                        {phase.week}
                                    </p>
                                    <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug">
                                        {phase.title}
                                    </h3>

                                    {/* Step indicator dots */}
                                    <div className="flex gap-2 mt-8">
                                        {PHASES.map((_, j) => (
                                            <div
                                                key={j}
                                                className="h-[2.5px] rounded-full transition-all duration-500"
                                                style={{
                                                    width: j <= i ? "1.5rem" : "0.4rem",
                                                    background: j <= i
                                                        ? "rgba(59, 130, 246, 0.65)"
                                                        : "rgba(255,255,255,0.08)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN — sticky detail panel (must stretch to match left column height) */}
                    <div className="flex-1 min-w-0">
                        <div className="sticky top-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="relative rounded-2xl border border-surface-subtle/40 p-10 lg:p-12 min-h-[360px] flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                                    style={{
                                        background: "rgba(9, 14, 36, 0.4)",
                                        backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
                                        backgroundSize: "20px 20px",
                                    }}
                                >
                                    {/* Phase watermark */}
                                    <div className="absolute top-5 right-6">
                                        <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest font-semibold">
                                            {active.week}
                                        </span>
                                    </div>

                                    <p className="text-xl sm:text-2xl font-normal text-text-dim leading-relaxed">
                                        {active.body}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

                {/* ── MOBILE ── */}
                <div className="md:hidden space-y-6">
                    {PHASES.map((phase, i) => (
                        <motion.div
                            key={phase.week}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="rounded-2xl border border-surface-subtle/40 bg-surface-1/15 p-6 shadow-sm"
                        >
                            <div className="inline-block border border-surface-subtle/50 rounded-full px-3 py-0.5 text-[10px] font-mono text-accent-2 mb-3 uppercase tracking-wider font-semibold">
                                {phase.week}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{phase.title}</h3>
                            <p className="text-text-dim text-sm leading-relaxed">{phase.body}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
