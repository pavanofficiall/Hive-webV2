"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GitBranch, Zap, Cpu } from "lucide-react"
import { ThreeCrystals } from "@/components/ui/three-crystals"

const POINTS = [
    {
        label: "Working Pipeline",
        desc: "You already have ICP clarity and outreach copy that converts you just can't scale the volume manually.",
        icon: GitBranch
    },
    {
        label: "Proven Sequences",
        desc: "Your copy works. You've booked meetings. Now you need to 10x email volume without adding operational headcount.",
        icon: Zap
    },
    {
        label: "Ready to Delegate Ops",
        desc: "You want to fully hand off list scraping, contact enrichment, inbox monitoring, and lead routing.",
        icon: Cpu
    }
]

export function WhoWeWorkWith() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section id="who-we-work-with" className="pt-20 pb-28 lg:pt-28 lg:pb-36 bg-bg border-t border-surface-2 relative overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] rounded-full blur-[140px]" />
            </div>

            {/* Left background WebGL crystal (behind text) */}
            {mounted && (
                <div className="absolute left-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none overflow-hidden">
                    <ThreeCrystals layout="who-we-work-with-left" />
                </div>
            )}

            {/* Right foreground WebGL crystal (in front of text/cards) */}
            {mounted && (
                <div className="absolute right-0 top-0 bottom-0 w-1/2 z-30 pointer-events-none overflow-hidden">
                    <ThreeCrystals layout="who-we-work-with-right" />
                </div>
            )}

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                {/* Centered Top Content */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-5">
                            Who We Work With
                        </p>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-8">
                            Lead gen agencies with pipelines that are ready to scale.
                        </h2>
                        <p className="text-base sm:text-lg text-text-dim leading-relaxed max-w-3xl mx-auto">
                            We don&apos;t build your strategy or write your outreach copy. We partner with established agencies that already have validated outreach and automate all the friction slowing them down.
                        </p>
                    </motion.div>
                </div>

                {/* 3-Column Fit Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {POINTS.map((point, i) => {
                        const Icon = point.icon
                        return (
                             <motion.div
                                key={point.label}
                                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
                                whileHover={{ y: -5 }}
                                className="bg-surface-1/10 border border-surface-subtle/30 rounded-2xl p-6 lg:p-8 hover:border-brand-500/25 hover:bg-surface-1/15 transition-all duration-300 relative group overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
                            >
                                {/* Subtle internal hover glow */}
                                <div className="absolute -inset-px bg-gradient-to-br from-brand-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Icon container */}
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-1/10 border border-accent-1/20 text-accent-2 mb-6">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
                                    {point.label}
                                </h3>
                                <p className="text-sm text-text-dim leading-relaxed font-normal">
                                    {point.desc}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
