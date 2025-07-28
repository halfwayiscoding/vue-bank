import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件（类似iOS的ViewController）
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Transfer from '../views/Transfer.vue'
import Cards from '../views/Cards.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router