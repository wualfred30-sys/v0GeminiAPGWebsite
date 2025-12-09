/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: "class",
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        'aviation-red': '#E53935',
        'slate-navy': '#212A36',
        'accent-gold': '#D97706',
        'sky-light': '#F8FAFC',
        'runway-gray': '#1E293B',
        'alt-muted': '#64748B',
        
        // Chronicle HQ grayscale system
        'solid-1': '#050505',
        'solid-2': '#151515',
        'solid-3': '#212121',
        'solid-4': '#292929',
        'solid-5': '#2f2f2f',
        'solid-6': '#3a3a3a',
        'solid-7': '#484848',
        'solid-8': '#606060',
        'solid-9': '#666666',
        'solid-10': '#a3a3a3',
        'solid-11': '#b3b3b3',
        'solid-12': '#f3f3f3',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'tighter': '-0.04em',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        76: '19rem',
      },
      boxShadow: {
        'card-soft': '0 10px 40px -15px rgba(15, 23, 42, 0.35)',
        'card-lift': '0 25px 50px -12px rgba(15, 23, 42, 0.45)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [],
};
export default config;
