import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080, // 主应用端口
    cors: true,
    open: true
  }
})
