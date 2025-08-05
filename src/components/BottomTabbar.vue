<template>
  <div class="custom-tabbar">
    <div 
      v-for="(tab, index) in tabs" 
      :key="index"
      class="tab-item"
      :class="{ active: activeTab === index }"
      @click="handleTabClick(index)"
    >
      <van-icon :name="tab.icon" class="tab-icon" />
      <span class="tab-text">{{ tab.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 定义tab配置
const tabs = [
  { icon: 'wap-home-o', text: '首页', route: '/home' },
  { icon: 'gold-coin-o', text: '理财', route: '/wealth' },
  { icon: 'shop-o', text: '生活', route: '/life' },
  { icon: 'credit-pay', text: '卡片', route: '/cards' }
]

// 根据当前路由计算activeTab
const activeTab = computed(() => {
  const routeToTabMap = {
    '/home': 0,
    '/wealth': 1,
    '/life': 2,
    '/cards': 3
  }
  return routeToTabMap[route.path] || 0
})

// 处理tab点击
const handleTabClick = (index) => {
  const targetRoute = tabs[index].route
  
  // 使用replace而不是push，避免在历史记录中堆积tab切换
  if (route.path !== targetRoute) {
    router.replace(targetRoute)
  }
}
</script>

<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  border-top: 1px solid #ebedf0;
  display: flex;
  z-index: 1000;
  /* 允许正常触摸交互，只禁用水平滑动 */
  touch-action: pan-y pinch-zoom;
  user-select: none;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
  /* 允许点击和垂直滑动 */
  touch-action: manipulation;
}

.tab-item.active {
  color: #1989fa;
}

.tab-item:not(.active) {
  color: #646566;
}

.tab-icon {
  font-size: 18px;
  margin-bottom: 2px;
}

.tab-text {
  font-size: 10px;
  line-height: 1;
}

/* 点击效果 */
.tab-item:active {
  background-color: #f7f8fa;
}

/* 安全区域适配 */
@supports (bottom: env(safe-area-inset-bottom)) {
  .custom-tabbar {
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(50px + env(safe-area-inset-bottom));
  }
}
</style>