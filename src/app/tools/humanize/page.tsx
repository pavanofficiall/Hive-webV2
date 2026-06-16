"use client"

import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { WaitlistForm } from "@/components/tools/waitlist-form"
import { motion } from "framer-motion"
import { Zap, ShieldCheck, Sparkles, MessageSquare, LayoutDashboard } from "lucide-react"

export default function HumanizePage() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    return (
        <div className="min-h-screen bg-[#030611] text-white selection:bg-brand-500/30 font-sans">
            <Navbar />

            <main className="pt-32 pb-20 overflow-hidden">
                {/* Hero Section */}
                <section className="relative px-6 lg:px-8 py-20 md:py-24 max-w-7xl mx-auto text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
                    
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="relative z-10 max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-300 text-sm font-medium mb-8">
                            <Sparkles className="w-4 h-4" />
                            <span>Introducing B2B Email Humanizer</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.2]">
                            Stop Sounding Like an AI. <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-200">Get Replies Like an Executive.</span>
                        </h1>
                        <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                            Convert robotic LLM drafts into high-converting, "bursty," and perfectly unpolished B2B outbound emails in seconds.
                        </p>
                        
                        <div id="waitlist-form-top">
                            <WaitlistForm />
                        </div>
                    </motion.div>
                </section>

                {/* How It Works Section */}
                <section className="relative px-6 lg:px-8 py-24 max-w-7xl mx-auto border-t border-brand-500/10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">Engineered to bypass pattern-recognition and land in the primary inbox.</p>
                    </div>

                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-3xl mx-auto relative"
                    >
                        {/* Vertical Line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-brand-500/20" />

                        {/* Step 1 */}
                        <motion.div variants={fadeIn} className="relative flex gap-6 md:gap-8 mb-12">
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-[#0a0f1c] border border-brand-500/30 rounded-2xl flex items-center justify-center text-brand-400 z-10 relative shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="pt-1 md:pt-3">
                                <h3 className="text-xl md:text-2xl font-semibold mb-2">1. Ingest the AI Draft</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    We receive your raw input—the standard AI-generated message that sounds like it was written by a machine.
                                </p>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div variants={fadeIn} className="relative flex gap-6 md:gap-8 mb-12">
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-[#0a0f1c] border border-brand-500/30 rounded-2xl flex items-center justify-center text-brand-400 z-10 relative shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="pt-1 md:pt-3">
                                <h3 className="text-xl md:text-2xl font-semibold mb-2">2. Perform Humanization</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Our proprietary humanization LLM goes to work. It scrubs out predictable AI markers and restructures the pacing to make it sound authentically human.
                                </p>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div variants={fadeIn} className="relative flex gap-6 md:gap-8 mb-12">
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-[#0a0f1c] border border-brand-500/30 rounded-2xl flex items-center justify-center text-brand-400 z-10 relative shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <Zap className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="pt-1 md:pt-3">
                                <h3 className="text-xl md:text-2xl font-semibold mb-2">3. Push to your CRM via API</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    The perfectly unpolished, high-converting email is pushed straight back to your CRM, sequencing tool, or wherever you need it.
                                </p>
                            </div>
                        </motion.div>

                        {/* Step 4: UI Dashboard */}
                        <motion.div variants={fadeIn} className="relative flex gap-6 md:gap-8">
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-brand-500/10 border border-brand-500/50 rounded-2xl flex items-center justify-center text-brand-400 z-10 relative shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                <LayoutDashboard className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="pt-1 md:pt-3">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                                    Bonus
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2">UI Dashboard Included</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Not ready for an API integration? You'll also get access to a sleek web dashboard for quick, manual conversions whenever you need them.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Waitlist Benefits */}
                <section className="relative px-6 lg:px-8 py-24 max-w-4xl mx-auto text-center">
                    <div className="absolute inset-0 bg-brand-500/5 rounded-3xl" />
                    <div className="relative z-10 py-16 px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why join the waitlist now?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-8 text-left max-w-2xl mx-auto mb-12">
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-brand-300 mb-2">Instant Reward</h4>
                                <p className="text-text-secondary">Get 500 free API credits the moment we launch our public beta.</p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-brand-300 mb-2">Refer & Earn Engine</h4>
                                <p className="text-text-secondary">Invite your team. For every verified B2B user who joins via your link, you both earn an extra 1,000 API credits.</p>
                            </div>
                        </div>
                        
                        <div id="waitlist-form-bottom">
                            <WaitlistForm />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
