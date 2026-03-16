import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import ('./mock')
// 引入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

const pinia=createPinia()


app.use(ElementPlus)
app.use(pinia)

app.use(Router)
app.mount('#app')
