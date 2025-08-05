<template>
  <!-- 这就像iOS的根视图控制器 -->
  <div id="app">
    <!-- router-view 类似于 iOS 的 UINavigationController 的容器 -->
    <!-- 使用 keep-alive 缓存页面组件，配合 onActivated 钩子实现页面刷新 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
// App组件作为根组件，通常不需要复杂的逻辑
// 使用 <script setup> 语法保持现代化
</script>

<style>
/* 全局样式，类似iOS的全局外观设置 */
#app {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
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
</style>