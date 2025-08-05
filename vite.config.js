import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          vant: ['vant']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Proxy配置示例
    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true, // 改变请求头中的origin字段
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，去掉/api前缀
      },
      // 代理银行API请求
      '/bank-api': {
        target: 'https://api.bank.example.com',
        changeOrigin: true,
        secure: true, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/bank-api/, '/v1')
      },
      // 代理用户认证相关请求
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      // 代理WebSocket连接
      '/socket.io': {
        target: 'ws://localhost:8080',
        ws: true, // 启用websocket代理
        changeOrigin: true
      }
    }
  }
})