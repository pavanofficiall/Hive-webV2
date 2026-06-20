"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"



function AccordionItem({ item, isOpen, onClick }: { item: { question: string; answer: string }; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="border-b border-surface-subtle/70 last:border-0">
            <button
                type="button"
                className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
                onClick={onClick}
            >
                <span className="text-lg font-medium text-white group-hover:text-brand-400 transition-colors">
                    {item.question}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-text-secondary leading-relaxed max-w-3xl">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
    const t = useTranslations("FAQ")
    const [openIndex, setOpenIndex] = React.useState<number | null>(0)

    const faqs = [
        {
            question: t('faqs.0.question'),
            answer: t('faqs.0.answer')
        },
        {
            question: t('faqs.1.question'),
            answer: t('faqs.1.answer')
        },
        {
            question: t('faqs.2.question'),
            answer: t('faqs.2.answer')
        },
        {
            question: t('faqs.3.question'),
            answer: t('faqs.3.answer')
        },
        {
            question: t('faqs.4.question'),
            answer: t('faqs.4.answer')
        }
    ]

    return (
        <section id="faq" className="py-24 lg:py-32 bg-bg">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl mb-4">
                        {t('headline')}
                    </h2>
                    <p className="text-text-secondary">{t('subhead')}</p>
                </div>

                <div className="divide-y divide-surface-subtle border-y border-surface-subtle">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            item={faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
