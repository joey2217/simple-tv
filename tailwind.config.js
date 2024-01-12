/* eslint-disable import/no-anonymous-default-export */
import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/**/*.{jsx,tsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
