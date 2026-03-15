import { useEffect, useRef } from 'react'

const testimonials = [
  {
    timestamp: '[2024-11-15 09:32]',
    author: 'james_thornton',
    role: 'Founder @ NorthPeak Digital',
    text: 'Working with Sooked was exceptional. They delivered our entire e-commerce platform two weeks ahead of schedule, and the performance benchmarks blew our old agency out of the water. We\'ve never had a site this fast.',
  },
  {
    timestamp: '[2025-01-08 14:17]',
    author: 'priya_mehta',
    role: 'CTO @ Vaultr',
    text: 'The hosting migration was seamless — zero downtime, zero data loss. Their CI/CD setup means our team can ship daily. The monitoring dashboards they set up give us full visibility. Genuinely impressed.',
  },
  {
    timestamp: '[2025-03-02 11:04]',
    author: 'oliver_banks',
    role: 'Creative Director @ Strand Studio',
    text: 'We needed something premium and technically solid for a client launch. Sooked nailed the brief — clean code, excellent communication, and the site performs brilliantly on all devices. We use them for every project now.',
  },
]

function TestimonialCard({
  t,
  delay,
}: {
  t: (typeof testimonials)[0]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('fade-up-hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove('fade-up-hidden')
            el.classList.add('fade-up-visible')
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="border border-terminal-border bg-terminal-surface rounded-lg overflow-hidden border-l-2 border-l-terminal-green"
    >
      <div className="p-5 space-y-4">
        {/* Log timestamp header */}
        <div className="font-mono text-xs text-terminal-green opacity-70">{t.timestamp}</div>

        {/* Quote */}
        <p className="font-sans text-sm text-gray-300 leading-relaxed">
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className="border-t border-terminal-border pt-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
          <div>
            <p className="font-mono text-xs text-terminal-green">{t.author}</p>
            <p className="font-mono text-xs text-gray-500">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = titleRef.current
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
    <section id="testimonials" className="py-24 px-6 bg-terminal-surface">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="font-mono text-xs text-terminal-green tracking-widest mb-3">
            // client_logs
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            What Clients Say
          </h2>
          <p className="font-sans text-gray-400 mt-4 max-w-xl mx-auto text-base">
            Log entries from the teams we&apos;ve shipped with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} t={t} delay={i * 120} />
          ))}
        </div>

        {/* Stars row */}
        <div className="mt-12 text-center font-mono text-sm text-gray-600">
          <span className="text-terminal-green">★★★★★</span> · avg. rating across{' '}
          <span className="text-terminal-green">50+</span> projects
        </div>
      </div>
    </section>
  )
}
