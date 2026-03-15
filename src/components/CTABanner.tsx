import { useEffect, useRef } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('fade-up-hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('fade-up-hidden')
          el.classList.add('fade-up-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cta"
      className="relative py-32 px-6 bg-terminal-bg overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,65,0.06) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <p className="font-mono text-xs text-terminal-green tracking-widest">
          // ready_to_launch
        </p>

        <h2 className="font-mono text-4xl md:text-6xl font-bold text-white leading-[1.1]">
          Ready to{' '}
          <span className="text-terminal-green glow-green">go live?</span>
        </h2>

        <p className="font-sans text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          Tell us about your project. We&apos;ll get back to you within 24 hours
          with a plan, a price, and a timeline.
        </p>

        {/* Email display */}
        <div className="inline-flex items-center gap-3 border border-terminal-border bg-terminal-surface px-5 py-3 rounded-sm font-mono text-sm">
          <Mail size={14} className="text-terminal-green" />
          <span className="text-gray-300">hello@sooked.com</span>
          <span className="cursor-blip opacity-60" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="mailto:hello@sooked.com"
            className="group flex items-center gap-2 font-mono text-sm px-8 py-3.5 bg-terminal-green text-terminal-bg font-semibold hover:bg-terminal-green-dim transition-all duration-200 rounded-sm shadow-[0_0_24px_rgba(0,255,65,0.35)] hover:shadow-[0_0_40px_rgba(0,255,65,0.55)]"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Terminal micro-copy */}
        <p className="font-mono text-xs text-gray-600">
          $ echo &quot;your project&quot; | sooked --deliver --on-time
        </p>
      </div>
    </section>
  )
}
