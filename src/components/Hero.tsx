import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Server } from 'lucide-react'

const TERMINAL_LINES = [
  { text: '$ initializing sooked.com...', delay: 0, color: 'text-terminal-green' },
  { text: '$ loading web_dev_services... [OK]', delay: 800, color: 'text-gray-300' },
  { text: '$ loading hosting_plans... [OK]', delay: 1600, color: 'text-gray-300' },
  { text: '$ deploying your_dream_website... [OK]', delay: 2400, color: 'text-gray-300' },
  { text: '$ status: ONLINE ✓', delay: 3400, color: 'text-terminal-green' },
]

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typingLine, setTypingLine] = useState<number | null>(null)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setTypingLine(i)
        setTypedText('')
        let charIndex = 0
        const typeInterval = setInterval(() => {
          charIndex++
          setTypedText(line.text.slice(0, charIndex))
          if (charIndex >= line.text.length) {
            clearInterval(typeInterval)
            setVisibleLines((prev) => [...prev, i])
            setTypingLine(null)
          }
        }, 28)
      }, line.delay)
    })
  }, [])

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg border border-terminal-border bg-terminal-surface shadow-2xl shadow-black/60 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-terminal-border">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-gray-500 tracking-widest">
          sooked — terminal
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[180px] font-mono text-sm space-y-2">
        {TERMINAL_LINES.map((line, i) => {
          if (visibleLines.includes(i)) {
            return (
              <p key={i} className={`${line.color} leading-relaxed`}>
                {line.text}
              </p>
            )
          }
          if (typingLine === i) {
            return (
              <p key={i} className={`${line.color} leading-relaxed`}>
                {typedText}
                <span className="inline-block w-2 h-4 bg-terminal-green ml-0.5 animate-blink align-middle" />
              </p>
            )
          }
          return null
        })}
        {typingLine === null && visibleLines.length === TERMINAL_LINES.length && (
          <p className="text-terminal-green">
            <span className="inline-block w-2 h-4 bg-terminal-green animate-blink align-middle" />
          </p>
        )}
      </div>
    </div>
  )
}

/* Floating blips scattered in the background */
function BackgroundBlips() {
  const blips = [
    { top: '15%', left: '8%', delay: '0s' },
    { top: '25%', left: '92%', delay: '0.5s' },
    { top: '60%', left: '5%', delay: '1s' },
    { top: '75%', left: '88%', delay: '0.3s' },
    { top: '40%', left: '95%', delay: '1.5s' },
    { top: '80%', left: '12%', delay: '0.8s' },
    { top: '10%', left: '50%', delay: '2s' },
    { top: '90%', left: '60%', delay: '0.2s' },
  ]

  return (
    <>
      {blips.map((b, i) => (
        <span
          key={i}
          className="absolute cursor-blip"
          style={{ top: b.top, left: b.left, animationDelay: b.delay, opacity: 0.2 }}
        />
      ))}
    </>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg scanline-overlay pt-16"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,65,0.04) 0%, transparent 70%)'
      }} />

      {/* Blips */}
      <BackgroundBlips />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-terminal-border bg-terminal-surface px-3 py-1.5 rounded-full">
          <Server size={12} className="text-terminal-green" />
          <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">
            web dev &amp; hosting agency
          </span>
        </div>

        {/* Terminal window */}
        <div style={{ animation: 'fadeUp 0.7s ease-out 0.1s both' }}>
          <TerminalWindow />
        </div>

        {/* Headline */}
        <div style={{ animation: 'fadeUp 0.7s ease-out 0.4s both' }}>
          <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white">We Build.</span>{' '}
            <span className="text-white">We Deploy.</span>{' '}
            <br />
            <span className="text-terminal-green glow-green">We Dominate.</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div style={{ animation: 'fadeUp 0.7s ease-out 0.6s both' }}>
          <p className="font-sans text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From concept to deployment — we craft high-performance websites and
            keep them running at peak speed. Your digital presence, engineered
            for growth.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.7s ease-out 0.8s both' }}
        >
          <button
            onClick={() => scrollTo('#cta')}
            className="group flex items-center gap-2 font-mono text-sm px-6 py-3 bg-terminal-green text-terminal-bg font-semibold hover:bg-terminal-green-dim transition-all duration-200 rounded-sm shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_32px_rgba(0,255,65,0.5)]"
          >
            Start a Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#pricing')}
            className="font-mono text-sm px-6 py-3 border border-terminal-border text-gray-300 hover:border-terminal-green hover:text-terminal-green transition-all duration-200 rounded-sm"
          >
            View Pricing
          </button>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 pt-4"
          style={{ animation: 'fadeUp 0.7s ease-out 1s both' }}
        >
          {[
            { value: '50+', label: 'projects shipped' },
            { value: '99.9%', label: 'uptime SLA' },
            { value: '24h', label: 'avg. response' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl font-bold text-terminal-green">{stat.value}</div>
              <div className="font-mono text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs text-gray-500">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-terminal-green to-transparent" />
      </div>
    </section>
  )
}
