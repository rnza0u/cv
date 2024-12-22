import { type Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        background: '#141414',
        foreground: '#fefefe',
        primary: '#474747',
      },
    },
  },
  content: [
    '{routes,islands,src}/**/*.{ts,tsx,js,jsx}',
  ],
} satisfies Config
