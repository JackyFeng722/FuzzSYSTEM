import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
import Inspector from "vite-plugin-vue-inspector"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
    reactivityTransform:true, //方便解包 $ref(0), 后面不需要手写.value
  }),
   Inspector({   
    })],
  //前端解决跨域问题
  server:{
    port:3000,
    proxy:{
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo

      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws:true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),//前端地址替换成后端地址
      },
    }
  },
 

})
