import { Zap, Shield, Heart, Eye, Target, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Gridlett\'s mission to build structured, software-driven electricity access that delivers clean, reliable solar energy to homes and businesses across Nigeria.',
  alternates: {
    canonical: '/about',
  },
}

const VALUES = [
  {
    icon: Target,
    title: 'Equity & Fairness',
    body: 'We believe clean energy is a shared resource. Our system ensures no single subscriber can overload the grid, keeping electricity fair and accessible for all tenants.',
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Reliability First',
    body: 'Our advanced control layer and energy management software keep uptime high, removing reliance on unpredictable grid power and noisy, polluting generators.',
    color: 'emerald',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    body: 'No surprise bills, no split disputes. Subscribers pay a clear, fixed monthly fee according to their usage tier, with real-time tracking from our portal.',
    color: 'blue',
  },
  {
    icon: Sparkles,
    title: 'Sustainable Growth',
    body: 'By optimizing shared solar assets, we help deliver clean, sustainable solar energy directly to your apartment, reducing carbon footprints while lowering daily energy costs.',
    color: 'emerald',
  },
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-brand-black text-brand-text overflow-hidden flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] orb-blue pointer-events-none -translate-y-1/2 opacity-40" />
      <div className="fixed bottom-1/4 right-0 w-[450px] h-[450px] orb-emerald pointer-events-none translate-x-1/3 opacity-30" />

      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
        <PageWrapper>
          {/* Section: Hero */}
          <section className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }}>
              <Heart className="w-3.5 h-3.5 text-emerald-400 shrink-0 fill-emerald-400/20" />
              Our Mission · Powered by Innovation
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
              Powering communities,{' '}
              <span className="text-gradient-blue">fairly</span> and{' '}
              <span className="text-gradient-emerald">sustainably</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed">
              Gridlett is dedicated to building structured, software-driven electricity access that delivers clean, reliable solar energy to homes and businesses across Nigeria.
            </p>
          </section>

          {/* Section: Genesis / The Story */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-28 border-t border-brand-border/30 pt-16">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">The Genesis</p>
              <h2 className="font-display text-3xl font-bold text-white leading-tight">
                Solving the challenges of shared electricity
              </h2>
              <div className="space-y-4 text-brand-text leading-relaxed text-sm md:text-base">
                <p>
                  In many parts of Nigeria, grid instability forces apartments and shared complexes to rely heavily on costly diesel and petrol generators. These generators are noisy, pollute the air, and require constant, manual refueling.
                </p>
                <p>
                  When complexes transition to shared solar systems, a common headache arises: without structure, one unit turning on multiple high-load devices can drain the shared battery bank, overloading the inverter and leaving the entire building in darkness.
                </p>
                <p>
                  This leads to constant friction, disputes over diesel and solar bill-splitting, and unstable power grids. <strong className="text-white font-bold">Gridlett was built to change that.</strong>
                </p>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-8 relative overflow-hidden border border-brand-border/60"
              style={{ background: 'linear-gradient(135deg, rgba(21, 30, 46, 0.8), rgba(13, 21, 37, 0.9))' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 orb-blue opacity-40 pointer-events-none" />
              <h3 className="font-display font-semibold text-white text-xl mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" fill="#10b98144" />
                The Gridlett Engine
              </h3>
              <p className="text-sm leading-relaxed mb-6 text-brand-text">
                We developed a smart control layer combined with an automated subscription engine. Instead of unmonitored power sharing, Gridlett provisions clean solar energy under strict structure:
              </p>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span><strong className="text-white font-bold">Smart Load Management</strong>: The controller prevents individual apartments from overloading the shared inverter.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span><strong className="text-white font-bold">Fixed Subscriptions</strong>: Subscribers select a plan tier that fits their budget. No surprise bills.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span><strong className="text-white font-bold">Smart Control</strong>: Real-time telemetry keeps the microgrid balanced and stable 24/7.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Core Values */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">Our Foundation</p>
              <h2 className="font-display text-3xl font-bold text-white">
                Guided by core principles
              </h2>
              <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm">
                How we approach technology, engineering, and our relationship with our subscribers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((val) => {
                const Icon = val.icon
                const isBlue = val.color === 'blue'
                return (
                  <div
                    key={val.title}
                    className="glass-card rounded-2xl p-6 relative overflow-hidden border border-brand-border/40 hover:border-brand-border/80 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: isBlue ? 'rgba(59,130,246,0.08)' : 'rgba(16,185,129,0.08)',
                          border: `1px solid ${isBlue ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.2)'}`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: isBlue ? '#60a5fa' : '#34D399' }} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-lg mb-2">{val.title}</h3>
                        <p className="text-brand-text text-sm leading-relaxed">{val.body}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Section: Call to Action */}
          <section
            className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-brand-border"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 45, 69, 0.4), rgba(8, 13, 26, 0.6))',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            {/* Ambient light flares */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 orb-blue opacity-50 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 orb-emerald opacity-40 pointer-events-none" />

            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to experience reliable solar power?
            </h2>
            <p className="text-brand-text max-w-xl mx-auto mb-8 text-sm md:text-base">
              Select a monthly subscription plan that fits your household appliance needs and get started with clean, constant energy today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#plans"
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base font-display"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                  boxShadow: '0 4px 24px rgba(59,130,246,0.3)',
                }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:operations@gridlett.com"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-brand-text hover:text-white transition-colors"
                style={{ border: '1px solid #1E2D45' }}
              >
                Contact Operations
              </a>
            </div>
          </section>
        </PageWrapper>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
