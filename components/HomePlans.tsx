'use client'

import { useState, useEffect } from 'react'
import { Zap, Check, ArrowRight, Fan, Lightbulb, Smartphone, Tv, Wind, Refrigerator } from 'lucide-react'
import Link from 'next/link'

const PLAN_RICH_CONFIG: Record<number, any> = {
  1: {
    subtitle: 'Essential Tier',
    color: '#3b82f6',
    guideline: 'Perfect for lights, standing fans, and charging devices.',
    appliances: [
      { icon: Fan, name: 'Standing Fan' },
      { icon: Lightbulb, name: 'LED Lighting' },
      { icon: Smartphone, name: 'Phone & Laptop' },
    ],
    features: [
      'Intelligent overload protection',
      'Real-time power tracking',
      'WhatsApp receipts & alerts',
      'Instant power self-restore',
    ],
  },
  2: {
    subtitle: 'Standard Tier',
    color: '#10b981',
    popular: true,
    guideline: 'Capable of moderate household loads: TV, PC, multiple fans, and air coolers.',
    appliances: [
      { icon: Fan, name: 'Multiple Fans' },
      { icon: Lightbulb, name: 'Full Lighting' },
      { icon: Tv, name: 'TV & Home Entertainment' },
      { icon: Wind, name: 'Air Cooler' },
      { icon: Smartphone, name: 'All Personal Devices' },
    ],
    features: [
      'Generous power allowance',
      'Smart household grid balancing',
      'Real-time usage tracking app',
      'WhatsApp smart notifications',
      'Priority customer support',
    ],
  },
  3: {
    subtitle: 'Premium Tier',
    color: '#a855f7',
    guideline: 'Sufficient for AC units, refrigerator/freezers, and high-draw appliances.',
    appliances: [
      { icon: Fan, name: 'Climate Control / AC' },
      { icon: Lightbulb, name: 'Smart Lighting' },
      { icon: Tv, name: 'High-End Systems' },
      { icon: Refrigerator, name: 'Fridge & Freezer' },
      { icon: Smartphone, name: 'All Appliances' },
    ],
    features: [
      'High-capacity power supply',
      'Maximum energy allocation',
      'Smart heavy-appliance support',
      'Dedicated support liaison',
      'Top priority connection',
    ],
  },
}

function PlanCardSkeleton() {
  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-brand-border/40 animate-pulse min-h-[480px]">
      <div className="space-y-4 text-center">
        <div className="h-3 bg-slate-800 rounded w-1/3 mx-auto" />
        <div className="h-6 bg-slate-800 rounded w-1/2 mx-auto" />
        <div className="h-10 bg-slate-800 rounded w-2/3 mx-auto" />
      </div>
      <div className="space-y-3 my-6">
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
        <div className="h-4 bg-slate-800 rounded w-4/6" />
      </div>
      <div className="h-12 bg-slate-800 rounded w-full mt-auto" />
    </div>
  )
}

export default function HomePlans() {
  const [plans, setPlans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
        const res = await fetch(`${baseUrl}/v1/Plan/Get/System`)
        const data = await res.json()
        if (data.status && Array.isArray(data.data)) {
          const sortedPlans = [...data.data].sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          setPlans(sortedPlans)
        }
      } catch (err) {
        console.error('Failed to fetch pricing plans:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPlans()
  }, [])

  return (
    <section className="py-24 px-6 border-t border-brand-border/30 relative z-10" id="plans">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}
          >
            <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            Flexible Subscription Tiers
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Choose your <span className="text-gradient-emerald">energy level</span>
          </h2>
          <p className="mt-4 text-brand-text max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Choose a subscription plan below to register and request electricity access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
          {isLoading ? (
            <>
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </>
          ) : plans.length > 0 ? (
            plans.map((plan) => {
              const rich = PLAN_RICH_CONFIG[plan.sortOrder] || PLAN_RICH_CONFIG[1]
              const priceStr = plan.amount ? `₦${plan.amount.toLocaleString()}` : 'Free'
              const limitStr = plan.maxPowerDemandWatts ? `${plan.maxPowerDemandWatts.toLocaleString()} Watts Max` : 'Unlimited Limit'

              return (
                <div
                  key={plan.id}
                  className={`glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative border transition-all duration-300 hover:scale-[1.01] ${
                    rich.popular
                      ? 'border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] md:-translate-y-1 hover:border-blue-400'
                      : 'border-brand-border/60 hover:border-brand-border/90'
                  }`}
                >
                  {rich.popular && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  )}

                  <div>
                    {/* Header info */}
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted">
                        {rich.subtitle}
                      </span>
                      <h3 className="font-display font-bold text-2xl text-white mt-1">
                        {plan.name}
                      </h3>
                      <div className="my-4 flex items-baseline justify-center gap-1">
                        <span className="text-4xl md:text-5xl font-extrabold text-white">
                          {priceStr}
                        </span>
                        <span className="text-sm text-brand-muted font-semibold">/mo</span>
                      </div>
                      <span
                        className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
                      >
                        {limitStr}
                      </span>
                    </div>

                    <hr className="border-brand-border/30 my-6" />

                    {/* Guidelines */}
                    <div className="mb-6">
                      <p className="text-xs text-brand-muted leading-relaxed italic text-center">
                        "{rich.guideline}"
                      </p>
                    </div>

                    {/* Appliance Meter */}
                    {rich.appliances && (
                      <div className="mb-6 bg-brand-black/40 rounded-2xl p-4 border border-brand-border/20">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted block mb-3">
                          Usage Guide
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {rich.appliances.map((app: any) => {
                            const Icon = app.icon
                            return (
                              <span
                                key={app.name}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-navy/60 border border-brand-border/40 text-xs font-medium text-white"
                              >
                                <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                {app.name}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Features list */}
                    {rich.features && (
                      <div className="space-y-3 mb-8">
                        {rich.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-brand-text leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Always visible Sign up button */}
                  <div className="pt-6 mt-auto">
                    <Link
                      href={`/register?plan=${encodeURIComponent(plan.name)}`}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-center font-bold text-sm font-display transition-all ${
                        rich.popular
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:opacity-90 hover:scale-[1.01]'
                          : 'border border-brand-border hover:border-brand-border/80 text-brand-text hover:text-white hover:scale-[1.01]'
                      }`}
                    >
                      Sign up on this plan
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-3 text-center py-8 text-brand-muted text-sm glass-card rounded-2xl border border-brand-border/40">
              No plans found. Please check back later.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
