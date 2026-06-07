"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "./button"
import { GlimpseLogo } from "./glimpse-logo"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import ScrollReveal from "./scroll-reveal"
import { ThreeCrystals } from "./three-crystals"

interface FooterProps {
    onBookCall?: () => void
}

export function Footer({ onBookCall }: FooterProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        gsap.fromTo(
            ".footer-letter",
            { yPercent: 100, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                stagger: 0.05,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 1,
                }
            }
        )
    }, { scope: containerRef })

    return (
        <footer className="relative border-t border-brand-500/10 bg-[#030611] overflow-hidden">
            {/* Final CTA Strip */}
            <div id="final-cta" className="relative py-24 lg:py-32 border-b border-brand-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-brand-500/5 mix-blend-screen pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-500/10 blur-[150px] rounded-full pointer-events-none" />

                {/* WebGL 3D Crystals Background Component */}
                {mounted && <ThreeCrystals layout="cta" />}

                <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <ScrollReveal
                        trigger="#final-cta"
                        scrollStart="top bottom-=5%"
                        rotationEnd="bottom center+=25%"
                        wordAnimationEnd="bottom center+=25%"
                        scrub={0.8}
                        baseOpacity={0.08}
                        enableBlur={true}
                        baseRotation={3}
                        blurStrength={8}
                        containerClassName="mb-6"
                        textClassName="text-2xl md:text-4xl font-medium tracking-tight text-white leading-[1.2]"
                        segments={[
                            "Stop wasting time on manual tasks.",
                            { br: true, className: "hidden sm:block" },
                            { text: "Start automating your pipeline.", className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-200" }
                        ]}
                    />
                    <div className="mt-10 flex justify-center">
                        <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]" onClick={onBookCall || (() => window.open('https://calendly.com/nexawork/hive', '_blank'))}>
                            Book your call today
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <GlimpseLogo className="h-8 w-8" />
                            <span className="text-xl font-bold tracking-wider text-white leading-none uppercase">HIVE</span>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            Simple, reliable lead generation automation for your agency.
                        </p>
                    </div>

                    {/* Links — only real sections */}
                    <div className="flex gap-12 sm:gap-16">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Product</h3>
                            <ul role="list" className="mt-4 space-y-3">
                                {[
                                    { label: "How it Works", href: "#how-it-works" },
                                    { label: "Results", href: "#case-studies" },
                                    { label: "FAQ", href: "#faq" },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="text-sm text-text-muted hover:text-white transition-colors">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Connect</h3>
                            <ul role="list" className="mt-4 space-y-3">
                                {[
                                    { 
                                        label: "LinkedIn", 
                                        href: "https://linkedin.com/in/pavanbabar",
                                        icon: (
                                            <svg className="w-4 h-4 shrink-0 text-text-muted group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                        )
                                    },
                                    { 
                                        label: "Email", 
                                        href: "mailto:pavan@nexaworks.tech",
                                        icon: (
                                            <svg className="w-4 h-4 shrink-0 text-text-muted group-hover/link:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    { 
                                        label: "WhatsApp", 
                                        href: "https://wa.me/917304631029?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20lead%20generation%20automation%20services.%20kindly%20reach%20out%20to%20me%20at%20earlisest",
                                        icon: (
                                            <svg className="w-4 h-4 shrink-0 text-text-muted group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                            </svg>
                                        )
                                    },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a 
                                            href={item.href} 
                                            target={item.label !== "Email" ? "_blank" : undefined}
                                            rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                                            className="group/link flex items-center gap-2.5 text-sm text-text-muted hover:text-white transition-colors"
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* Massive branding text */}
            <div ref={containerRef} className="w-full select-none pointer-events-none mt-8 sm:mt-12 overflow-hidden">
                <div 
                    className="text-center font-black text-[24vw] uppercase leading-[0.8] select-none"
                    style={{ transform: 'translateY(10%)' }}
                >
                    <span className="footer-letter inline-block mx-[0.05em] will-change-transform bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent bg-clip-text text-transparent">H</span>
                    <span className="footer-letter inline-block mx-[0.05em] will-change-transform bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent bg-clip-text text-transparent">I</span>
                    <span className="footer-letter inline-block mx-[0.05em] will-change-transform bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent bg-clip-text text-transparent">V</span>
                    <span className="footer-letter inline-block mx-[0.05em] will-change-transform bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent bg-clip-text text-transparent">E</span>
                </div>
            </div>

            {/* Copyright at the absolute bottom of the page */}
            <div className="relative z-20 bg-[#030611] border-t border-brand-500/10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted font-normal">
                    <div>
                        Copyright {new Date().getFullYear()} © HIVE by Nexaworks.
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                    <div>
                        All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}
