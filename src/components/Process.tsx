import { useEffect, useRef, useState } from 'react'
import { FileText, Paintbrush, Hammer, Rocket } from 'lucide-react'

const steps = [
  {
    id: '01',
    slug: '01_brief',
    icon: FileText,
    title: 'Brief',
    description: 'We kick off with a discovery session — understanding your goals, audience, and technical requirements.',
  },
  {
    id: '02',
    slug: '02_design',
    icon: Paintbrush,
    title: 'Design',
    description: 'Wireframes and high-fidelity designs crafted with your brand. Approved by you before a single line of code is written.',
  },
  {
    id: '03',
    slug: '03_build',
    icon: Hammer,
    title: 'Build',
    description: 'Clean, performant code built with modern frameworks. Regular check-ins and a staging environment throughout.',
  },
  {
    id: '04',
    slug: '04_deploy',
    icon: Rocket,
    title: 'Deploy',
    description: 'Zero-downtime deployment, CI/CD pipeline, monitoring configured. You go live — we stay on call.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true)
          if (lineRef.current) {
            lineRef.current.classList.add('animated')
          }
          // Stagger card animations
          cardRefs.current.forEach((card, i) => {
            if (!card) return
            setTimeout(() => {
              card.classList.remove('fade-up-hidden')
              card.classList.add('fade-up-visible')
            }, i * 180)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animated])

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) card.classList.add('fade-up-hidden')
    })
  }, [])

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
    <section id="process" className="py-24 px-6 bg-terminal-bg" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="font-mono text-xs text-terminal-green tracking-widest mb-3">
            // the_process
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            The Process
          </h2>
          <p className="font-sans text-gray-400 mt-4 max-w-xl mx-auto text-base">
            A transparent pipeline from first conversation to production launch.
          </p>
        </div>

        {/* Desktop pipeline */}
        <div className="hidden md:block">
          {/* Connecting line */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-px bg-terminal-muted -translate-y-1/2" />
            <div
              ref={lineRef}
              className="process-line absolute top-1/2 left-[12.5%] h-px bg-terminal-green -translate-y-1/2 shadow-[0_0_8px_#00ff41]"
            />
            {/* Arrow heads */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 text-terminal-green font-mono text-sm"
                style={{ left: `${33.33 * (i + 1) - 1}%` }}
              >
                →
              </div>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className="terminal-card border border-terminal-border bg-terminal-surface rounded-lg overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161616] border-b border-terminal-border">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-1 font-mono text-xs text-terminal-green">{step.slug}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="p-2 border border-terminal-border bg-terminal-muted/20 rounded-sm w-fit">
                      <Icon size={18} className="text-terminal-green" />
                    </div>
                    <h3 className="font-mono text-base font-semibold text-white">{step.title}</h3>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile vertical list */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex gap-4">
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div className="p-2 border border-terminal-green bg-terminal-surface rounded-sm">
                    <Icon size={16} className="text-terminal-green" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-terminal-border mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-mono text-xs text-terminal-green mb-1">{step.slug}</p>
                  <h3 className="font-mono text-base font-semibold text-white">{step.title}</h3>
                  <p className="font-sans text-sm text-gray-400 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
