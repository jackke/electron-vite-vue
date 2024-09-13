import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    vue(),
  ],
  server: {
    port: 8088,
    host: '0.0.0.0',
  },
  devServer: {
    proxy: {  
      '/api': {  
        target: 'http://locahost:8088',  
        changeOrigin: true,  
        pathRewrite: { '^/api': '' }  
      }  
    }  
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
