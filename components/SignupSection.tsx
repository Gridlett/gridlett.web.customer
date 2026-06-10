'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Zap, Home, Building2, CheckCircle2, Loader2,
  Wifi, Battery, Tv, Wind, Sun, ChevronRight
} from 'lucide-react'

// ── Zod Schemas ────────────────────────────────────────────────

const tenantSchema = z.object({
  fullName:     z.string().min(2, 'Full name must be at least 2 characters'),
  contact:      z.string().min(7, 'Enter a valid email or phone number'),
  propertyCode: z.string().min(4, 'Property code must be at least 4 characters').toUpperCase(),
  tier:         z.enum(['1', '2', '3']),
})

const ownerSchema = z.object({
  name:         z.string().min(2, 'Name must be at least 2 characters'),
  address:      z.string().min(10, 'Please enter the full property address'),
  capacity:     z.string().min(1, 'Please estimate solar/battery capacity'),
  contact:      z.string().min(7, 'Enter a valid email or phone number'),
})

type TenantForm = z.infer<typeof tenantSchema>
type OwnerForm  = z.infer<typeof ownerSchema>

// ── Tier data ──────────────────────────────────────────────────

const TIERS = [
  {
    id: '1' as const,
    name: 'Essential',
    watt: '200W',
    price: '₦8,000',
    sub: '/month',
    description: 'Lighting, phone charging, and a small fan. Perfect for a single room.',
    includes: ['4 LED bulbs', 'Phone & device charging', '1 small fan'],
    icon: Wifi,
    color: 'emerald',
  },
  {
    id: '2' as const,
    name: 'Standard',
    watt: '500W',
    price: '₦15,000',
    sub: '/month',
    description: 'Full lighting, TV, and fridge. Covers a typical 2-room apartment.',
    includes: ['Everything in Essential', '32" TV or equivalent', 'Small refrigerator'],
    icon: Tv,
    color: 'amber',
    badge: 'Most popular',
  },
  {
    id: '3' as const,
    name: 'Premium',
    watt: '1,000W',
    price: '₦25,000',
    sub: '/month',
    description: 'High-draw appliances, AC unit, and full household loads.',
    includes: ['Everything in Standard', 'Air conditioning unit', 'Washing machine / iron'],
    icon: Wind,
    color: 'amber',
  },
]

// ── Tier Card ──────────────────────────────────────────────────

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: typeof TIERS[0]
  selected: boolean
  onSelect: () => void
}) {
  const isAmber   = tier.color === 'amber'
  const accentClr = isAmber ? '#F59E0B' : '#10B981'
  const accentBg  = isAmber ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)'
  const accentBdr = isAmber ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'
  const Icon      = tier.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      className="tier-card text-left w-full rounded-2xl p-5 glass-card"
      style={{
        borderColor: selected ? accentClr : 'rgba(30,45,69,0.8)',
        borderWidth: '2px',
        boxShadow: selected ? `0 0 0 1px ${accentClr}22, 0 8px 32px ${accentClr}18` : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full text-black"
            style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}>
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: selected ? accentBg : 'rgba(30,45,69,0.4)', border: `1px solid ${selected ? accentBdr : 'transparent'}` }}>
          <Icon className="w-5 h-5" style={{ color: selected ? accentClr : '#64748B' }} />
        </div>
        <div>
          <p className="font-display font-bold text-white text-base leading-none">{tier.name}</p>
          <p className="text-xs font-mono mt-0.5" style={{ color: accentClr }}>{tier.watt} cap</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <span className="font-display text-2xl font-extrabold" style={{ color: selected ? accentClr : '#CBD5E1' }}>
          {tier.price}
        </span>
        <span className="text-xs text-brand-muted ml-1">{tier.sub}</span>
      </div>

      <p className="text-xs text-brand-muted leading-relaxed mb-3">{tier.description}</p>

      {/* Includes */}
      <ul className="space-y-1.5">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
            <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: accentClr }} />
            {item}
          </li>
        ))}
      </ul>

      {/* Selected indicator */}
      {selected && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: accentClr }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentClr }} />
          Selected
        </div>
      )}
    </button>
  )
}

// ── Tenant Form ────────────────────────────────────────────────

