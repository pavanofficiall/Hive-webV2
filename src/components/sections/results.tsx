"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { TrendingUp, Target, DollarSign } from "lucide-react"
import Image from "next/image"

// ─── Animated Counter Hook ───
function useCounter(target: number, duration: number = 1500, inView: boolean = false) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!inView) return
        const startTime = performance.now()

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 4)
            setValue(Math.floor(easeOut * target))

            if (progress < 1) {
                requestAnimationFrame(update)
            } else {
                setValue(target)
            }
        }

        requestAnimationFrame(update)
    }, [target, duration, inView])

    return value
}

// ─── Metric Card ───
function MetricCard({
    icon: Icon,
    label,
    suffix,
    prefix,
    change,
    targetNum,
    delay,
}: {
    icon: React.ElementType
    label: string
    suffix?: string
    prefix?: string
    change: string
    targetNum: number
    delay: number
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const count = useCounter(targetNum, 1800, inView)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="rounded-2xl border border-surface-2 bg-bg p-8 relative overflow-hidden group hover:border-accent-1/30 transition-colors duration-300"
        >
            {/* Hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-1/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-1 border border-surface-2">
                    <Icon className="h-5 w-5 text-text-muted" />
                </div>
                <div className="text-sm font-medium text-text-dim">{label}</div>
            </div>

            <div className="flex items-end gap-3 mb-4">
                <div className="text-4xl lg:text-5xl font-semibold tracking-tight text-white tabular-nums">
                    {prefix}{count}{suffix}
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.8 }}
                    className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-md mb-1.5 border border-success/20"
                >
                    {change}
                </motion.div>
            </div>

            {/* Mini sparkline per card */}
            <div className="h-8 w-full mt-2">
                <svg viewBox="0 0 100 24" className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                        d="M0 20 Q 10 18, 20 16 T 40 12 T 60 8 T 80 5 T 100 2"
                        fill="none"
                        stroke="var(--color-accent-1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
                    />
                    <motion.path
                        d="M0 20 Q 10 18, 20 16 T 40 12 T 60 8 T 80 5 T 100 2 L 100 24 L 0 24 Z"
                        fill="url(#metric-gradient)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.15 }}
                        transition={{ duration: 1.5, delay: delay + 0.6 }}
                    />
                    <defs>
                        <linearGradient id="metric-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-accent-1)" stopOpacity="1" />
                            <stop offset="100%" stopColor="var(--color-accent-1)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </motion.div>
    )
}

