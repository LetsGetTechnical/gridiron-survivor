// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    darkMode: 'selector',
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        outline: 'hsl(var(--outline))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        error: 'hsl(var(--error))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        chart1: 'hsl(var(--chart1))',
        chart2: 'hsl(var(--chart2))',
        chart3: 'hsl(var(--chart3))',
        chart4: 'hsl(var(--chart4))',
        chart5: 'hsl(var(--chart5))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          muted: 'hsl(var(--primary-muted))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          muted: 'hsl(var(--secondary-muted))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      gridTemplateColumns: {
        'adminLayout': '16rem auto',
      },
      gridTemplateRows: {
        'adminLayout': '5rem auto',
      },
      screens: {
        'xs': '400px'
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
