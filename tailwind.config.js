/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00ff41',
        'terminal-green-dim': '#00cc33',
        'terminal-bg': '#0a0a0a',
        'terminal-surface': '#111111',
        'terminal-border': '#1a1a1a',
        'terminal-muted': '#333333',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 4px #00ff41, 0 0 8px #00ff4140' },
          '50%': { boxShadow: '0 0 12px #00ff41, 0 0 24px #00ff4160' },
        },
        terminalLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.4s ease-out forwards',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        drawLine: 'drawLine 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
