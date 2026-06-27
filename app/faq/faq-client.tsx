'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? 'border-brand-blue/50' : 'border-brand-border/40 hover:border-brand-border/80'
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-white text-base md:text-lg pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0 w-8 h-8 rounded-lg bg-brand-border/40 flex items-center justify-center text-brand-text"
        >
          <ChevronDown className="w-4.5 h-4.5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-6 md:px-6 md:pb-6 text-sm md:text-base text-brand-text leading-relaxed border-t border-brand-border/20 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SUBSCRIBER_FAQS = [
  {
    question: 'What is Gridlett?',
    answer: 'Gridlett is a smart electricity access system that brings stable, clean solar power to shared residential blocks and estates in Nigeria using automated load management and flexible tier subscriptions.',
  },
  {
    question: 'What happens during an internet outage?',
    answer: 'The Gridlett Smart Controller runs locally at the edge. It enforces limits and routes solar energy without needing an active internet connection. Your power access remains completely uninterrupted.',
  },
  {
    question: 'How does the Smart Controller prevent grid overload?',
    answer: 'Our smart control hardware monitors your apartment’s real-time electricity draw. If your usage exceeds your tier capacity (e.g. running high-draw appliances), the controller temporarily cuts power to protect the battery bank and inverter from blowing. Power is restored automatically once the load is reduced.',
  },
  {
    question: 'Can I run my refrigerator or iron on the Essential plan?',
    answer: 'No. The Essential plan is rated for a 400W limit, which is perfect for lights, fans, and electronics. Appliances like refrigerators (typically 600W+ surge) and irons (typically 1000W+) exceed this limit and will trigger the automated cut-off. For high-draw appliances, upgrade to our Standard (1200W) or Premium (2300W) plans.',
  },
  {
    question: 'How do I fund my wallet and renew my subscription?',
    answer: 'You can fund your account wallet through direct bank transfer or card payments on the Resident Portal. Your selected plan auto-renews at the beginning of each cycle if you have sufficient funds in your wallet.',
  },
  {
    question: 'Can I change my subscription tier?',
    answer: 'Yes! You can upgrade or downgrade your tier through the resident portal at any time. Upgrades take effect immediately, while downgrades will be applied in your next billing cycle.',
  },
]

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="relative z-10 flex-1 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
            <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            Support Center
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Frequently Asked{' '}
            <span className="text-gradient-emerald">Questions</span>
          </h2>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Find answers to common questions about Gridlett smart solar subscriptions.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {SUBSCRIBER_FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
