import { defineConfig } from 'vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    // 设置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
