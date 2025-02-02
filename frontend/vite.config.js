import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react(),   nodePolyfills({
    include: ['crypto', 'process', 'stream', 'util'],
    globals: { global: true, process: true },
  }),],
  resolve: {
    alias: {
      '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
      "@": path.resolve(__dirname, "./src"),

    },
  },
  optimizeDeps: {
    include: [
      '@tailwindConfig',
      
    ],
    exclude: ['js-big-decimal']
  }, 
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
