import { Zap, Shield, BarChart3, Users, CheckCircle2, Building2 } from 'lucide-react'
import SignupSection from '@/components/SignupSection'

// ── Static data ────────────────────────────────────────────────
const STATS = [
  { value: '99.2%', label: 'Uptime reliability' },
  { value: '3 tiers', label: 'Usage plans' },
  { value: '₦0', label: 'Upfront cost' },
  { value: '24/7', label: 'Remote monitoring' },
]

const HOW_IT_WORKS = [
  {
    icon: Building2,
    step: 'A',
    title: 'Property owner registers',
    body: 'The landlord or facility manager registers the property and its solar capacity. Gridlett provisions the smart control layer.',
    color: 'amber',
  },
  {
    icon: Users,
    step: 'B',
    title: 'Tenants subscribe to a tier',
    body: 'Each occupant picks a usage tier that fits their needs and pays a fixed monthly fee. No surprise bills.',
    color: 'emerald',
  },
  {
    icon: Shield,
    step: 'C',
    title: 'Gridlett enforces fair access',
    body: 'Our IoT control layer monitors consumption in real time and keeps every user within their agreed share — automatically.',
    color: 'amber',
  },
  {
    icon: BarChart3,
    step: 'D',
    title: 'Everyone gets reliable power',
    body: 'No single user can starve the rest. The grid stays stable, and partners earn predictable revenue month after month.',
    color: 'emerald',
  },
]

const PROOF_ITEMS = [
  'No generator noise',
  'No NEPA blackouts',
  'No shared-bill disputes',
  'No upfront hardware cost',
]

// ── Components ─────────────────────────────────────────────────

function HeroPowerOrb() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* ambient glow layers */}
      <div className="absolute inset-0 orb-amber rounded-full" />
      <div className="absolute inset-8 orb-emerald rounded-full" style={{ animationDelay: '1s' }} />

      {/* pulse rings */}
      <div className="absolute w-48 h-48 rounded-full border border-amber-500/20 pulse-ring" />
      <div className="absolute w-48 h-48 rounded-full border border-amber-500/20 pulse-ring-delay" />
      <div className="absolute w-32 h-32 rounded-full border border-emerald-500/30" style={{ animation: 'ring-pulse 2s ease-out 1.4s infinite' }} />

      {/* Core icon */}
      <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1E2D45, #0D1525)', border: '2px solid rgba(245,158,11,0.4)', boxShadow: '0 0 40px rgba(245,158,11,0.25), inset 0 0 20px rgba(245,158,11,0.05)' }}>
        <Zap className="w-10 h-10" style={{ color: '#F59E0B', filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.8))' }} fill="#F59E0B" />
      </div>
    </div>
  )
}

function StatsBand() {
  return (
    <div className="border-y border-brand-border/50 py-8"
      style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.03), rgba(16,185,129,0.03))' }}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold font-display text-gradient-amber">{s.value}</p>
            <p className="text-sm text-brand-muted mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProofBadges() {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {PROOF_ITEMS.map((item) => (
        <span key={item}
          className="flex items-center gap-1.5 text-sm text-brand-text px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {item}
        </span>
      ))}
    </div>
  )
}

function HowItWorks() {
  return (
    <section className="py-24 px-6" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">The system</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Structured power,{' '}
            <span className="text-gradient-emerald">shared fairly</span>
          </h2>
          <p className="mt-4 text-brand-text max-w-xl mx-auto leading-relaxed">
            Gridlett sits between the solar asset and the end user — enforcing usage limits,
            collecting subscriptions, and keeping every occupant in the light.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {HOW_IT_WORKS.map((item) => {
            const Icon = item.icon
            const isAmber = item.color === 'amber'
            return (
              <div key={item.step} className="glass-card rounded-2xl p-6 group"
                style={{ transition: 'border-color 0.3s' }}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: isAmber ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                      border: `1px solid ${isAmber ? 'rgba(245,158,11,0.25)' : 'rgba(16,185,129,0.25)'}`,
                    }}>
                    <Icon className="w-5 h-5" style={{ color: isAmber ? '#F59E0B' : '#10B981' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: isAmber ? '#F59E0B88' : '#10B98188' }}>
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg leading-snug mb-2">{item.title}</h3>
                    <p className="text-brand-text text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 orb-amber pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-1/4 right-0 w-80 h-80 orb-emerald pointer-events-none translate-x-1/3" />

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', boxShadow: '0 0 16px rgba(245,158,11,0.4)' }}>
            <Zap className="w-4 h-4 text-black" fill="black" />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">gridlett</span>
          <span className="ml-1 text-[10px] font-semibold text-amber-400 opacity-60 tracking-widest uppercase self-end mb-0.5">⚡</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-brand-muted font-medium">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#tiers" className="hover:text-white transition-colors">Tiers</a>
          <a href="#signup" className="hover:text-white transition-colors">Sign up</a>
        </div>
        <a href="#signup"
          className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-xl text-black"
          style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}>
          Get access
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-12 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#FCD34D' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Now available · Lagos & beyond
        </div>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
          Power{' '}
          <span className="text-gradient-amber">without limits.</span>
          <br />
          <span className="text-white/70 font-light">Usage</span>{' '}
          <span className="text-gradient-emerald">with structure.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed">
          Gridlett is a structured electricity access system that delivers reliable solar power
          to multiple households — while ensuring no one ever exceeds their fair share.
        </p>

        <ProofBadges />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="#signup"
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-black font-bold text-base font-display"
            style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)', boxShadow: '0 4px 24px rgba(245,158,11,0.3)' }}>
            <Zap className="w-5 h-5" fill="black" />
            Get connected
          </a>
          <a href="#how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-brand-text hover:text-white transition-colors"
            style={{ border: '1px solid #1E2D45' }}>
            See how it works →
          </a>
        </div>

        {/* Hero orb */}
        <div className="mt-16 relative">
          <HeroPowerOrb />
          <p className="text-xs text-brand-muted mt-4 tracking-widest uppercase font-medium">
            IoT-controlled energy access
          </p>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <StatsBand />

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── SIGNUP SECTION (Client Component) ── */}
      <SignupSection />

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-brand-border/50 py-10 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
              <Zap className="w-3 h-3 text-black" fill="black" />
            </div>
            <span className="font-display font-bold text-white">gridlett</span>
          </div>
          <p className="text-xs text-brand-muted">© {new Date().getFullYear()} Gridlett. Power.. to let.</p>
          <div className="flex gap-5 text-xs text-brand-muted">
            <a href="mailto:operations@gridlett.com" className="hover:text-amber-400 transition-colors">operations@gridlett.com</a>
            <span>gridlett.com</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
