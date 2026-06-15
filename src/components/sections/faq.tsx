"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "Who is HIVE built for?",
        answer: "HIVE is built exclusively for lead generation and outreach agencies who already have validated campaigns and ready pipelines. If your strategy works but your team is buried under manual tasks like scraping, cleaning databases, rotating domains, and CRM entry, we automate it."
    },
    {
        question: "How long does the integration process take?",
        answer: "We deploy your entire automated engine within 30 days. Week 1 is alignment and pipeline mapping. Weeks 2-3 are dedicated to technical development, API scripting, and CRM configurations. By Week 4, your campaigns are running on 100% autopilot."
    },
    {
        question: "What outreach platforms and tools do you support?",
        answer: "We sync directly with your current stack. We regularly build integrations with Smartlead, Instantly, Lemlist, Clay, Apollo, HubSpot, Salesforce, Close, Slack, and custom webhooks."
    },
    {
        question: "Do you write our outreach copy or design the strategy?",
        answer: "No. We focus entirely on the engineering and operational systems. You keep your copy, templates, and targeting strategy. We build the technical infrastructure (enrichment, rotators, responders) underneath it to scale your volume."
    },
    {
        question: "How do you protect domain health and email deliverability?",
        answer: "We build self-healing deliverability infrastructure. Our systems continuously check cold-domain blacklists, monitor inbox health metrics, and automatically rotate flag-prone inboxes out of active sequences before they damage your overall reputation."
    }
]

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
    const [openIndex, setOpenIndex] = React.useState<number | null>(0)

    return (
        <section id="faq" className="py-24 lg:py-32 bg-bg">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-text-secondary">Everything you need to know about our automation services.</p>
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
