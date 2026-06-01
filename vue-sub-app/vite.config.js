import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';

export default defineConfig({
  server: {
    port: 8083,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    origin: 'http://localhost:8083'
  },
  plugins: [
    vue(),
    qiankun('vue-sub-app', {
      useDevMode: true
    })
  ]
});
