'use client'

import { useState, useEffect } from 'react'
import { Zap, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3000'

  const navLinks = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'About Us', href: '/about' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-black/80 backdrop-blur-lg border-b border-brand-border/60 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #10b981)',
                boxShadow: '0 0 16px rgba(34,197,94,0.3)',
              }}
            >
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              gridlett
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-brand-muted font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`hover:text-white transition-colors relative py-1 ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={`${portalUrl}/login`}
              className="text-sm font-semibold text-brand-muted hover:text-white transition-colors"
            >
              Login
            </a>
            <Link
              href="/register"
              className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-xl text-white font-display"
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
              }}
            >
              Get access
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-text hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-black/98 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 orb-blue pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 orb-emerald pointer-events-none -z-10" />

            <div className="flex flex-col gap-6">
              <nav className="flex flex-col gap-4 text-lg font-display font-semibold">
                {navLinks.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.label}
                  >
                    <Link
                      href={link.href}
                      className="text-brand-text hover:text-white transition-colors block py-2 border-b border-brand-border/40"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              <a
                href={`${portalUrl}/login`}
                className="w-full text-center py-4 rounded-2xl font-semibold border border-brand-border text-brand-text hover:text-white transition-colors"
              >
                Login to Portal
              </a>
              <Link
                href="/register"
                className="w-full text-center py-4 rounded-2xl font-bold text-white font-display"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                  boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                }}
              >
                Get access
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