function TenantSignupForm({
  selectedTier,
  onSuccess,
}: {
  selectedTier: '1' | '2' | '3'
  onSuccess: () => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TenantForm>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { tier: selectedTier },
  })

  // Sync external tier selection into form
  const currentTier = watch('tier')
  if (currentTier !== selectedTier) {
    setValue('tier', selectedTier)
  }

  const onSubmit = async (data: TenantForm) => {
    // Simulate server action
    await new Promise((r) => setTimeout(r, 1800))
    console.log('Tenant registration:', data)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label">Full name</label>
          <input
            {...register('fullName')}
            placeholder="e.g. Amara Johnson"
            className={`field-input ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-400 mt-1.5">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Email or phone</label>
          <input
            {...register('contact')}
            placeholder="you@email.com or 0801..."
            className={`field-input ${errors.contact ? 'error' : ''}`}
          />
          {errors.contact && (
            <p className="text-xs text-red-400 mt-1.5">{errors.contact.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="field-label">Property code</label>
        <input
          {...register('propertyCode')}
          placeholder="e.g. GRID-LKJ-004"
          className={`field-input font-mono uppercase tracking-widest ${errors.propertyCode ? 'error' : ''}`}
        />
        <p className="text-xs text-brand-muted mt-1.5">
          Get this code from your property owner or manager.
        </p>
        {errors.propertyCode && (
          <p className="text-xs text-red-400 mt-1">{errors.propertyCode.message}</p>
        )}
      </div>

      {/* Hidden tier field synced from selector */}
      <input type="hidden" {...register('tier')} />

      {/* Current tier summary */}
      <div className="flex items-center gap-3 p-4 rounded-xl"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
        <Sun className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-sm text-brand-text">
          Subscribing to{' '}
          <span className="font-semibold text-amber-400">
            Tier {selectedTier} — {TIERS.find(t => t.id === selectedTier)?.name}
          </span>
          {' '}({TIERS.find(t => t.id === selectedTier)?.watt} cap)
        </p>
        <span className="ml-auto text-sm font-bold text-amber-400">
          {TIERS.find(t => t.id === selectedTier)?.price}
          <span className="text-xs text-brand-muted font-normal">/mo</span>
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-black font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)', boxShadow: '0 4px 20px rgba(245,158,11,0.25)' }}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" fill="black" />
            Request power access
          </>
        )}
      </button>
    </form>
  )
}

// ── Owner Form ─────────────────────────────────────────────────

const CAPACITY_OPTIONS = [
  'Under 1kW (starter system)',
  '1 – 3kW (small property)',
  '3 – 5kW (medium block)',
  '5 – 10kW (large facility)',
  '10kW+ (commercial)',
]

function OwnerRegistrationForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerForm>({ resolver: zodResolver(ownerSchema) })

  const onSubmit = async (data: OwnerForm) => {
    await new Promise((r) => setTimeout(r, 1800))
    console.log('Owner registration:', data)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label">Your name</label>
          <input
            {...register('name')}
            placeholder="e.g. Mr. Emeka Obi"
            className={`field-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Contact (email or phone)</label>
          <input
            {...register('contact')}
            placeholder="you@email.com or 0801..."
            className={`field-input ${errors.contact ? 'error' : ''}`}
          />
          {errors.contact && (
            <p className="text-xs text-red-400 mt-1.5">{errors.contact.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="field-label">Property address</label>
        <input
          {...register('address')}
          placeholder="e.g. 12 Adeleke Close, Surulere, Lagos"
          className={`field-input ${errors.address ? 'error' : ''}`}
        />
        {errors.address && (
          <p className="text-xs text-red-400 mt-1.5">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="field-label">Estimated solar / battery capacity</label>
        <select
          {...register('capacity')}
          className={`field-input appearance-none ${errors.capacity ? 'error' : ''}`}
          style={{ cursor: 'pointer' }}>
          <option value="" style={{ background: '#0D1525' }}>Select capacity range…</option>
          {CAPACITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ background: '#0D1525' }}>{opt}</option>
          ))}
        </select>
        {errors.capacity && (
          <p className="text-xs text-red-400 mt-1.5">{errors.capacity.message}</p>
        )}
      </div>

      <div className="p-4 rounded-xl"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div className="flex items-start gap-3">
          <Battery className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-brand-text leading-relaxed">
            As a property partner, Gridlett provisions the control layer on your existing solar infrastructure.
            You keep ownership of the hardware; we handle subscriptions, monitoring, and fair usage enforcement.
            Revenue share is paid monthly.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #065F46, #10B981)', boxShadow: '0 4px 20px rgba(16,185,129,0.25)' }}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Building2 className="w-5 h-5" />
            Register my property
          </>
        )}
      </button>
    </form>
  )
}

