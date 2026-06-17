'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Mail, MessageSquare, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import emailjs from '@emailjs/browser'


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Resident',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMsg('')

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please fill in all required fields.')
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS is not fully configured in environment variables.')
      setErrorMsg('Email sending is not configured yet. Please configure the required environment variables.')
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      // Send form data via EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          role: formData.role,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'No Subject',
          message: formData.message,
        },
        publicKey
      )
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Resident',
        subject: '',
        message: '',
      })
    } catch (err) {
      console.error('EmailJS Submission Error:', err)
      setErrorMsg('Failed to send message. Please try again or email operations@gridlett.com.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
            <MessageSquare className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            Get in touch
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Contact <span className="text-gradient-emerald">Operations</span>
          </h1>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Have questions about shared solar grids or need assistance with your subscription? Send us a message.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Quick Info Sidebar */}
          <div className="col-span-2 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Direct Channels</h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              We operate across Nigeria, bringing stable solar power directly to estates, properties, and commercial hubs. Feel free to contact our operational representatives directly.
            </p>

            <div className="space-y-4 pt-4">
              {/* Email Card */}
              <div className="glass-card rounded-2xl p-5 border border-brand-border/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Operations Email</h4>
                  <a href="mailto:operations@gridlett.com" className="text-sm text-brand-text hover:text-blue-400 transition-colors">
                    operations@gridlett.com
                  </a>
                </div>
              </div>

              {/* Status/Coverage Card */}
              <div className="glass-card rounded-2xl p-5 border border-brand-border/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Operational Coverage</h4>
                  <p className="text-sm text-brand-text">
                    Active solar grids across Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="col-span-3">
            <div className="glass-card rounded-3xl overflow-hidden p-6 md:p-8 border border-brand-border/60"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)', background: 'linear-gradient(135deg, rgba(21, 30, 46, 0.8), rgba(13, 21, 37, 0.9))' }}>
              
              <h3 className="font-display font-semibold text-white text-lg mb-6">Send an Inquiry</h3>

              {/* Alert Feedback */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Your inquiry was submitted successfully! Our operations team will reach out to you via email or WhatsApp.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl text-sm bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="field-label">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tunde Alao"
                      className="field-input"
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="field-label">I am a *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="field-input"
                      style={{ appearance: 'none' }}
                    >
                      <option value="Resident">Resident / Tenant</option>
                      <option value="Property Manager">Property Manager / Landlord</option>
                      <option value="Solar Vendor">Solar Vendor / Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="field-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="field-input"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="field-label">WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 08012345678"
                      className="field-input"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="field-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Smart controller installation info"
                    className="field-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="field-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can our operations team help you?"
                    className="field-input resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Inquiry…
                    </>
                  ) : (
                    'Submit Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
