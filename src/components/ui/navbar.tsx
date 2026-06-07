"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "./button"
import { GlimpseLogo } from "./glimpse-logo"
import { ArrowRight } from "lucide-react"

interface NavbarProps {
    onBookCall?: () => void
}

export function Navbar({ onBookCall }: NavbarProps) {
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled ? "bg-[#030611]/80 backdrop-blur-md border-brand-500/10" : ""
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GlimpseLogo className="h-8 w-8" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-wider text-white leading-none uppercase">HIVE</span>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#case-studies" className="hover:text-white transition-colors">Results</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            className="group h-10 px-5 text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]"
                            onClick={onBookCall || (() => window.open('https://calendly.com/nexawork/hive', '_blank'))}
                        >
                            Book a Call
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}
