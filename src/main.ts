<<<<<<< HEAD
import "../mock"; // ✅ 静态导入，确保最先执行
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import '@/assets/css/main.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import Router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const pinia = createPinia();

app.use(ElementPlus);
app.use(pinia);
app.use(Router);
app.mount("#app");
=======
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Router from './router'
import App from './App.vue'
// 引入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(ElementPlus)

app.use(Router)
app.mount('#app')
>>>>>>> c228ba488b0d9552c7761dd7e20fa58c7be002eb
