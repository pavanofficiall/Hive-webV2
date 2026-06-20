"use client"

import React from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface ServiceRowProps {
    rowIdx: number
    tag: string
    title: string
    desc: string
    bullets: string[]
    mockupType: "signals" | "linkedin" | "whatsapp"
    isEven: boolean
}

function ServiceRow({ rowIdx, title, desc, bullets, mockupType, isEven }: ServiceRowProps) {
    const textOrderClass = isEven ? "lg:order-last" : "lg:order-first"
    const mockupOrderClass = isEven ? "lg:order-first" : "lg:order-last"

    // Helper to determine if a bullet point is active based on the reference screenshots
    // Row 1: bullet 0 is active. Row 2: bullet 0 is active. Row 3: bullet 2 is active.
    const isBulletActive = (bulletIdx: number) => {
        if (rowIdx === 0 && bulletIdx === 0) return true
        if (rowIdx === 1 && bulletIdx === 0) return true
        if (rowIdx === 2 && bulletIdx === 2) return true
        return false
    }

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center py-12 lg:py-16 ${rowIdx === 0 ? "pt-2 lg:pt-4" : ""} border-b border-surface-2/40 last:border-b-0`}>
            {/* Details Column */}
            <div className={`col-span-1 lg:col-span-5 ${textOrderClass}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm sm:text-base text-text-dim mt-4 leading-relaxed font-normal">
                        {desc}
                    </p>

                    {/* Timeline Bullets */}
                    <ul className="mt-8 space-y-4 font-sans text-xs sm:text-sm">
                        {bullets.map((bullet, idx) => {
                            const isActive = isBulletActive(idx)
                            return (
                                <li 
                                    key={idx} 
                                    className={`flex items-start gap-4 pl-4 border-l-2 transition-colors duration-300 relative ${
                                        isActive 
                                            ? "border-indigo-500 text-white font-medium" 
                                            : "border-surface-subtle/60 text-text-muted"
                                    }`}
                                >
                                    {isActive && (
                                        <span className="absolute -left-[5px] top-[6px] h-2 w-2 rounded-sm bg-indigo-500" />
                                    )}
                                    <span className="relative top-0">{bullet}</span>
                                </li>
                            )
                        })}
                    </ul>
                </motion.div>
            </div>

            {/* Mockup Column */}
            <div className={`col-span-1 lg:col-span-7 ${mockupOrderClass}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    className="relative rounded-3xl bg-gradient-to-tr from-[#FAF8F5] via-[#F6F4FB] to-[#F1EEF8] p-4 sm:p-10 shadow-sm border border-white/20 aspect-auto md:aspect-square w-full max-w-[480px] mx-auto flex items-center justify-center overflow-hidden"
                >
                    {/* Inner White Box wrapper enclosing items */}
                    <div className="w-full bg-white rounded-2xl border border-[#F3F0EC] p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                        {/* Mockup Type Rendering */}
                        {mockupType === "signals" && <SignalsMockup />}
                        {mockupType === "linkedin" && <LinkedInMockup />}
                        {mockupType === "whatsapp" && <WhatsAppMockup />}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

/* ────────── SIGNAL FEED MOCKUP ────────── */
function SignalsMockup() {
    return (
        <div className="w-full divide-y divide-[#F3F0EC]">
            {/* Signal Item 1: Series B */}
            <div className="pb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0">
                    {/* Dollar circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F0] text-[#00A854] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">Series B: $28M raised</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">Acme</p>
                    </div>
                </div>
                {/* Lightning Badge */}
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>

            {/* Signal Item 2: VP Hired */}
            <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0">
                    {/* Person circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7E22CE] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">New VP Sales hired</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">TechFlow</p>
                    </div>
                </div>
                {/* Lightning Badge */}
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>

            {/* Signal Item 3: Pricing Visited */}
            <div className="pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0">
                    {/* Globe/Link circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1D4ED8] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">Visited / pricing 3x</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">sarah@icloud.io via website</p>
                    </div>
                </div>
                {/* Lightning Badge */}
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

/* ────────── LINKEDIN CAMPAIGN MOCKUP ────────── */
function LinkedInMockup() {
    return (
        <div className="w-full divide-y divide-[#F3F0EC]">
            {/* LinkedIn Item 1 */}
            <div className="pb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0">
                    {/* LinkedIn branded circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF5FC] text-[#0A66C2] shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">Connection accepted</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">Alex Carter • Founder & CEO at TechScale</p>
                    </div>
                </div>
                {/* Status Badge */}
                <span className="text-[9px] font-mono text-[#00A854] bg-[#E8F8F0] border border-[#B7EB8F]/40 px-2 py-0.5 rounded-full font-medium shrink-0">
                    Connected
                </span>
            </div>

            {/* LinkedIn Item 2 */}
            <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF5FC] text-[#0A66C2] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">Intro message sent</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">&quot;Thanks for connecting, Alex...&quot;</p>
                    </div>
                </div>
                <span className="text-[9px] font-mono text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                    Step 1 Sent
                </span>
            </div>

            {/* LinkedIn Item 3 */}
            <div className="pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7E22CE] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">Meeting booked via social link</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">Demo Scheduled: Thursday 3 PM</p>
                    </div>
                </div>
                <span className="text-[9px] font-mono text-[#7E22CE] bg-[#F3E8FF] border border-[#D8B4FE]/40 px-2 py-0.5 rounded-full font-medium shrink-0">
                    Converted
                </span>
            </div>
        </div>
    )
}

/* ────────── WHATSAPP CONVERSATION MOCKUP ────────── */
function WhatsAppMockup() {
    return (
        <div className="w-full flex flex-col gap-3">
            {/* WhatsApp Contact Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F0EC]">
                <div className="flex items-center gap-3.5">
                    {/* WhatsApp Green Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7ED] text-[#25D366] shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489 0 9.953-4.467 9.957-9.96.002-2.661-1.034-5.163-2.919-7.051C16.427 1.705 13.923.666 11.26.666 5.77 .666 1.306 5.13 1.302 10.62c-.001 1.77.464 3.5 1.347 5.03l-.883 3.228 3.3-.865c1.472.802 3.03 1.226 4.62 1.226h.001z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-900">WhatsApp Automation</p>
                        <p className="text-[9px] text-[#25D366] font-medium flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
                            Active Campaign: Lead Nurturing
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Bubble 1 */}
            <div className="flex flex-col gap-1 items-start max-w-[85%] self-start">
                <span className="text-[8px] text-gray-400 font-mono ml-2">Lead Trigger: Visited Pricing</span>
                <div className="bg-gray-100 text-gray-800 text-[10px] p-2.5 rounded-2xl rounded-tl-none border border-gray-200/50 shadow-sm leading-normal">
                    Hey Sarah! Noticed you were checking out our pricing page. Had any quick questions about scale limits?
                </div>
                <span className="text-[8px] text-gray-400 ml-2">Sent via Hive</span>
            </div>

            {/* Chat Bubble 2 */}
            <div className="flex flex-col gap-1 items-end max-w-[85%] self-end">
                <div className="bg-[#E2F7CB] text-gray-800 text-[10px] p-2.5 rounded-2xl rounded-tr-none border border-[#D0ECC2] shadow-sm leading-normal">
                    Hey! Yes actually, does the Enterprise tier include custom integrations?
                </div>
                <span className="text-[8px] text-gray-400 mr-2">Replied • Just now</span>
            </div>

            {/* Chat Bubble 3 */}
            <div className="flex flex-col gap-1 items-start max-w-[85%] self-start">
                <div className="bg-gray-100 text-gray-800 text-[10px] p-2.5 rounded-2xl rounded-tl-none border border-gray-200/50 shadow-sm leading-normal font-medium text-indigo-600 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Auto-drafting response...
                </div>
            </div>
        </div>
    )
}

export function Services() {
    const t = useTranslations("Services")

    const SERVICES_DATA = [
        {
            tag: t('sectionLabel'),
            title: t('services.0.title'),
            desc: t('services.0.desc'),
            bullets: [
                t('services.0.bullets.0'),
                t('services.0.bullets.1'),
                t('services.0.bullets.2')
            ],
            mockupType: "signals" as const
        },
        {
            tag: t('sectionLabel'),
            title: t('services.1.title'),
            desc: t('services.1.desc'),
            bullets: [
                t('services.1.bullets.0'),
                t('services.1.bullets.1'),
                t('services.1.bullets.2')
            ],
            mockupType: "linkedin" as const
        },
        {
            tag: t('sectionLabel'),
            title: t('services.2.title'),
            desc: t('services.2.desc'),
            bullets: [
                t('services.2.bullets.0'),
                t('services.2.bullets.1'),
                t('services.2.bullets.2')
            ],
            mockupType: "whatsapp" as const
        }
    ]
    return (
        <section id="services" className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-[#030611] border-t border-surface-2">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
                    <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-4">{t('sectionLabel')}</p>
                    <h2 className="text-2xl font-medium tracking-tight text-white md:text-4xl">
                        {t('headline')}
                    </h2>
                </div>

                {/* Rows Grid */}
                <div className="flex flex-col">
                    {SERVICES_DATA.map((srv, idx) => (
                        <ServiceRow
                            key={srv.title}
                            rowIdx={idx}
                            tag={srv.tag}
                            title={srv.title}
                            desc={srv.desc}
                            bullets={srv.bullets}
                            mockupType={srv.mockupType}
                            isEven={idx % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
