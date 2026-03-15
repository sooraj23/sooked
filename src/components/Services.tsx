import { useEffect, useRef } from 'react'
import { Code2, ServerCog, Wrench } from 'lucide-react'

const services = [
  {
    id: '01',
    icon: Code2,
    title: 'Web Development',
    tagline: '// web_development',
    description:
      'Custom websites and web applications built with modern frameworks. React, Next.js, full-stack solutions — engineered for performance.',
    features: [
      'React / Next.js applications',
      'Full-stack web solutions',
      'Custom CMS integrations',
      'Performance optimisation',
      'API design & development',
    ],
  },
  {
    id: '02',
    icon: ServerCog,
    title: 'Hosting & Deployment',
    tagline: '// hosting_deployment',
    description:
      'Managed cloud hosting with automated CI/CD pipelines, SSL certificates, global CDN, and real-time uptime monitoring.',
    features: [
      'Managed cloud infrastructure',
      'CI/CD pipeline setup',
      'SSL & domain management',
      'Uptime & health monitoring',
      'Auto-scaling & CDN',
    ],
  },
  {
    id: '03',
    icon: Wrench,
    title: 'Maintenance & Support',
    tagline: '// maintenance_support',
    description:
      'Ongoing technical support to keep your site fast, secure and up to date — so you can focus on your business.',
    features: [
      'Proactive security updates',
      'Performance audits',
      'Content updates & changes',
      'Monthly reporting',
      'Priority bug resolution',
    ],
  },
]

function ServiceCard({
  service,
  delay,
}: {
  service: (typeof services)[0]
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

  const Icon = service.icon

  return (
    <div
      ref={ref}
      className="terminal-card border border-terminal-border bg-terminal-surface rounded-lg overflow-hidden"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-terminal-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-terminal-green tracking-widest">
          {service.tagline}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 border border-terminal-border bg-terminal-muted/30 rounded-sm">
            <Icon size={20} className="text-terminal-green" />
          </div>
          <div>
            <p className="font-mono text-xs text-gray-500 mb-0.5">service_{service.id}</p>
            <h3 className="font-mono text-lg font-semibold text-white">{service.title}</h3>
          </div>
        </div>

        <p className="font-sans text-sm text-gray-400 leading-relaxed">{service.description}</p>

        <ul className="space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 font-mono text-xs text-gray-400">
              <span className="text-terminal-green">·</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Services() {
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
    <section id="services" className="py-24 px-6 bg-terminal-bg">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="font-mono text-xs text-terminal-green tracking-widest mb-3">
            // what_we_do
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            What We Do
          </h2>
          <p className="font-sans text-gray-400 mt-4 max-w-xl mx-auto text-base">
            End-to-end digital solutions — from blank canvas to live,
            production-ready product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
