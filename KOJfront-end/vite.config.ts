import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入node提供内置模块path：可以获取绝对路径
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      useSource: true
    })
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  }
})
