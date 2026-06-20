"use client"

import { motion } from "framer-motion"
import { Play, Pause, FastForward, SkipBack, BarChart3 } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function MicroAudit() {
    const t = useTranslations("MicroAudit")
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState(63) // start at 63% (46s / 72s)

    // Simulate video playback progress
    useEffect(() => {
        if (!isPlaying) return
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0
                return prev + 0.2
            })
        }, 100)
        return () => clearInterval(interval)
    }, [isPlaying])

    // Format progress to mm:ss
    const totalSeconds = 72
    const currentSeconds = Math.floor((progress / 100) * totalSeconds)
    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60)
        const s = secs % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-bg">
            {/* Background image layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/images/hero1.jpg"
                    alt="City skyline"
                    fill
                    className="object-cover object-center opacity-10 mix-blend-screen grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F13]/90 via-[#0C1420]/80 to-[#0B0F13] pointer-events-none" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400 mb-6 drop-shadow-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                        </span>
                        {t('tag')}
                    </div>
                    <h2 className="text-3xl font-medium tracking-tight text-white md:text-5xl mb-6">
                        {t('headline')}
                    </h2>
                    <p className="text-lg text-text-secondary">
                        {t('subhead')}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-4xl relative"
                >
                    {/* Ambient glow behind playing video */}
                    <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />

                    {/* Video Player Interface representing a Loom video */}
                    <div className="rounded-2xl border border-surface-subtle bg-[#0A0D11] shadow-2xl overflow-hidden aspect-video relative group flex flex-col hover:border-brand-500/50 transition-colors duration-500">

                        {/* Context Bar */}
                        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/50 shadow-[0_0_10px_var(--color-brand-glow)]">
                                    <span className="text-xs text-white">SF</span>
                                </div>
                                <div className="text-sm font-medium text-white shadow-sm">{t('auditTitle')}</div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-mono font-medium text-white border border-white/10">
                                {formatTime(currentSeconds)} / {formatTime(totalSeconds)}
                            </div>
                        </div>

                        {/* Video Content Canvas Base */}
                        <div className="flex-1 relative bg-[#0C1420] w-full flex items-center justify-center overflow-hidden">
                            {/* Decorative background grid representing technical analysis */}
                            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-[0.05]" />

                            {/* Mock Data Vis inside video */}
                            <div className="relative z-10 w-[60%] space-y-6 opacity-80 backdrop-blur-sm bg-bg/80 p-6 rounded-xl border border-surface-subtle/80 shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="text-brand-400 font-medium text-sm drop-shadow-md">{t('competitorGapAnalysis')}</div>
                                        <div className="text-white text-xl font-semibold opacity-90 drop-shadow-md">{t('globexVsInitech')}</div>
                                    </div>
                                    <BarChart3 className="text-brand-400 h-6 w-6" />
                                </div>

                                {/* Animated graph bars */}
                                <div className="space-y-4 pt-2">
                                    <div className="relative h-4 w-full bg-surface-elevated/50 rounded-full overflow-hidden border border-surface-subtle/30">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "45%" }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="absolute inset-y-0 left-0 bg-brand-500 rounded-full"
                                        />
                                    </div>
                                    <div className="relative h-4 w-full bg-surface-elevated/50 rounded-full overflow-hidden border border-surface-subtle/30">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "85%" }}
                                            transition={{ duration: 1, delay: 0.7 }}
                                            className="absolute inset-y-0 left-0 bg-surface-subtle border border-surface-subtle rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded border-l-2 border-l-brand-400 backdrop-blur-md">
                                    <p className="text-xs text-brand-100">{t('transcript')}</p>
                                </div>
                            </div>

                            {/* PIP face cam */}
                            <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full border-2 border-brand-500/50 bg-[#1A2333] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
                                <div className="relative h-full w-full bg-surface-elevated flex items-center justify-center overflow-hidden">
                                    {/* Speaking visual indicator */}
                                    {isPlaying && (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute inset-0 bg-brand-500/20"
                                        />
                                    )}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted relative z-10">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Play controls and progress scrubber */}
                        <div className="h-16 border-t border-surface-subtle bg-bg/90 backdrop-blur-xl flex flex-col z-20">
                            {/* Progress bar */}
                            <div className="w-full h-1 bg-surface-subtle relative group cursor-pointer">
                                <div
                                    className="absolute top-0 left-0 bottom-0 bg-brand-500 shadow-[0_0_8px_var(--color-brand-glow)]"
                                    style={{ width: `${progress}%` }}
                                />
                                {/* Animated scanning line */}
                                <motion.div
                                    className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_6px_white]"
                                    style={{ left: `${progress}%` }}
                                    animate={isPlaying ? { opacity: [1, 0.4, 1] } : { opacity: 0.6 }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                                {/* Progress scrubber handle */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"
                                    style={{ left: `calc(${progress}% - 6px)` }}
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex-1 flex items-center justify-between px-5">
                                {/* Left: Waveform visualizer */}
                                <div className="flex items-center gap-[2px] h-6">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={isPlaying ? {
                                                height: [4, 8 + Math.sin(i * 0.8) * 12, 4],
                                            } : { height: 3 }}
                                            transition={{
                                                duration: 0.4 + (i % 3) * 0.15,
                                                repeat: Infinity,
                                                delay: i * 0.05,
                                                ease: "easeInOut",
                                            }}
                                            className="w-[2px] rounded-full bg-brand-500/60"
                                        />
                                    ))}
                                </div>

                                {/* Center: Play controls */}
                                <div className="flex items-center gap-6">
                                    <SkipBack className="h-4 w-4 text-text-muted hover:text-white cursor-pointer transition-colors" />
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="relative h-10 w-10 bg-surface-elevated hover:bg-surface-subtle border border-surface-subtle/50 text-white rounded-full flex items-center justify-center cursor-pointer transition-all shadow-sm group/play hover:shadow-[0_0_20px_var(--color-brand-glow)] hover:border-brand-500/50"
                                    >
                                        {/* Hover glow ring */}
                                        <span className="absolute inset-0 rounded-full bg-brand-500/0 group-hover/play:bg-brand-500/10 transition-colors duration-300" />
                                        {isPlaying ? <Pause className="h-4 w-4 fill-current relative z-10" /> : <Play className="h-4 w-4 fill-current translate-x-0.5 relative z-10" />}
                                    </button>
                                    <FastForward className="h-4 w-4 text-text-muted hover:text-white cursor-pointer transition-colors" />
                                </div>

                                {/* Right: Waveform visualizer (mirror) */}
                                <div className="flex items-center gap-[2px] h-6">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={isPlaying ? {
                                                height: [4, 8 + Math.cos(i * 0.6) * 12, 4],
                                            } : { height: 3 }}
                                            transition={{
                                                duration: 0.5 + (i % 4) * 0.1,
                                                repeat: Infinity,
                                                delay: i * 0.04,
                                                ease: "easeInOut",
                                            }}
                                            className="w-[2px] rounded-full bg-brand-500/40"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}
