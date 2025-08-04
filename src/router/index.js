import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件（类似iOS的ViewController）
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Transfer from '../views/Transfer.vue'
import Cards from '../views/Cards.vue'
import Wealth from '../views/Wealth.vue'
import Life from '../views/Life.vue'
import InterpolationDemo from '../views/InterpolationDemo.vue'
import RefDemo from '../views/RefDemo.vue'
import StyleDemo from '../views/StyleDemo.vue'
import TemplateVsScript from '../views/TemplateVsScript.vue'
import ComponentDemo from '../views/ComponentDemo.vue'
import ComputedVsMethod from '../views/ComputedVsMethod.vue'
import LifecycleDemo from '../views/LifecycleDemo.vue'
import RenderDemo from '../views/RenderDemo.vue'
import ProxyDemo from '../views/ProxyDemo.vue'
import VueProxyDemo from '../views/VueProxyDemo.vue'
import PromiseDemo from '../views/PromiseDemo.vue'

const routes = [
  {
    path: '/',
    redirect: '/login' // 默认跳转到登录页
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards
  },
  {
    path: '/wealth',
    name: 'Wealth',
    component: Wealth
  },
  {
    path: '/life',
    name: 'Life',
    component: Life
  },
  {
    path: '/computed-demo',
    name: 'ComputedDemo',
    component: ComputedVsMethod
  },
  {
    path: '/lifecycle-demo',
    name: 'LifecycleDemo',
    component: LifecycleDemo
  },
  {
    path: '/render-demo',
    name: 'RenderDemo',
    component: RenderDemo
  },
  {
    path: '/component-demo',
    name: 'ComponentDemo',
    component: ComponentDemo
  },
  {
    path: '/proxy-demo',
    name: 'ProxyDemo',
    component: ProxyDemo
  },
  {
    path: '/vue-proxy-demo',
    name: 'VueProxyDemo',
    component: VueProxyDemo
  },
  {
    path: '/promise-demo',
    name: 'PromiseDemo',
    component: PromiseDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router