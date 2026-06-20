"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function PilotOffer() {
    const t = useTranslations("PilotOffer")
    return (
        <section id="pricing" className="py-24 lg:py-32 relative bg-bg overflow-hidden">
            {/* Background image layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/images/hero6.jpg"
                    alt="City skyline"
                    fill
                    className="object-cover object-center opacity-20 mix-blend-screen grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080A] via-transparent to-[#05080A] pointer-events-none" />
            </div>

            {/* Background spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-1/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl mb-6">
                        {t('headline')}
                    </h2>
                    <p className="text-lg text-text-dim">
                        {t('subhead')}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-2xl"
                >
                    <div className="relative rounded-2xl border border-accent-1/30 bg-[rgba(255,255,255,0.02)] backdrop-blur-[10px] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,127,255,0.15)] group transition-all duration-500 hover:border-accent-1/50 hover:shadow-[0_20px_80px_rgba(91,127,255,0.25)]">

                        {/* Glowing border effect built with gradients */}
                        <div className="absolute inset-x-0 -top-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-accent-1 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-3/4 transition-all duration-700" />
                        <div className="absolute inset-x-0 -bottom-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-accent-2 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-3/4 transition-all duration-700" />

                        <div className="flex flex-col md:flex-row items-start justify-between gap-8 border-b border-surface-2/50 pb-8 mb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-accent-1/30 bg-accent-1/10 px-3 py-1 text-xs font-semibold text-accent-1 mb-6">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    {t('badge')}
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{t('meetings')}</h3>
                                <p className="text-xl text-text-dim">{t('meetingsSub')}</p>
                            </div>

                            <div className="text-left md:text-right">
                                <p className="text-sm font-medium text-text-dim uppercase tracking-wider mb-2">{t('guaranteeLabel')}</p>
                                <p className="text-2xl font-bold text-white">{t('guaranteeText1')} <br className="hidden md:block" /> {t('guaranteeText2')}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <ul className="space-y-4">
                                {[
                                    t('features.0'),
                                    t('features.1'),
                                    t('features.2'),
                                    t('features.3'),
                                    t('features.4')
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-1/20 text-accent-1">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-text-main text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Scarcity indicator — clean, text-based */}
                            <div className="bg-surface-2/30 rounded-xl p-6 border border-surface-2 flex flex-col justify-center">
                                <div className="mb-5">
                                    <span className="text-sm text-text-muted font-medium uppercase tracking-wide">{t('cohortLabel')}</span>
                                    <div className="text-3xl font-bold text-white mt-1">{t('cohortSize')}</div>
                                    <p className="text-sm text-text-dim mt-1">{t('cohortSub')}</p>
                                </div>

                                <div className="border-t border-surface-2/50 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-white font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                                        </span>
                                        {t('spotsRemaining')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="w-full text-lg font-bold h-16">
                            {t('cta')}
                        </Button>
                        <p className="text-center text-xs text-text-dim mt-4">
                            {t('disclaimer')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
