import SignupSection from '@/components/SignupSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create Account - Gridlett',
  description: 'Select your power plan tier and register to request electricity access.',
}

export default function RegisterPage() {
  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Radial glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      <Header />

      <div className="pt-32 pb-20 flex-1 relative z-10">
        <Suspense fallback={
          <div className="text-center py-20 text-brand-muted text-sm animate-pulse">
            Loading registration details...
          </div>
        }>
          <SignupSection />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
