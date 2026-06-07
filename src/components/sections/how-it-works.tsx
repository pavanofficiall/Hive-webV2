"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const PHASES = [
    {
        week: "Week 1",
        title: "Discovery & Planning",
        body: "We sit down with your team to map every step of your current pipeline. We audit your tools, data sources, enrichment flow, and sequences — then draft a full automation specification tailored to how you work.",
    },
    {
        week: "Weeks 2–3",
        title: "Development",
        body: "Our engineers build every component of your automation infrastructure — scrapers, enrichment scripts, inbox rotation, CRM integrations, and AI personalization layers. Nothing goes live until every node is tested.",
    },
    {
        week: "Week 4+",
        title: "Live on Autopilot",
        body: "We flip the switch. Leads come in daily, sequences run automatically, and meetings book straight to your calendar. Your team only handles qualified replies.",
    },
]

// Distance from top of viewport where cards stick (below navbar)
const STICKY_TOP = 96 // px

export function HowItWorks() {
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
        <section id="how-it-works" className="bg-bg border-t border-surface-2 pt-24 pb-8 lg:pt-32 lg:pb-12 relative overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] rounded-full blur-[130px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                {/* Heading */}
                <div className="mb-16 lg:mb-20">
                    <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-4">How It Works</p>
                    <h2 className="text-2xl font-medium tracking-tight text-white md:text-4xl">
                        From audit to autopilot in 30 days.
                    </h2>
                </div>

                {/* ── DESKTOP ── */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-12 lg:gap-16 items-start">

                    {/* LEFT COLUMN — stacking sticky cards */}
                    <div className="col-span-5 relative">
                        {PHASES.map((phase, i) => (
                            <div
                                key={phase.week}
                                className="relative"
                                style={{ minHeight: i < PHASES.length - 1 ? "100vh" : "50vh" }}
                            >
                                <div
                                    ref={el => { cardRefs.current[i] = el }}
                                    className="sticky rounded-2xl border border-surface-subtle/40 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                                    style={{
                                        top: STICKY_TOP,
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

                    {/* RIGHT COLUMN — sticky text panel */}
                    <div className="col-span-7 h-full">
                        <div className="sticky top-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="relative rounded-2xl border border-surface-subtle/40 p-10 lg:p-12 min-h-[300px] flex items-center bg-surface-1/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden"
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
