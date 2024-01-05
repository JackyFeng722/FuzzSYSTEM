import { createApp } from 'vue/dist/vue.esm-bundler';
// import './style.css'
 //引入路由
import router from './router';
 
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './style.css'
import App from './App.vue';
//页面调试
import setupLocatorUI from "@locator/runtime";
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
if (process.env.NODE_ENV === "development") {
  setupLocatorUI({
    adapter: "vue",
  });
}

//创建根组件
// import app from '../app';
 
const app=createApp(App)
 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
//创建应用----挂载到页面
const vm = app.use(ElementPlus,{locale}).mount('#root') //先路由后挂载

//将vm设置为全局变量
// window.vm= vm
 