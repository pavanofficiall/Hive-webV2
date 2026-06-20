"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useTranslations } from "next-intl"

export function WaitlistForm() {
    const t = useTranslations("WaitlistForm")
    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = React.useState("")

    const FREE_DOMAINS = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com", "@icloud.com"]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email) return

        const isFreeEmail = FREE_DOMAINS.some(domain => email.toLowerCase().includes(domain))
        
        if (isFreeEmail) {
            setStatus("error")
            setErrorMessage(t('freeEmailError'))
            return
        }

        setStatus("loading")
        
        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }])
            
            if (error) throw error
            
            setStatus("success")
        } catch (err: any) {
            console.error("Waitlist error:", err)
            setStatus("error")
            setErrorMessage(err.message || t('fallbackError'))
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#030611]/80 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                    >
                        <div className="flex justify-center mb-5">
                            <CheckCircle2 className="h-12 w-12 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{t('successTitle')}</h3>
                        <p className="text-base text-text-secondary leading-relaxed">
                            {t('successMessage')}
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                        className="relative"
                    >
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (status === "error") setStatus("idle")
                                    }}
                                    placeholder={t('placeholder')}
                                    className={`w-full h-12 md:h-14 bg-[#0a0f1c] border ${status === "error" ? "border-red-500/50 focus:border-red-500" : "border-brand-500/20 focus:border-brand-500/50"} rounded-xl px-5 text-white placeholder:text-text-muted outline-none transition-all duration-300 shadow-inner`}
                                    disabled={status === "loading"}
                                    required
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={status === "loading"}
                                className="h-12 md:h-14 px-8 whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                            >
                                {status === "loading" ? t('buttonLoading') : t('buttonSubmit')}
                                {!status.includes("loading") && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                        
                        <AnimatePresence>
                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden mt-3"
                                >
                                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium bg-red-500/10 py-2.5 px-4 rounded-lg border border-red-500/10">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <span>{errorMessage}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    )
}
