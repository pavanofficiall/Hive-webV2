"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { Radio, TrendingUp, UserPlus, Code2, DollarSign, Building2 } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

/* ───────────────────────────────────────────
   Signal blip data — positioned in polar coords
   ─────────────────────────────────────────── */
const SIGNALS = [
    { id: 1, company: "Acme Corp", type: "Funding Round", detail: "$12M Series A", angle: 35, radius: 0.72, color: "#33D17A", icon: DollarSign },
    { id: 2, company: "NovaTech", type: "VP Hired", detail: "VP of Growth", angle: 110, radius: 0.55, color: "#3ED6C4", icon: UserPlus },
    { id: 3, company: "Helix AI", type: "Tech Migration", detail: "→ Snowflake", angle: 195, radius: 0.85, color: "#5B7FFF", icon: Code2 },
    { id: 4, company: "Stratos", type: "Expansion", detail: "New EU Office", angle: 260, radius: 0.4, color: "#7EA6FF", icon: Building2 },
    { id: 5, company: "Vortex SaaS", type: "Revenue Surge", detail: "+48% ARR", angle: 320, radius: 0.65, color: "#33D17A", icon: TrendingUp },
    { id: 6, company: "Quantum B2B", type: "Funding Round", detail: "$28M Series B", angle: 70, radius: 0.38, color: "#33D17A", icon: DollarSign },
    { id: 7, company: "Apex Labs", type: "VP Hired", detail: "CRO Appointment", angle: 155, radius: 0.78, color: "#3ED6C4", icon: UserPlus },
    { id: 8, company: "Pulsar Inc", type: "Tech Migration", detail: "→ Databricks", angle: 290, radius: 0.52, color: "#5B7FFF", icon: Code2 },
]

/* Convert polar → x/y percent offsets from center */
function polarToXY(angleDeg: number, radiusFraction: number) {
    const rad = (angleDeg - 90) * (Math.PI / 180)
    return {
        x: 50 + radiusFraction * 50 * Math.cos(rad),
        y: 50 + radiusFraction * 50 * Math.sin(rad),
    }
}

/* ───────────────────────────────────────────
   Live feed entries that cycle in
   ─────────────────────────────────────────── */
const FEED_ENTRIES = [
    { company: "Acme Corp", signal: "Series A closed ($12M)", time: "Just now", color: "#33D17A" },
    { company: "NovaTech", signal: "VP of Growth hired", time: "2 min ago", color: "#3ED6C4" },
    { company: "Helix AI", signal: "Migrating to Snowflake", time: "5 min ago", color: "#5B7FFF" },
    { company: "Stratos", signal: "EU expansion announced", time: "8 min ago", color: "#7EA6FF" },
    { company: "Vortex SaaS", signal: "ARR surged +48%", time: "12 min ago", color: "#33D17A" },
    { company: "Quantum B2B", signal: "Series B closed ($28M)", time: "15 min ago", color: "#33D17A" },
    { company: "Apex Labs", signal: "CRO appointed", time: "18 min ago", color: "#3ED6C4" },
    { company: "Pulsar Inc", signal: "Migrating to Databricks", time: "22 min ago", color: "#5B7FFF" },
]

