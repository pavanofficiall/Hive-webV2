"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { ThreeCrystals } from "@/components/ui/three-crystals"

import BlurText from "@/components/ui/blur-text"

interface HeroProps {
    onBookCall?: () => void
}

export function Hero({ onBookCall }: HeroProps) {
    const t = useTranslations("Hero")
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section ref={containerRef} className="relative pt-36 pb-24 lg:pt-44 lg:pb-36 min-h-[82vh] flex flex-col justify-center overflow-hidden bg-bg">
            
            {/* HIVE LinkedIn Banner Themed Radial Glow Background */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,rgba(3,6,17,0)_70%)] rounded-full blur-[140px]" />
                <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-[#030611] via-transparent to-[#030611] pointer-events-none opacity-40" />
            </div>

            {/* WebGL 3D Crystals Background Component */}
            {mounted && <ThreeCrystals />}

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

                {/* Top section: Headline + CTA */}
                <div className="text-center mb-16 lg:mb-20 relative z-20">

                    {/* Headline styled to match HIVE LinkedIn Banner exactly */}
                    <BlurText
                        as="h1"
                        delay={60}
                        animateBy="words"
                        direction="bottom"
                        className="mx-auto max-w-5xl font-sans text-4xl sm:text-[68px] font-semibold tracking-tight text-white leading-[1.12] justify-center"
                        segments={[
                            t('headlineWe'),
                            { text: t('headlineMaster'), className: "italic font-serif font-medium text-blue-200" },
                            t('headlineMechanics'),
                            { br: true, className: "hidden sm:block" },
                            { text: t('headlineFutureAgency'), className: "italic font-serif font-medium text-blue-200" },
                            t('headlineGrowth')
                        ]}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="mx-auto mt-8 max-w-2xl text-lg text-text-dim leading-relaxed"
                    >
                        {t('description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        className="mt-8 flex items-center justify-center gap-4"
                    >
                        <Button size="lg" className="group h-12 px-7 text-base font-medium shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]" onClick={onBookCall || (() => window.open('https://calendly.com/nexawork/hive', '_blank'))}>
                            {t('bookDemo')}
                            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="h-12 px-7 text-base font-medium border-brand-500/20 bg-transparent text-white hover:bg-surface-1/50 hover:border-brand-400/50"
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('learnMore')}
                        </Button>
                    </motion.div>
                </div>

                {/* Structured card panel — same design language but deep royal-blue themed */}
                {/* 
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                    className="rounded-2xl border border-brand-500/20 bg-[#070b1e]/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,11,77,0.3)] overflow-hidden"
                >
                    <div className="grid lg:grid-cols-2">

                        <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-brand-500/20 relative bg-surface-1/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-1 border border-brand-500/20">
                                    <Radio className="h-5 w-5 text-brand-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-white">Live Pipeline Activity</h3>
                                    <p className="text-xs text-text-muted">Real-time automation status</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-xs font-medium text-text-dim mb-2 border-b border-brand-500/10 pb-2">Recent Activities:</div>
                                {[
                                    { text: "100 leads scraped & enriched", time: "2 min ago" },
                                    { text: "AI personalized emails drafted", time: "12 min ago" },
                                    { text: "Campaign sequence scheduled", time: "1 hr ago" },
                                ].map((signal, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + (idx * 0.15) }}
                                        className="flex items-center gap-3 text-sm bg-[#030611]/80 p-3 rounded-lg border border-brand-500/10"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_var(--color-brand-glow)]" />
                                        <span className="text-white/90 flex-1 text-[13px]">{signal.text}</span>
                                        <span className="text-text-muted font-mono text-[11px]">{signal.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 lg:p-10 bg-[#030611]/50 relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="grid grid-cols-2 gap-4 h-full content-center relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="p-5 rounded-xl bg-bg border border-brand-500/10"
                                >
                                    <Zap className="h-4 w-4 text-brand-400 mb-3" />
                                    <div className="text-2xl font-semibold text-white mb-0.5">
                                        <AnimatedNumber value={45} />
                                    </div>
                                    <div className="text-xs text-text-dim">Hours Saved</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="p-5 rounded-xl bg-bg border border-brand-500/10"
                                >
                                    <Target className="h-4 w-4 text-success mb-3" />
                                    <div className="text-2xl font-semibold text-white mb-0.5">
                                        <AnimatedNumber value={2450} />
                                    </div>
                                    <div className="text-xs text-text-dim">Leads Processed</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="col-span-2 p-5 rounded-xl bg-gradient-to-br from-brand-500/10 to-bg border border-brand-500/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-semibold text-white mb-0.5">12</div>
                                            <div className="text-xs text-brand-400">Active Campaigns (30 days)</div>
                                        </div>
                                        <div className="h-12 w-28 relative">
                                            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                                                <motion.path
                                                    initial={{ pathLength: 0, opacity: 0 }}
                                                    animate={{ pathLength: 1, opacity: 1 }}
                                                    transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                                                    d="M0 35 Q 20 25, 40 30 T 70 15 T 100 5"
                                                    fill="none"
                                                    stroke="var(--color-brand-400)"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <motion.path
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.3 }}
                                                    transition={{ duration: 1.5, delay: 1.2 }}
                                                    d="M0 35 Q 20 25, 40 30 T 70 15 T 100 5 L 100 40 L 0 40 Z"
                                                    fill="url(#hero-sparkline-gradient)"
                                                />
                                                <defs>
                                                    <linearGradient id="hero-sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="1" />
                                                        <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </motion.div>
                */}
            </div>
        </section>
    )
}
