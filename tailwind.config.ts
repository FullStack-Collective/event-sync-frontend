import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffc600',
        'secondary': '#0088ff',
        'accent': '#ff005d',
        'background': '#193549',
        'foreground': '#ffffff',
        'surface': '#15232d',
        'border': '#FFFFFF1A',
        'muted': '#FFFFFF66',
        
        'palette-1': '#ffc600',
        'palette-2': '#0088ff',
        'palette-3': '#ff005d',
        'palette-4': '#ffffff',
        'palette-5': '#193549',
        'palette-6': '#15232d',
        
        'primary-50': '#fff9e6',
        'primary-100': '#fff0cc',
        'primary-200': '#ffe199',
        'primary-300': '#ffd266',
        'primary-400': '#ffc33',
        'primary-500': '#ffc600',
        'primary-600': '#e6b200',
        'primary-700': '#cc9e00',
        'primary-800': '#b38b00',
        'primary-900': '#997700',
        
        'secondary-50': '#e6f3ff',
        'secondary-100': '#cce7ff',
        'secondary-200': '#99ceff',
        'secondary-300': '#66b6ff',
        'secondary-400': '#339dff',
        'secondary-500': '#0088ff',
        'secondary-600': '#0070cc',
        'secondary-700': '#005899',
        'secondary-800': '#004066',
        'secondary-900': '#002833',
        
        'accent-50': '#ffe6f0',
        'accent-100': '#ffcce1',
        'accent-200': '#ff99c2',
        'accent-300': '#ff66a3',
        'accent-400': '#ff3385',
        'accent-500': '#ff005d',
        'accent-600': '#cc004a',
        'accent-700': '#990037',
        'accent-800': '#660024',
        'accent-900': '#330012',
        
        'bg-dark': '#193549',
        'bg-darker': '#15232d',
        'bg-card': '#1f3d52',
        
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
        
        'gradient-start': '#ffc600',
        'gradient-end': '#ff005d',
      },
      
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255,198,0,0.5)' },
          '50%': { textShadow: '0 0 20px rgba(255,198,0,0.8)' },
        },
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ffc600 0%, #ff005d 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0088ff 0%, #ffc600 100%)',
        'gradient-dark': 'linear-gradient(135deg, #193549 0%, #15232d 100%)',
        'hero-pattern': 'radial-gradient(circle at 0% 0%, #ffc60010 0%, transparent 50%)',
      },
      
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255,198,0,0.3)',
        'glow-md': '0 0 20px rgba(255,198,0,0.4)',
        'glow-lg': '0 0 30px rgba(255,198,0,0.5)',
        'card': '0 10px 40px rgba(0,0,0,0.2)',
        'card-hover': '0 20px 50px rgba(0,0,0,0.3)',
      },
      
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        'xxs': '0.625rem',
        '2.5xl': '1.75rem',
        '3.5xl': '2rem',
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      
      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;