export function SignalRadar() {
    const t = useTranslations("SignalRadar")
    const [visibleBlips, setVisibleBlips] = useState<number[]>([])
    const [feedItems, setFeedItems] = useState(FEED_ENTRIES.slice(0, 4))
    const [, setFeedCounter] = useState(4)

    /* Progressively reveal blips */
    useEffect(() => {
        const timers = SIGNALS.map((signal, idx) =>
            setTimeout(() => {
                setVisibleBlips((prev) => [...prev, signal.id])
            }, 800 + idx * 600)
        )
        return () => timers.forEach(clearTimeout)
    }, [])

    /* Cycle feed entries */
    const [feedId, setFeedId] = useState(100)
    const cycleFeed = useCallback(() => {
        setFeedCounter((prev) => {
            const next = (prev + 1) % FEED_ENTRIES.length
            setFeedItems((items) => {
                const newItem = { ...FEED_ENTRIES[next] }
                return [newItem, ...items.slice(0, 3)]
            })
            return next
        })
        setFeedId((prev) => prev + 1)
    }, [])

    useEffect(() => {
        const interval = setInterval(cycleFeed, 3500)
        return () => clearInterval(interval)
    }, [cycleFeed])

    return (
        <section className="py-12 lg:py-16 min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-bg relative overflow-hidden">
            {/* Background image layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/images/hero3.jpg"
                    alt="City skyline"
                    fill
                    className="object-cover object-center opacity-10 mix-blend-screen grayscale"
                />
            </div>

            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none z-0"
                style={{ background: "radial-gradient(circle, rgba(91,127,255,0.08) 0%, transparent 70%)" }} />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 rounded-full border border-accent-1/30 bg-accent-1/10 px-3 py-1 text-xs font-semibold text-accent-1 mb-6"
                    >
                        <Radio className="h-3.5 w-3.5" />
                        {t('tag')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl font-semibold tracking-tight text-white md:text-5xl mb-4"
                    >
                        {t('headline')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-text-dim"
                    >
                        {t('subhead')}
                    </motion.p>
                </div>

                {/* Radar + Feed layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid lg:grid-cols-[1fr_340px] gap-8 items-center"
                >
                    {/* ─── RADAR CIRCLE ─── */}
                    <div className="relative w-full max-w-[400px] mx-auto aspect-square">

                        {/* Outer ring glow */}
                        <div className="absolute inset-4 rounded-full"
                            style={{
                                background: "radial-gradient(circle, transparent 48%, rgba(91,127,255,0.06) 50%, transparent 52%)",
                            }} />

                        {/* SVG concentric rings + crosshairs */}
                        <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100">
                            {/* Concentric rings */}
                            {[20, 35, 50].map((r, i) => (
                                <circle
                                    key={r}
                                    cx="50" cy="50" r={r}
                                    fill="none"
                                    stroke="rgba(91,127,255,0.12)"
                                    strokeWidth="0.25"
                                    strokeDasharray={i === 2 ? "none" : "1.5 1.5"}
                                />
                            ))}
                            {/* Outer ring — solid, brighter */}
                            <circle cx="50" cy="50" r="50" fill="none" stroke="rgba(91,127,255,0.2)" strokeWidth="0.4" />

                            {/* Crosshair lines */}
                            <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(91,127,255,0.08)" strokeWidth="0.25" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(91,127,255,0.08)" strokeWidth="0.25" />
                            {/* Diagonal crosshairs */}
                            <line x1="14.6" y1="14.6" x2="85.4" y2="85.4" stroke="rgba(91,127,255,0.05)" strokeWidth="0.25" />
                            <line x1="85.4" y1="14.6" x2="14.6" y2="85.4" stroke="rgba(91,127,255,0.05)" strokeWidth="0.25" />

                            {/* Center dot */}
                            <circle cx="50" cy="50" r="1.2" fill="rgba(91,127,255,0.5)" />
                            <circle cx="50" cy="50" r="0.5" fill="#5B7FFF" />
                        </svg>

                        {/* Rotating sweep arm — conic gradient */}
                        <div className="absolute inset-4 rounded-full overflow-hidden radar-sweep">
                            <div className="absolute inset-0"
                                style={{
                                    background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 330deg, rgba(91,127,255,0.15) 350deg, rgba(91,127,255,0.35) 358deg, rgba(91,127,255,0.6) 360deg)",
                                }} />
                        </div>

                        {/* Sweep line (bright edge) */}
                        <div className="absolute inset-4 rounded-full overflow-hidden radar-sweep">
                            <div className="absolute top-0 left-1/2 w-px h-1/2 origin-bottom"
                                style={{
                                    background: "linear-gradient(to top, rgba(91,127,255,0.8) 0%, rgba(91,127,255,0) 100%)",
                                    boxShadow: "0 0 8px rgba(91,127,255,0.6)",
                                }} />
                        </div>

                        {/* Signal Blips */}
                        {SIGNALS.map((signal) => {
                            const { x, y } = polarToXY(signal.angle, signal.radius)
                            const isVisible = visibleBlips.includes(signal.id)

                            return (
                                <AnimatePresence key={signal.id}>
                                    {isVisible && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="absolute group z-20"
                                            style={{
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            {/* Outer pulse ring */}
                                            <div
                                                className="absolute inset-0 rounded-full blip-pulse"
                                                style={{
                                                    width: 24, height: 24,
                                                    marginLeft: -8, marginTop: -8,
                                                    border: `1px solid ${signal.color}`,
                                                    opacity: 0.3,
                                                }}
                                            />
                                            {/* Core dot */}
                                            <div
                                                className="w-2 h-2 rounded-full blip-glow relative"
                                                style={{
                                                    backgroundColor: signal.color,
                                                    boxShadow: `0 0 8px ${signal.color}, 0 0 16px ${signal.color}40`,
                                                }}
                                            />
                                            {/* Hover tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                                                <div className="rounded-lg bg-[#0A0D11] border border-surface-2 px-3 py-2 whitespace-nowrap shadow-xl">
                                                    <div className="text-[11px] font-semibold text-white">{signal.company}</div>
                                                    <div className="text-[10px] text-text-muted">{signal.type} — {signal.detail}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )
                        })}

                        {/* Radar label — bottom */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-muted tracking-widest uppercase">
                            {SIGNALS.length} {t('activeSignals')}
                        </div>
                    </div>

                    {/* ─── LIVE SIGNAL FEED ─── */}
                    <div className="rounded-2xl border border-surface-2 bg-surface-1/30 backdrop-blur-sm p-6 lg:p-7 h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-1 border border-surface-2">
                                <Radio className="h-4 w-4 text-accent-1" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-white">{t('liveFeed')}</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                                    </span>
                                    <span className="text-[10px] text-text-muted">{t('monitoring')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {feedItems.map((item, idx) => (
                                    <motion.div
                                        key={`${feedId}-${idx}`}
                                        layout
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-[#0A0D11] border border-surface-2/30"
                                    >
                                        <div
                                            className="h-1.5 w-1.5 rounded-full shrink-0"
                                            style={{
                                                backgroundColor: item.color,
                                                boxShadow: `0 0 6px ${item.color}60`,
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[12px] font-medium text-white/90 truncate">{item.company}</div>
                                            <div className="text-[10px] text-text-muted truncate">{item.signal}</div>
                                        </div>
                                        <span className="text-[9px] text-text-muted font-mono whitespace-nowrap shrink-0">{item.time}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary stats */}
                        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-surface-2/50">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-white">94</div>
                                <div className="text-[9px] text-text-muted">{t('avgScore')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-white">2.4s</div>
                                <div className="text-[9px] text-text-muted">{t('response')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-white">12.8%</div>
                                <div className="text-[9px] text-text-muted">{t('bookRate')}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
