import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 引入Vant组件库（类似iOS的UIKit）
import Vant from 'vant'
import 'vant/lib/index.css'

// 在桌面端使用触摸模拟器
import '@vant/touch-emulator'

const app = createApp(App)

// 使用插件
app.use(createPinia()) // 状态管理，类似iOS的UserDefaults但更强大
app.use(router)        // 路由管理，类似iOS的Navigation Controller
app.use(Vant)         // UI组件库

app.mount('#app')