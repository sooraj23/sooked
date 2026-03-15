import { useEffect, useRef } from 'react'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    slug: 'starter',
    price: '£9',
    period: '/mo',
    tagline: '// plan_starter',
    description: 'Perfect for small sites and personal projects.',
    features: [
      '1 website',
      '5GB storage',
      'Free SSL certificate',
      'Email support',
      '99.5% uptime SLA',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    slug: 'pro',
    price: '£29',
    period: '/mo',
    tagline: '// plan_pro',
    description: 'For growing businesses that need more power.',
    features: [
      '5 websites',
      '50GB storage',
      'Global CDN',
      'Priority support',
      'Daily backups',
      '99.9% uptime SLA',
    ],
    cta: 'Start Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    price: '£99',
    period: '/mo',
    tagline: '// plan_enterprise',
    description: 'Dedicated infrastructure for serious scale.',
    features: [
      'Unlimited websites',
      '500GB storage',
      'Dedicated server',
      '24/7 SLA support',
      'White-label option',
      'Custom integrations',
    ],
    cta: 'Contact Us',
    featured: false,
  },
]

function PricingCard({
  plan,
  delay,
}: {
  plan: (typeof plans)[0]
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
      className={`relative terminal-card rounded-lg overflow-hidden border ${
        plan.featured
          ? 'border-terminal-green shadow-[0_0_0_1px_#00ff41,0_0_40px_rgba(0,255,65,0.15)]'
          : 'border-terminal-border bg-terminal-surface'
      }`}
      style={{ background: plan.featured ? '#0f1a0f' : undefined }}
    >
      {/* Most Popular badge */}
      {plan.featured && (
        <div className="absolute top-0 right-0 flex items-center gap-1 bg-terminal-green text-terminal-bg font-mono text-xs font-bold px-3 py-1 rounded-bl-lg">
          <Zap size={10} />
          Most Popular
        </div>
      )}

      {/* Title bar */}
      <div
        className={`flex items-center gap-2 px-4 py-3 border-b ${
          plan.featured
            ? 'bg-[#0a1a0a] border-terminal-green/30'
            : 'bg-[#161616] border-terminal-border'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span
          className={`ml-2 font-mono text-xs tracking-widest ${
            plan.featured ? 'text-terminal-green' : 'text-gray-500'
          }`}
        >
          {plan.tagline}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6 space-y-6">
        {/* Plan name */}
        <div>
          <h3 className="font-mono text-sm text-gray-400">{plan.name}</h3>
          <div className="flex items-end gap-1 mt-1">
            <span
              className={`font-mono text-5xl font-bold ${
                plan.featured ? 'text-terminal-green glow-green' : 'text-white'
              }`}
            >
              {plan.price}
            </span>
            <span className="font-mono text-gray-500 mb-2">{plan.period}</span>
          </div>
          <p className="font-sans text-xs text-gray-500 mt-1">{plan.description}</p>
        </div>

        {/* Features */}
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 font-mono text-xs text-gray-300">
              <Check
                size={13}
                className={plan.featured ? 'text-terminal-green' : 'text-gray-500'}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={`w-full font-mono text-sm py-3 rounded-sm transition-all duration-200 ${
            plan.featured
              ? 'bg-terminal-green text-terminal-bg font-semibold hover:bg-terminal-green-dim shadow-[0_0_20px_rgba(0,255,65,0.3)]'
              : 'border border-terminal-border text-gray-300 hover:border-terminal-green hover:text-terminal-green'
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  )
}

export default function Pricing() {
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
    <section id="pricing" className="py-24 px-6 bg-terminal-surface">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="font-mono text-xs text-terminal-green tracking-widest mb-3">
            // hosting_plans
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            Hosting Plans
          </h2>
          <p className="font-sans text-gray-400 mt-4 max-w-xl mx-auto text-base">
            Transparent pricing, no hidden fees. Scale up anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <PricingCard key={plan.slug} plan={plan} delay={i * 120} />
          ))}
        </div>

        <p className="font-mono text-xs text-gray-600 text-center mt-8">
          All plans include free migration · cancel anytime · 30-day money-back guarantee
        </p>
      </div>
    </section>
  )
}
