"use client"

import { motion } from "framer-motion"
import { Activity, ShieldAlert, Zap, SearchCode } from "lucide-react"
import Image from "next/image"

export function ProductIntelligence() {
    return (
        <section id="intelligence" className="py-24 lg:py-32 bg-surface-1 border-t border-surface-2 relative overflow-hidden">
            {/* Background image layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/images/hero4.jpg"
                    alt="City skyline"
                    fill
                    className="object-cover object-center opacity-[0.07] mix-blend-screen grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-surface-1 pointer-events-none" />
            </div>

            {/* Decorative vertical grid lines */}
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-[0.03] pointer-events-none z-0" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                </div>
            </div>
        </section>
    )
}