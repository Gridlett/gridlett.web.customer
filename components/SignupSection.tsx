'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import {
  Zap, CheckCircle2, Loader2,
  Wifi, Tv, Wind, Sun, ChevronRight, Eye, EyeOff
} from 'lucide-react'

interface MappedPlan {
  id: string
  name: string
  watt: string
  price: string
  sub: string
  description: string
  includes: string[]
  icon: any
  color: string
  badge: string
}

// Helper to format cluster code automatically: XXX-XXX-XXX
const formatClusterCode = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

// ── Zod Schemas ────────────────────────────────────────────────

const tenantSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(30, 'First name must not exceed 30 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(30, 'Last name must not exceed 30 characters'),
  whatsapp: z.string().length(11, 'WhatsApp number must be exactly 11 digits'),
  email: z.string().max(50, 'Email must not exceed 50 characters').email('Enter a valid email address').optional().or(z.literal('')),
  clusterCode: z.string().refine((val) => {
    const clean = val.replace(/\D/g, '')
    return clean.length === 9
  }, 'Cluster code must be exactly 9 digits'),
  planId: z.string().uuid('Invalid plan selected'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one digit')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
})

type TenantForm = z.infer<typeof tenantSchema>

// Helper to parse plan description split by ||
const parsePlanDescription = (desc: string) => {
  if (!desc) return { description: '', includes: [] }
  const parts = desc.split('||')
  const mainDesc = parts[0].trim()
  let includes: string[] = []
  if (parts.length > 1) {
    includes = parts[1]
      .split(',')
      .map(item => item.trim().replace(/^['"]|['"]$/g, '').trim())
      .filter(item => item.length > 0)
  }
  return { description: mainDesc, includes }
}

const mapBackendPlan = (plan: any): MappedPlan => {
  const parsedDesc = parsePlanDescription(plan.description)

  let Icon = Sun
  let color = 'blue'
  let badge = ''

  if (plan.sortOrder === 1) {
    Icon = Wifi
    color = 'emerald'
  } else if (plan.sortOrder === 2) {
    Icon = Tv
    color = 'blue'
    badge = 'Most popular'
  } else if (plan.sortOrder === 3) {
    Icon = Wind
    color = 'blue'
  }

  return {
    id: plan.id,
    name: plan.name,
    watt: `${(plan.maxPowerDemandWatts || 0).toLocaleString()}W`,
    price: `₦${(plan.amount || 0).toLocaleString()}`,
    sub: '/month',
    description: parsedDesc.description,
    includes: parsedDesc.includes,
    icon: Icon,
    color,
    badge
  }
}

// ── Tier Card ──────────────────────────────────────────────────

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: MappedPlan
  selected: boolean
  onSelect: () => void
}) {
  const isBlue = tier.color === 'blue'
  const accentClr = isBlue ? '#3b82f6' : '#10B981'
  const accentBg = isBlue ? 'rgba(59,130,246,0.08)' : 'rgba(16,185,129,0.08)'
  const accentBdr = isBlue ? 'rgba(59,130,246,0.3)' : 'rgba(16,185,129,0.3)'
  const Icon = tier.icon

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
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }}>
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
  selectedPlanId,
  setSelectedPlanId,
  plans,
}: {
  selectedPlanId: string
  setSelectedPlanId: (id: string) => void
  plans: any[]
}) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TenantForm>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { planId: selectedPlanId },
  })

  // Sync external planId selection into form
  useEffect(() => {
    if (selectedPlanId) {
      setValue('planId', selectedPlanId)
    }
  }, [selectedPlanId, setValue])

  const [apiError, setApiError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const password = watch('password') || ''
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial

  const onSubmit = async (data: TenantForm) => {
    setApiError(null)
    setIsPending(true)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
      const cleanedClusterCode = data.clusterCode.replace(/\D/g, '')
      const propertyCodeDigit = parseInt(cleanedClusterCode, 10)
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        whatsapp: data.whatsapp,
        email: data.email || null,
        propertyCode: propertyCodeDigit,
        planId: data.planId,
        password: data.password,
      }

      const res = await fetch(`${baseUrl}/v1/Onboarding/Customer/Self`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const respData = await res.json().catch(() => ({}))
      if (!res.ok || respData.status === false) {
        throw new Error(respData.message || 'Failed to submit registration. Please try again.')
      }

      // Redirect to WhatsApp verification screen
      router.push(`/verify-account?phone=${encodeURIComponent(data.whatsapp)}`)
    } catch (err: any) {
      setApiError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {apiError && (
        <div className="p-4 rounded-xl text-sm bg-red-500/10 border border-red-500/20 text-red-400">
          {apiError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label">Cluster code</label>
          <input
            {...register('clusterCode', {
              onChange: (e) => {
                const formatted = formatClusterCode(e.target.value)
                setValue('clusterCode', formatted)
              }
            })}
            placeholder="e.g. 123-456-789"
            maxLength={11}
            className={`field-input font-mono tracking-widest ${errors.clusterCode ? 'error' : ''}`}
          />
          <p className="text-xs text-brand-muted mt-1.5">
            Enter the 9-digit cluster code provided by your property manager.
          </p>
          {errors.clusterCode && (
            <p className="text-xs text-red-400 mt-1">{errors.clusterCode.message}</p>
          )}
        </div>

        <div>
          <label className="field-label">WhatsApp number</label>
          <input
            {...register('whatsapp', {
              onChange: (e) => {
                const clean = e.target.value.replace(/\D/g, '').slice(0, 11)
                setValue('whatsapp', clean)
              }
            })}
            placeholder="e.g. 08012345678"
            className={`field-input ${errors.whatsapp ? 'error' : ''}`}
          />
          {errors.whatsapp && (
            <p className="text-xs text-red-400 mt-1.5">{errors.whatsapp.message}</p>
          )}
        </div>

        <div>
          <label className="field-label">First name</label>
          <input
            {...register('firstName')}
            placeholder="e.g. Amara"
            maxLength={30}
            className={`field-input ${errors.firstName ? 'error' : ''}`}
          />
          {errors.firstName && (
            <p className="text-xs text-red-400 mt-1.5">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="field-label">Last name</label>
          <input
            {...register('lastName')}
            placeholder="e.g. Johnson"
            maxLength={30}
            className={`field-input ${errors.lastName ? 'error' : ''}`}
          />
          {errors.lastName && (
            <p className="text-xs text-red-400 mt-1.5">{errors.lastName.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label">Email (optional)</label>
          <input
            {...register('email')}
            placeholder="you@email.com"
            maxLength={50}
            className={`field-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Hidden planId field synced from selector */}
      <input type="hidden" {...register('planId')} />

      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <label className="field-label">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="••••••••"
            className={`field-input pr-10 ${errors.password ? 'error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-400 mt-1.5">{errors.password.message}</p>
        )}

        {/* Password Requirement Checklist (Laws) */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs border border-brand-border/30 rounded-xl p-3 bg-brand-black/20">
          <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            At least 8 characters
          </div>
          <div className={`flex items-center gap-1.5 ${hasUppercase ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            One uppercase letter
          </div>
          <div className={`flex items-center gap-1.5 ${hasLowercase ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            One lowercase letter
          </div>
          <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            One number
          </div>
          <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            One special character
          </div>
        </div>
      </div>

      {/* Current plan summary dropdown */}
      <div className="flex flex-col gap-1.5" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <label className="field-label">Selected Power Plan</label>
        <div className="relative flex items-center rounded-xl overflow-hidden"
          style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="absolute left-4 pointer-events-none flex items-center justify-center">
            <Sun className="w-5 h-5 text-blue-400" />
          </div>
          <select
            value={selectedPlanId}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedPlanId(val);
            }}
            className="w-full bg-transparent pl-12 pr-10 py-4 font-display font-semibold text-sm text-brand-text select-custom-icon appearance-none cursor-pointer focus:outline-none"
            style={{ color: '#E2E8F0' }}
          >
            {plans.map((p) => {
              const m = mapBackendPlan(p);
              return (
                <option key={p.id} value={p.id} style={{ background: '#0D1525', color: '#E2E8F0' }}>
                  {m.name} ({m.watt} cap) — {m.price}/mo
                </option>
              );
            })}
          </select>
          <div className="absolute right-4 pointer-events-none flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || isSubmitting || !isPasswordValid}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}>
        {isPending || isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" fill="white" />
            Request power access
          </>
        )}
      </button>
    </form>
  )
}


// ── Tier Card Skeleton ─────────────────────────────────────────

function TierCardSkeleton() {
  return (
    <div
      className="w-full rounded-2xl p-5 glass-card border animate-pulse min-h-[260px] flex flex-col justify-between"
      style={{
        borderColor: 'rgba(30,45,69,0.8)',
        borderWidth: '2px',
      }}
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-800/80 rounded w-2/3" />
            <div className="h-3 bg-slate-800/80 rounded w-1/3" />
          </div>
        </div>
        <div className="h-6 bg-slate-800/80 rounded w-1/2 mb-4" />
        <div className="h-3 bg-slate-800/80 rounded w-5/6 mb-2" />
        <div className="h-3 bg-slate-800/80 rounded w-2/3" />
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-slate-800/80 rounded w-11/12" />
        <div className="h-3 bg-slate-800/80 rounded w-9/12" />
      </div>
    </div>
  )
}

// ── Main SignupSection ─────────────────────────────────────────

export default function SignupSection() {
  const [plans, setPlans] = useState<any[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState<string>('')
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
        const res = await fetch(`${baseUrl}/v1/Plan/Get/System`)
        const data = await res.json()
        if (data.status && Array.isArray(data.data)) {
          const sortedPlans = [...data.data].sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          setPlans(sortedPlans)

          // Select standard plan (sortOrder = 2) by default, or fallback to first plan
          const standardPlan = sortedPlans.find((p: any) => p.sortOrder === 2)
          if (standardPlan) {
            setSelectedPlanId(standardPlan.id)
          } else if (sortedPlans.length > 0) {
            setSelectedPlanId(sortedPlans[0].id)
          }
        }
      } catch (err) {
        console.error('Failed to fetch system plans:', err)
      } finally {
        setIsLoadingPlans(false)
      }
    }

    fetchPlans()
  }, [])

  return (
    <section id="signup" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">Get started</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Choose your{' '}
            <span className="text-gradient-blue">power tier</span>
            , then sign up
          </h2>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Pick the usage level that fits your needs. Then register as a tenant below.
          </p>
        </div>

        {/* Tier Selector */}
        <div id="tiers" className="grid md:grid-cols-3 gap-4 mb-12">
          {isLoadingPlans ? (
            <>
              <TierCardSkeleton />
              <TierCardSkeleton />
              <TierCardSkeleton />
            </>
          ) : plans.length > 0 ? (
            plans.map((plan) => {
              const mapped = mapBackendPlan(plan)
              return (
                <TierCard
                  key={mapped.id}
                  tier={mapped}
                  selected={selectedPlanId === mapped.id}
                  onSelect={() => setSelectedPlanId(mapped.id)}
                />
              )
            })
          ) : (
            <div className="col-span-3 text-center py-8 text-brand-muted text-sm glass-card rounded-2xl border border-brand-border/40">
              No plans found. Please check back later.
            </div>
          )}
        </div>

        {/* Signup Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>

            {/* Form body */}
            <div className="p-7 md:p-8">
              <div className="mb-6">
                <h3 className="font-display font-bold text-white text-xl">Tenant sign up</h3>
                <p className="text-sm text-brand-muted mt-1">
                  Join an existing Gridlett-enabled property using your property code.
                </p>
              </div>
              <TenantSignupForm
                selectedPlanId={selectedPlanId}
                setSelectedPlanId={setSelectedPlanId}
                plans={plans}
              />
            </div>
          </div>

          {/* Trust footer */}
          <p className="text-center text-xs text-brand-muted mt-5 flex items-center justify-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-emerald-500" />
            No payment due at signup. Activation handled by your property partner.
          </p>
        </div>
      </div>
    </section>
  )
}
