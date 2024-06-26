import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'

// https://vitejs.dev/config/
const CHROME_VERSION = 120

const cspMate = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const htmlPlugin: () => PluginOption = () => {
  return {
    name: 'html-transform',
    apply: 'build',
    transformIndexHtml(html: string) {
      return html.replace(/<title>/, `${cspMate}\n\t\t<title>`)
    },
  }
}

export default defineConfig({
  root: path.join(__dirname, 'src'),
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    target: `chrome${CHROME_VERSION}`,
    outDir: path.join(__dirname, 'dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(__dirname, 'src/index.html'),
        player: path.join(__dirname, 'src/player.html'),
      },
    },
  },
})
