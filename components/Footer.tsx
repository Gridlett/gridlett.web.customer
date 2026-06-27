'use client'

import { Zap, Mail, MessageSquare, Shield, ExternalLink, Linkedin, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'X' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  const productLinks = [
    { label: 'How it Works', href: '/#how-it-works' },
  ]

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers', badge: 'Hiring' },
    { label: 'Contact Us', href: '/contact' },
  ]

  const trustLinks = [
    { label: 'FAQs', href: '/faq' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ]

  return (
    <footer className="relative z-10 border-t border-brand-border/60 bg-brand-navy/60 backdrop-blur-md pt-16 pb-10 px-6">
      {/* Decorative background orb */}
      <div className="absolute bottom-0 right-10 w-96 h-96 orb-emerald pointer-events-none -z-10 opacity-30" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-12">
          {/* Column 1: Brand Intro */}
          <div className="col-span-2 md:col-span-2 space-y-4 pr-0 md:pr-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div
                className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #22c55e, #10b981)',
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                gridlett
              </span>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed">
              Gridlett is a structured electricity access system delivering reliable, solar power to homes and businesses across Nigeria. We keep the grid stable and usage fair.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-brand-border/40 text-brand-text hover:text-white hover:bg-brand-border transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2: Products & Tech */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-brand-text hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-brand-text hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {link.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {trustLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-brand-text hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Column 5: Contact / Address */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-brand-muted">
            <a
              href="mailto:operations@gridlett.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              operations@gridlett.com
            </a>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Operating in Nigeria
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5">
            <p className="text-xs text-brand-muted text-center md:text-right">
              © {currentYear} Gridlett. All rights reserved.
            </p>
            <p className="text-[11px] text-brand-muted/80 flex items-center gap-1">
              Powered by <a href="https://gridlett.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-emerald-400 transition-colors">GridLett</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
