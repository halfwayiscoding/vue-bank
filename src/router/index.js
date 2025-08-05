import { createRouter, createWebHistory } from 'vue-router'
import { showToast } from 'vant'
import gesture from '../utils/gesture'
import auth from '../utils/auth'

// 导入页面组件（类似iOS的ViewController）
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Transfer from '../views/Transfer.vue'
import Cards from '../views/Cards.vue'
import Wealth from '../views/Wealth.vue'
import Life from '../views/Life.vue'
import Login from '../views/Login.vue'
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
    redirect: '/home' // 默认跳转到首页
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      isFirstLevel: true,
      title: '登录'
    }
  },

  // 权限演示页面
  {
    path: '/permission-demo',
    name: 'PermissionDemo',
    component: () => import('@/views/PermissionDemo.vue'),
    meta: {
      requiresAuth: true,
      isFirstLevel: false,
      title: '权限管理演示'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: true,
      isFirstLevel: true,
      title: '首页'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { 
      requiresAuth: true,
      isFirstLevel: true,
      title: '我的账户',
      permissions: ['user:read']
    }
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer,
    meta: { 
      requiresAuth: true,
      isFirstLevel: true,
      title: '转账汇款',
      permissions: ['user:read']
    }
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards,
    meta: { 
      requiresAuth: true,
      isFirstLevel: true,
      title: '我的卡片',
      permissions: ['user:read']
    }
  },
  {
    path: '/wealth',
    name: 'Wealth',
    component: Wealth,
    meta: { 
      requiresAuth: true,
      isFirstLevel: true,
      title: '财富管理'
    }
  },
  {
    path: '/life',
    name: 'Life',
    component: Life,
    meta: { 
      requiresAuth: true,
      isFirstLevel: true,
      title: '生活服务'
    }
  },
  {
    path: '/computed-demo',
    name: 'ComputedDemo',
    component: ComputedVsMethod,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: 'Computed演示',
      roles: ['admin'] // 仅管理员可访问
    }
  },
  {
    path: '/lifecycle-demo',
    name: 'LifecycleDemo',
    component: LifecycleDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: '生命周期演示',
      roles: ['admin']
    }
  },
  {
    path: '/render-demo',
    name: 'RenderDemo',
    component: RenderDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: '渲染演示',
      roles: ['admin']
    }
  },
  {
    path: '/component-demo',
    name: 'ComponentDemo',
    component: ComponentDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: '组件演示',
      roles: ['admin']
    }
  },
  {
    path: '/proxy-demo',
    name: 'ProxyDemo',
    component: ProxyDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: 'Proxy演示',
      roles: ['admin']
    }
  },
  {
    path: '/vue-proxy-demo',
    name: 'VueProxyDemo',
    component: VueProxyDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: 'Vue Proxy演示',
      roles: ['admin']
    }
  },
  {
    path: '/promise-demo',
    name: 'PromiseDemo',
    component: PromiseDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: 'Promise演示',
      roles: ['admin']
    }
  },
  {
    path: '/interpolation-demo',
    name: 'InterpolationDemo',
    component: InterpolationDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: '插值演示',
      roles: ['admin']
    }
  },
  {
    path: '/ref-demo',
    name: 'RefDemo',
    component: RefDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: 'Ref演示',
      roles: ['admin']
    }
  },
  {
    path: '/style-demo',
    name: 'StyleDemo',
    component: StyleDemo,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: '样式演示',
      roles: ['admin']
    }
  },
  {
    path: '/template-vs-script',
    name: 'TemplateVsScript',
    component: TemplateVsScript,
    meta: { 
      requiresAuth: true,
      isFirstLevel: false,
      title: '模板vs脚本',
      roles: ['admin']
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vue-bank/' : '/'),
  routes
})

