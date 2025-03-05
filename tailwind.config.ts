import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#283f13',
        background: '#ffffff',
        'text-foreground': colors.gray[800],
        'text-background': colors.gray[600]
      }
    },
    fontFamily: {
      // We ensure fonts with spaces have " " surrounding it.
      title: ['"DM Serif Text"', 'sans-serif'],
      body: ['"DM Sans"', 'serif']
    }
  },

  plugins: [typography]
} satisfies Config