// ── Success State ──────────────────────────────────────────────

function SuccessState({
  type,
  onReset,
}: {
  type: 'tenant' | 'owner'
  onReset: () => void
}) {
  const isTenant = type === 'tenant'
  const accentClr = isTenant ? '#F59E0B' : '#10B981'

  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      {/* Animated checkmark */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full opacity-20 animate-ping"
          style={{ background: accentClr }} />
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${accentClr}22, transparent)`,
            border: `2px solid ${accentClr}44`,
          }}>
          <CheckCircle2 className="w-12 h-12" style={{ color: accentClr }} />
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-3">
        Registration received!
      </h3>
      <p className="text-brand-text max-w-sm leading-relaxed text-sm mb-2">
        {isTenant
          ? "We've got your request. Connect with your property owner to activate your Gridlett subscription and start getting reliable power."
          : "Welcome to the Gridlett partner network. Our team will reach out within 24 hours to walk you through the provisioning process."}
      </p>
      <p className="text-xs text-brand-muted mb-8">
        Questions? Email{' '}
        <a href="mailto:operations@gridlett.com" className="hover:text-amber-400 transition-colors underline underline-offset-2">
          operations@gridlett.com
        </a>
      </p>

      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:opacity-80"
        style={{ border: `1px solid ${accentClr}33`, color: accentClr }}>
        ← Submit another registration
      </button>
    </div>
  )
}

// ── Main SignupSection ─────────────────────────────────────────

export default function SignupSection() {
  const [activeTab, setActiveTab]       = useState<'tenant' | 'owner'>('tenant')
  const [selectedTier, setSelectedTier] = useState<'1' | '2' | '3'>('2')
  const [successState, setSuccessState] = useState<null | 'tenant' | 'owner'>(null)

  const handleSuccess = () => setSuccessState(activeTab)
  const handleReset   = () => setSuccessState(null)

  return (
    <section id="signup" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">Get started</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Choose your{' '}
            <span className="text-gradient-amber">power tier</span>
            , then sign up
          </h2>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Pick the usage level that fits your needs. Then register as a tenant or property owner below.
          </p>
        </div>

        {/* Tier Selector */}
        <div id="tiers" className="grid md:grid-cols-3 gap-4 mb-12">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              selected={selectedTier === tier.id}
              onSelect={() => setSelectedTier(tier.id)}
            />
          ))}
        </div>

        {/* Signup Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>

            {/* Tab bar */}
            {!successState && (
              <div className="flex border-b border-brand-border/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('tenant')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all relative"
                  style={{
                    color: activeTab === 'tenant' ? '#F59E0B' : '#64748B',
                    background: activeTab === 'tenant' ? 'rgba(245,158,11,0.05)' : 'transparent',
                  }}>
                  <Home className="w-4 h-4" />
                  I&apos;m a tenant
                  {activeTab === 'tenant' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('owner')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all relative"
                  style={{
                    color: activeTab === 'owner' ? '#10B981' : '#64748B',
                    background: activeTab === 'owner' ? 'rgba(16,185,129,0.05)' : 'transparent',
                  }}>
                  <Building2 className="w-4 h-4" />
                  I&apos;m a property owner
                  {activeTab === 'owner' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-t-full" />
                  )}
                </button>
              </div>
            )}

            {/* Form / Success body */}
            <div className="p-7 md:p-8">
              {successState ? (
                <SuccessState type={successState} onReset={handleReset} />
              ) : activeTab === 'tenant' ? (
                <>
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-white text-xl">Tenant sign up</h3>
                    <p className="text-sm text-brand-muted mt-1">
                      Join an existing Gridlett-enabled property using your property code.
                    </p>
                  </div>
                  <TenantSignupForm
                    key={selectedTier}
                    selectedTier={selectedTier}
                    onSuccess={handleSuccess}
                  />
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-white text-xl">Property owner registration</h3>
                    <p className="text-sm text-brand-muted mt-1">
                      List your property and let Gridlett manage structured energy access for your tenants.
                    </p>
                  </div>
                  <OwnerRegistrationForm onSuccess={handleSuccess} />
                </>
              )}
            </div>
          </div>

          {/* Trust footer */}
          {!successState && (
            <p className="text-center text-xs text-brand-muted mt-5 flex items-center justify-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-emerald-500" />
              No payment due at signup. Activation handled by your property partner.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