// ===== 全局前置守卫 - 身份验证和权限控制 =====
router.beforeEach(async (to, from, next) => {
  console.log('🔐 Route Guard Check:', {
    to: to.path,
    requiresAuth: to.meta.requiresAuth,
    roles: to.meta.roles,
    permissions: to.meta.permissions,
    requiresVIP: to.meta.requiresVIP
  })

  // 1. 检查是否需要登录
  if (to.meta.requiresAuth) {
    if (!auth.isLoggedIn()) {
      console.log('❌ Not logged in, redirecting to login')
      showToast({
        type: 'fail',
        message: '请先登录'
      })
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }

    // 2. 检查token是否过期，尝试刷新
    if (auth.isTokenExpired()) {
      try {
        console.log('🔄 Token expired, attempting refresh')
        await auth.refreshToken()
        console.log('✅ Token refreshed successfully')
      } catch (error) {
        console.log('❌ Token refresh failed:', error.message)
        showToast({
          type: 'fail',
          message: '登录已过期，请重新登录'
        })
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
        return
      }
    }

    // 3. 检查角色权限
    if (to.meta.roles && to.meta.roles.length > 0) {
      if (!auth.hasAnyRole(to.meta.roles)) {
        console.log('❌ Insufficient role permissions')
        showToast({
          type: 'fail',
          message: '权限不足，无法访问该页面'
        })
        next({ path: from.path || '/home' })
        return
      }
    }

    // 4. 检查具体权限
    if (to.meta.permissions && to.meta.permissions.length > 0) {
      if (!auth.hasAllPermissions(to.meta.permissions)) {
        console.log('❌ Insufficient permissions')
        showToast({
          type: 'fail',
          message: '权限不足，无法访问该功能'
        })
        next({ path: from.path || '/home' })
        return
      }
    }

    // 5. 检查VIP权限
    if (to.meta.requiresVIP && !auth.isVIP()) {
      console.log('❌ VIP access required')
      showToast({
        type: 'fail',
        message: '该功能仅限VIP用户使用'
      })
      next({ path: from.path || '/home' })
      return
    }

    console.log('✅ All permission checks passed')
  }

  // 6. 已登录用户访问登录页面，重定向到首页
  if (to.path === '/login' && auth.isLoggedIn()) {
    console.log('🏠 Already logged in, redirecting to home')
    const redirectPath = to.query.redirect || '/home'
    next({ path: redirectPath })
    return
  }

  // 7. 默认重定向处理
  if (to.path === '/' && !auth.isLoggedIn()) {
    next({ path: '/login' })
    return
  }

  console.log('✅ Route guard passed, proceeding to:', to.path)
  next()
})

// ===== 全局后置守卫 - 页面标题和导航记录 =====
router.afterEach((to, from) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - CC银行`
  }

  // 记录导航历史（保持原有功能）
  console.log('🔄 ROUTE CHANGE DETECTED:', {
    from: from.path,
    to: to.path,
    timestamp: new Date().toLocaleTimeString(),
    reason: 'Vue Router navigation'
  })
  
  // 导入backHandler可能会有循环依赖，所以这里直接调用
  if (window.backHandler) {
    window.backHandler.recordNavigation(from.path, to.path)
    window.backHandler.resetBackTimer()
  }
})

// 初始化侧滑手势监听
gesture.initSwipeBack(() => {
  // 判断当前是否为一级页签
  const currentRoute = router.currentRoute.value;
  console.log('🎯 Swipe back triggered on route:', currentRoute.path, 'isFirstLevel:', currentRoute.meta?.isFirstLevel);
  
  if (currentRoute.meta?.isFirstLevel) {
    // 一级页签：执行退出逻辑
    console.log('🚪 First level page - showing exit confirmation with enhanced feedback');
    
    // 添加震动反馈（如果设备支持）
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]); // 震动模式：50ms震动，30ms停止，50ms震动
      console.log('📳 Vibration feedback triggered');
    }
    
    // 显示增强的退出确认
    const shouldExit = window.confirm('🚪 您正在一级页面\n\n侧滑将退出应用，确定要退出吗？\n\n💡 提示：在二级页面侧滑可返回上一页');
    
    if (shouldExit) {
      console.log('✅ User confirmed exit');
      
      // 尝试关闭窗口（仅在特定环境下有效）
      try {
        window.close();
      } catch (e) {
        console.log('⚠️ Cannot close window directly, showing alternative message');
        
        // 显示更友好的提示
        const exitMessage = `
          🌟 感谢使用！
          
          由于浏览器安全限制，无法直接关闭页面。
          请手动关闭浏览器标签页。
          
          💡 建议：将此应用添加到桌面，获得更好的体验！
        `;
        alert(exitMessage);
      }
      
      // PWA环境下的替代方案
      if ('serviceWorker' in navigator) {
        console.log('📱 PWA environment detected - enhanced exit handling');
        // 可以在这里添加PWA特定的退出逻辑
        // 例如：清理缓存、保存状态等
      }
    } else {
      console.log('❌ User cancelled exit');
    }
  } else {
    // 非一级页签：返回上一页
    console.log('⬅️ Second level page - going back with smooth transition');
    
    // 添加轻微震动反馈
    if (navigator.vibrate) {
      navigator.vibrate(30); // 轻微震动
    }
    
    // 平滑返回上一页
    router.go(-1);
    
    // 添加返回成功的日志
    setTimeout(() => {
      console.log('✅ Successfully navigated back to previous page');
    }, 100);
  }
});

export default router