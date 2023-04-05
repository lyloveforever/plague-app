import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path' // 需安装此模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {  // 这里就是需要配置resolve里的别名
      "@": path.join(__dirname, "./src"), // path记得引入
      // 'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
  },
  server: {
    proxy: {
      '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'http://localhost:3000', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        ws: true,  // 允许websocket代理
		// 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => { console.log(11111111111) 
          return path.replace(/^\/api/, '')}
      }
     },
  },
});

