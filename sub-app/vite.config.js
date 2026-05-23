import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081, // 子应用端口
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*' // 允许跨域访问（qiankun 需要）
    },
    // 关键：设置 origin 为 localhost:8081
    origin: 'http://localhost:8081',
    // 启用 HMR
    hmr: true
  },
  plugins: [
    qiankun('sub-app', {
      useDevMode: true // 启用开发模式
    })
  ]
})
