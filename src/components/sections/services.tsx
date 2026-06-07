"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ServiceRowProps {
    rowIdx: number
    tag: string
    title: string
    desc: string
    bullets: string[]
    mockupType: "signals" | "crm" | "accounts"
    isEven: boolean
}

function ServiceRow({ rowIdx, tag, title, desc, bullets, mockupType, isEven }: ServiceRowProps) {
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
                    className="relative rounded-3xl bg-gradient-to-tr from-[#FAF8F5] via-[#F6F4FB] to-[#F1EEF8] p-6 sm:p-10 shadow-sm border border-white/20 aspect-square w-full max-w-[480px] mx-auto flex items-center justify-center overflow-hidden"
                >
                    {/* Inner White Box wrapper enclosing items */}
                    <div className="w-full bg-white rounded-2xl border border-[#F3F0EC] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                        {/* Mockup Type Rendering */}
                        {mockupType === "signals" && <SignalsMockup />}
                        {mockupType === "crm" && <CrmMockup />}
                        {mockupType === "accounts" && <AccountsMockup />}
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
                <div className="flex items-center gap-3.5">
                    {/* Dollar circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F0] text-[#00A854] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-900">Series B: $28M raised</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Acme</p>
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
                <div className="flex items-center gap-3.5">
                    {/* Person circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7E22CE] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-900">New VP Sales hired</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">TechFlow</p>
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
                <div className="flex items-center gap-3.5">
                    {/* Globe/Link circle */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1D4ED8] shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-900">Visited / pricing 3x</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">sarah@icloud.io via website</p>
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

/* ────────── CRM BADGE CARD MOCKUP ────────── */
function CrmMockup() {
    return (
        <div className="flex items-center gap-4">
            {/* SaaStr Event Badge */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            </div>
            <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">SaaStr 2026 attendee</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">james@acmecorp.com</p>
            </div>
            {/* Purple Presence Dot */}
            <div className="h-2.5 w-2.5 rounded-full bg-[#6366F1] shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
        </div>
    )
}

/* ────────── TEAM METRICS LIST MOCKUP ────────── */
function AccountsMockup() {
    const managers = [
        {
            name: "Henry Garcia",
            role: "AE • owns 42 accounts",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
        },
        {
            name: "Taylor Stone",
            role: "AM • owns 28 accounts",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
        },
        {
            name: "Kelly Smith",
            role: "CSM • owns 34 accounts",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
        }
    ]

    return (
        <div className="w-full divide-y divide-[#F3F0EC]">
            {managers.map((mgr, idx) => (
                <div 
                    key={mgr.name}
                    className={`flex items-center justify-between ${idx === 0 ? "pb-3" : idx === 1 ? "py-3" : "pt-3"}`}
                >
                    <div className="flex items-center gap-3.5">
                        {/* Image Avatar */}
                        <div className="relative h-9 w-9 rounded-full overflow-hidden border border-[#EBE8E2] shrink-0">
                            <Image 
                                src={mgr.avatar} 
                                alt={mgr.name}
                                fill
                                sizes="36px"
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-900">{mgr.name}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{mgr.role}</p>
                        </div>
                    </div>
                    {/* Orange Mail/Envelope Alert */}
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    )
}

const SERVICES_DATA = [
    {
        tag: "Services",
        title: "Intent-driven cold outbound",
        desc: "Ava sources leads, monitors real-time signals like funding rounds and hires, and runs personalized multi-channel campaigns. She actively tests and optimizes copy.",
        bullets: [
            "Signal-triggered campaigns on autopilot",
            "Multi-channel: email, social, phone",
            "Continuous A/B testing"
        ],
        mockupType: "signals" as const
    },
    {
        tag: "Services",
        title: "Put your CRM to work",
        desc: "MQLs, conference leads, closed-lost deals, churned accounts. Ava re-engages them all with fresh, personalized outreach using context from your CRM and enriched data.",
        bullets: [
            "Works your MQLs and event leads",
            "Reactivates closed-lost and churned accounts",
            "Context-aware messaging from CRM data"
        ],
        mockupType: "crm" as const
    },
    {
        tag: "Services",
        title: "Grow the accounts you already have",
        desc: "Ava uses CRM and product usage data to get your AMs meetings with existing customers.",
        bullets: [
            "Account-aware personalization",
            "Runs upsell, expand, and add-on campaigns",
            "Sends on behalf of each account owner"
        ],
        mockupType: "accounts" as const
    }
]

export function Services() {
    return (
        <section id="services" className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-[#030611] border-t border-surface-2">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
                    <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-4">Services</p>
                    <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
                        What we build for you.
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
