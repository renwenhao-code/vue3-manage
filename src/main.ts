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
