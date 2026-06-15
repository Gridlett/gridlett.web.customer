'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, Loader2, ArrowLeft, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import OTPInput from '@/components/OTPInput'

function VerifyWhatsAppContent() {
  const searchParams = useSearchParams()
  const phone = searchParams?.get('phone') || ''

  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendTimer, setResendTimer] = useState(180) // 3 minutes
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<string | null>(null)

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendTimer])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (code.length !== 6 || isVerifying) return

    setIsVerifying(true)
    setErrorMsg(null)
    setResendStatus(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
      const res = await fetch(`${baseUrl}/v1/Auth/Verify-Otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          code: parseInt(code, 10),
        }),
      })

      const respData = await res.json().catch(() => ({}))
      if (!res.ok || respData.status === false) {
        throw new Error(respData.message || 'Verification failed. Please double check the code.')
      }

      // Successful verification returns accessToken
      const accessToken = respData.data?.accessToken
      if (!accessToken) {
        throw new Error('Access token not received. Please log in manually on the portal.')
      }

      // Redirect to portal login link page
      const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3000'
      window.location.href = `${portalUrl}/login-link?access-data=${encodeURIComponent(accessToken)}`
    } catch (err: any) {
      setErrorMsg(err.message)
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return

    setIsResending(true)
    setErrorMsg(null)
    setResendStatus(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
      const res = await fetch(`${baseUrl}/v1/Onboarding/Send-Otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })

      const respData = await res.json().catch(() => ({}))
      if (!res.ok || respData.status === false) {
        throw new Error(respData.message || 'Failed to resend code. Please try again.')
      }

      setResendStatus('Verification code resent successfully!')
      setResendTimer(180) // Reset to 3 minutes
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setIsResending(false)
    }
  }

  // Auto-verify when 6 digits are typed
  useEffect(() => {
    if (code.length === 6) {
      handleVerify()
    }
  }, [code])

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 orb-blue pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-1/4 right-0 w-80 h-80 orb-emerald pointer-events-none translate-x-1/3" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #22c55e)', boxShadow: '0 0 16px rgba(59,130,246,0.4)' }}>
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">gridlett</span>
        </Link>
      </nav>

      {/* Form Container */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="glass-card rounded-3xl overflow-hidden p-8"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white">Verify your Account</h2>
              <p className="text-sm text-brand-muted mt-2">
                Enter the 6-digit verification code sent to your WhatsApp <span className="text-white font-semibold">{phone}</span>.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-5 p-4 rounded-xl text-sm bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {resendStatus && (
              <div className="mb-5 p-4 rounded-xl text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{resendStatus}</span>
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <OTPInput
                  value={code}
                  onChange={setCode}
                  disabled={isVerifying}
                />
              </div>

              <button
                type="submit"
                disabled={code.length !== 6 || isVerifying}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  'Verify & Log In'
                )}
              </button>
            </form>

            {/* Resend and Actions */}
            <div className="mt-6 text-center space-y-4">
              {resendTimer > 0 ? (
                <p className="text-xs text-brand-muted">
                  Resend code in <span className="text-blue-400 font-mono font-bold">{formatTimer(resendTimer)}</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors focus:outline-none disabled:opacity-50"
                >
                  {isResending ? 'Resending code...' : 'Resend verification code'}
                </button>
              )}

              <div className="pt-2 border-t border-brand-border/40">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-brand-muted hover:text-white transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Signup
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-brand-border/50 py-6 px-6 w-full max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-xs text-brand-muted">© {new Date().getFullYear()} Gridlett.</span>
        <span className="text-xs text-brand-muted">Lagos, Nigeria</span>
      </footer>
    </main>
  )
}

export default function VerifyWhatsAppPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    }>
      <VerifyWhatsAppContent />
    </Suspense>
  )
}
