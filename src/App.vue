<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="['Transfer', 'Account']">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </div>
</template>
  
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import backHandler from '@/utils/backHandler.js'

const router = useRouter()
const route = useRoute()

// 处理浏览器返回按钮
const handlePopState = async (event) => {
  const currentPath = route.path
  
  console.log('🚨 POPSTATE in handlePopState:', {
    currentPath,
    isTopLevel: backHandler.isTopLevelRoute(currentPath),
    timestamp: new Date().toLocaleTimeString()
  })
  
  // 如果当前在一级页面，显示退出确认弹窗
  if (backHandler.isTopLevelRoute(currentPath)) {
    console.log('🔴 BLOCKING POPSTATE for top-level route, showing exit dialog:', currentPath)
    event.preventDefault()
    event.stopPropagation()
    
    // 强制保持在当前页面
    window.history.pushState(null, '', currentPath)
    
    // 调用backHandler来显示退出确认弹窗
    const shouldExit = await backHandler.handleBack(currentPath, router)
    if (!shouldExit) {
      // 用户取消退出，确保停留在当前页面
      window.history.pushState(null, '', currentPath)
    }
    
    return false
  }
}

// 处理Android物理返回键
const handleKeyDown = async (event) => {
  if (event.key === 'Escape' || event.keyCode === 27) {
    const currentPath = route.path
    
    if (backHandler.isTopLevelRoute(currentPath)) {
      event.preventDefault()
      await backHandler.handleBack(currentPath, router)
    }
  }
}

// 将backHandler暴露到全局，供路由守卫使用
window.backHandler = backHandler

// 监听浏览器返回事件
onMounted(() => {
  // 初始化返回处理器
  backHandler.initialize(route.path)
  
  // 专注于阻止浏览器导航，而不是用户手势
  preventBrowserNavigation()
  
  // 添加历史记录状态
  window.history.pushState(null, '', route.path)
  window.addEventListener('popstate', handlePopState)
  window.addEventListener('keydown', handleKeyDown)
  
  // 为PWA添加beforeunload事件
  window.addEventListener('beforeunload', (event) => {
    if (backHandler.isTopLevelRoute(route.path)) {
      event.preventDefault()
      event.returnValue = ''
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style>
/* 全局样式，类似iOS的全局外观设置 */
#app {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  /* 恢复正常滚动，只禁用水平滑动 */
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

/* 允许正常的用户交互 */
* {
  /* 保持正常的触摸行为和滚动 */
  -webkit-overflow-scrolling: touch;
  /* 允许用户选择文本 */
  -webkit-user-select: auto;
  user-select: auto;
}

/* 移动端适配 */
.van-nav-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.van-nav-bar__title {
  color: white !important;
}

.van-nav-bar .van-icon {
  color: white !important;
}

.page-info-display {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.page-info-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  width: 90%;
}

.page-info-content h3 {
  margin: 0 0 15px 0;
  color: #333;
  text-align: center;
}

.page-info-content p {
  margin: 8px 0;
  color: #666;
  font-size: 14px;
}

.page-info-content button {
  width: 100%;
  padding: 10px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
}

.page-info-content button:hover {
  background: #0056CC;
}
</style>