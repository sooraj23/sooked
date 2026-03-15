import { Terminal, Github, Twitter, Linkedin } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter/X' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-terminal-surface border-t border-terminal-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-terminal-green font-bold text-xl">
              <Terminal size={18} />
              sooked
              <span className="cursor-blip" />
            </div>
            <p className="font-sans text-sm text-gray-500 max-w-xs">
              Web development &amp; hosting — engineered for growth.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-mono text-xs text-gray-500 hover:text-terminal-green transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-600 hover:text-terminal-green transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-terminal-border" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8">
          <p className="font-mono text-xs text-gray-600">
            © {new Date().getFullYear()} sooked.com — All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-mono text-xs text-gray-600">
            <span className="text-terminal-green">$</span>
            <span>status: ONLINE</span>
            <span className="cursor-blip opacity-50 ml-1" />
          </div>
          <div className="flex gap-4">
            <a href="#" className="font-mono text-xs text-gray-600 hover:text-terminal-green transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-gray-600 hover:text-terminal-green transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
