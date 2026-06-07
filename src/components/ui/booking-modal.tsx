"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Calendar, Sparkles } from "lucide-react"
import { Button } from "./button"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    // Prevent scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                        className="relative w-full max-w-2xl bg-[#050818] border border-brand-500/10 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col md:flex-row z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors duration-200 z-20 p-1.5 bg-[#030611]/60 border border-brand-500/10 rounded-full"
                            aria-label="Close modal"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Left Side: Image illustration fully fitted */}
                        <div className="w-full md:w-[42%] bg-[#080d25]/60 border-b md:border-b-0 md:border-r border-brand-500/10 relative overflow-hidden shrink-0 min-h-[220px] md:min-h-full aspect-video md:aspect-auto">
                            <Image
                                src="/images/popup-image.png"
                                alt="Book a Free Consultation"
                                fill
                                sizes="(max-w-768px) 100vw, 280px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Right Side: Text details + CTA */}
                        <div className="w-full md:w-[58%] p-6 sm:p-8 flex flex-col justify-center relative bg-gradient-to-br from-[#050818] to-[#030611]">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
                                Stop Guessing. <br />
                                Start Automating.
                            </h3>

                            <p className="text-sm text-text-dim mt-3 leading-relaxed font-normal">
                                Book your free discovery meeting today to learn how Hive can automate your pipeline, eliminate manual lead scraping, and scale your volume on autopilot.
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button
                                    className="flex-1 group h-12 px-6 text-sm font-medium shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]"
                                    onClick={() => {
                                        window.open('https://calendly.com/nexawork/hive', '_blank');
                                        onClose();
                                    }}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Book Free Meeting
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