export function Results() {
    return (
        <section id="results" className="py-24 lg:py-32 bg-bg border-y border-surface-2 relative overflow-hidden">
            {/* Background image layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/images/hero5.jpg"
                    alt="City skyline"
                    fill
                    className="object-cover object-center opacity-10 mix-blend-screen grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                {/* Section header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
                    <div>
                        <h2 className="text-3xl font-medium tracking-tight text-white mb-2">
                            Predictable automation, quantified.
                        </h2>
                        <p className="text-text-dim">
                            Scale your agency operations without adding headcount. Immediate ROI through massive time savings.
                        </p>
                    </div>
                </div>

                {/* Metric Cards with animated counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <MetricCard
                        icon={Target}
                        label="Meetings Booked"
                        targetNum={32}
                        change="+14% vs last month"
                        delay={0}
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Response Rate"
                        targetNum={18}
                        suffix=".4%"
                        change="+5.2% vs industry avg"
                        delay={0.1}
                    />
                    <MetricCard
                        icon={DollarSign}
                        label="Pipeline Created"
                        targetNum={120}
                        prefix="$"
                        suffix="k"
                        change="+$40k this quarter"
                        delay={0.2}
                    />
                </div>

                {/* Animated Comparison Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="rounded-2xl border border-surface-2 bg-bg overflow-hidden"
                >
                    <div className="grid lg:grid-cols-2">

                        {/* Left: SVG Line Chart */}
                        <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-surface-2 relative bg-surface-1/30">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-base font-medium text-white">Pipeline Growth</h3>
                                    <p className="text-xs text-text-muted">6-month cumulative performance</p>
                                </div>
                                <div className="flex items-center gap-4 text-[11px] text-text-muted">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-accent-1" />
                                        <span>Our Automation</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-surface-2" />
                                        <span>Manual Workflows</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-48 relative">
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="border-b border-surface-2/30 border-dashed" />
                                    ))}
                                </div>

                                <svg viewBox="0 0 200 100" className="w-full h-full relative z-10" preserveAspectRatio="none">
                                    {/* Traditional outreach line (flat) */}
                                    <motion.path
                                        d="M0 75 L 40 70 L 80 65 L 120 60 L 160 58 L 200 55"
                                        fill="none"
                                        stroke="var(--color-surface-2)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                    />

                                    {/* Glimpse line (exponential growth) */}
                                    <motion.path
                                        d="M0 80 L 40 65 L 80 45 L 120 28 L 160 15 L 200 5"
                                        fill="none"
                                        stroke="var(--color-accent-1)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                                        style={{ filter: "drop-shadow(0 0 4px rgba(91,127,255,0.4))" }}
                                    />

                                    {/* Gradient fill under Glimpse line */}
                                    <motion.path
                                        d="M0 80 L 40 65 L 80 45 L 120 28 L 160 15 L 200 5 L 200 100 L 0 100 Z"
                                        fill="url(#results-chart-gradient)"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 0.2 }}
                                        transition={{ duration: 1.5, delay: 1 }}
                                    />

                                    {/* Data points on Glimpse line */}
                                    {[
                                        { cx: 0, cy: 80 },
                                        { cx: 40, cy: 65 },
                                        { cx: 80, cy: 45 },
                                        { cx: 120, cy: 28 },
                                        { cx: 160, cy: 15 },
                                        { cx: 200, cy: 5 },
                                    ].map((point, i) => (
                                        <motion.circle
                                            key={i}
                                            cx={point.cx}
                                            cy={point.cy}
                                            r="3"
                                            fill="var(--color-accent-1)"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.2 }}
                                            style={{ filter: "drop-shadow(0 0 3px rgba(91,127,255,0.6))" }}
                                        />
                                    ))}

                                    <defs>
                                        <linearGradient id="results-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--color-accent-1)" stopOpacity="1" />
                                            <stop offset="100%" stopColor="var(--color-accent-1)" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="flex justify-between mt-3 text-[10px] font-mono text-text-muted">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
                                    <span key={month}>{month}</span>
                                ))}
                            </div>
                        </div>

                        {/* Right: Bar Chart Comparison */}
                        <div className="p-8 lg:p-10 bg-[#0A0D11] relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-1/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 h-full flex flex-col">
                                <h3 className="text-base font-medium text-white mb-1">Outreach Efficiency</h3>
                                <p className="text-xs text-text-muted mb-8">Our Automation vs Manual Workflows</p>

                                <div className="flex-1 space-y-6">
                                    {[
                                        { label: "Meetings / 1000 Leads", sf: 32, trad: 4, sfLabel: "32", tradLabel: "4" },
                                        { label: "Response Rate", sf: 92, trad: 18, sfLabel: "18.4%", tradLabel: "2.1%" },
                                        { label: "Cost per Meeting", sf: 75, trad: 30, sfLabel: "$38", tradLabel: "$420", invert: true },
                                    ].map((row, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-text-dim">{row.label}</span>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        className="h-5 rounded bg-accent-1 relative"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${row.sf}%` }}
                                                        transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                                                        style={{ boxShadow: "0 0 10px rgba(91,127,255,0.3)" }}
                                                    />
                                                    <span className="text-xs font-mono text-white whitespace-nowrap">{row.sfLabel}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        className="h-5 rounded bg-surface-2/50"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${row.trad}%` }}
                                                        transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                                                    />
                                                    <span className="text-xs font-mono text-text-muted whitespace-nowrap">{row.tradLabel}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-surface-2/30 flex items-center gap-4 text-[10px] text-text-muted">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-2 w-4 rounded bg-accent-1" />
                                        <span>Our Automation</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-2 w-4 rounded bg-surface-2/50" />
                                        <span>Manual Workflows</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    )
}
