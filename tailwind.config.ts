import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#283f13',
        background: '#e0d1b8',
        'background-gradient-start': '#e0d1b8',
        'background-gradient-end': '#ecd4ad',
        'text-foreground': colors.gray[800],
        'text-background': colors.gray[600]
      }
    }
  },

  plugins: [typography]
} satisfies Config
