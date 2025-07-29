<template>
  <div class="lifecycle-demo">
    <h2>🔄 生命周期钩子演示</h2>
    
    <div class="controls">
      <button @click="updateData">更新数据 ({{ counter }})</button>
      <button @click="toggleChild">{{ showChild ? '隐藏' : '显示' }}子组件</button>
      <button @click="forceUpdate">强制更新</button>
      <button @click="clearLogs">清空日志</button>
    </div>

    <div class="data-display">
      <p><strong>计数器:</strong> {{ counter }}</p>
      <p><strong>消息:</strong> {{ message }}</p>
    </div>

    <!-- 子组件 -->
    <div 
      v-if="showChild" 
      class="child-component"
    >
      <h4>子组件</h4>
      <p>接收到的计数器: {{ counter }}</p>
      <p>我是子组件的数据</p>
    </div>

    <!-- 生命周期日志 -->
    <div class="logs">
      <h3>生命周期日志</h3>
      <div class="log-container">
        <div 
          v-for="(log, index) in logs" 
          :key="index" 
          :class="['log-item', `log-${log.type}`]"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-hook">{{ log.hook }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ref, 
  watch, 
  watchEffect,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

const counter = ref(0)
const message = ref('Hello Vue!')
const showChild = ref(false)
const logs = ref([])

const addLog = (hook, message, type = 'parent') => {
  logs.value.push({
    hook,
    message,
    type,
    time: new Date().toLocaleTimeString()
  })
}

// ===== 创建阶段 =====

// 1. setup() 本身就是创建阶段，在所有生命周期之前
addLog('setup()', '组件创建，响应式数据初始化')

// ===== 挂载阶段 =====

onBeforeMount(() => {
  addLog('onBeforeMount', '组件即将挂载到DOM，模板编译完成但未渲染')
})

onMounted(() => {
  addLog('onMounted', '组件已挂载到DOM，可以访问DOM元素')
})

// ===== 更新阶段 =====

onBeforeUpdate(() => {
  addLog('onBeforeUpdate', '响应式数据变化，DOM即将更新')
})

onUpdated(() => {
  addLog('onUpdated', 'DOM已更新完成')
})

// ===== 卸载阶段 =====

onBeforeUnmount(() => {
  addLog('onBeforeUnmount', '组件即将卸载，清理工作的最佳时机')
})

onUnmounted(() => {
  addLog('onUnmounted', '组件已卸载，所有子组件也已卸载')
})

// ===== Keep-alive 相关 =====

onActivated(() => {
  addLog('onActivated', 'Keep-alive组件被激活')
})

onDeactivated(() => {
  addLog('onDeactivated', 'Keep-alive组件被停用')
})

// ===== 错误处理 =====

onErrorCaptured((err, instance, info) => {
  addLog('onErrorCaptured', `捕获到错误: ${err.message}`, 'error')
  return false // 阻止错误继续传播
})

// ===== 调试钩子 =====

onRenderTracked((e) => {
  addLog('onRenderTracked', `追踪到依赖: ${e.key}`, 'debug')
})

onRenderTriggered((e) => {
  addLog('onRenderTriggered', `触发重新渲染: ${e.key}`, 'debug')
})

// ===== 侦听器 =====

watch(counter, (newVal, oldVal) => {
  addLog('watch', `计数器从 ${oldVal} 变为 ${newVal}`, 'watch')
})

watchEffect(() => {
  // 这会在counter变化时自动执行
  if (counter.value > 0) {
    addLog('watchEffect', `watchEffect执行，计数器: ${counter.value}`, 'watch')
  }
})

// ===== 方法 =====

const toggleChild = () => {
  showChild.value = !showChild.value
}

const updateData = () => {
  counter.value++
  message.value = `更新了 ${counter.value} 次`
}

const forceUpdate = () => {
  // 强制更新（不推荐，仅用于演示）
  addLog('forceUpdate', '手动触发强制更新', 'manual')
}

const clearLogs = () => {
  logs.value = []
}
</script>

<style scoped>
.lifecycle-demo {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background: #0056cc;
}

.data-display {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e8e8e8;
}

.child-component {
  background: #e3f2fd;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  border: 2px solid #2196f3;
}

.child-component h4 {
  margin: 0 0 10px 0;
  color: #1976d2;
}

.logs {
  margin-top: 30px;
}

.logs h3 {
  color: #333;
  margin-bottom: 15px;
}

.log-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.log-item {
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  align-items: center;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #666;
  font-family: monospace;
  min-width: 80px;
  margin-right: 10px;
}

.log-hook {
  font-weight: bold;
  min-width: 140px;
  margin-right: 10px;
}

.log-message {
  color: #555;
  flex: 1;
}

.log-parent .log-hook {
  color: #007aff;
}

.log-child .log-hook {
  color: #34c759;
}

.log-watch .log-hook {
  color: #ff9500;
}

.log-debug .log-hook {
  color: #af52de;
}

.log-error .log-hook {
  color: #ff3b30;
}

.log-manual .log-hook {
  color: #ff2d92;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .lifecycle-demo {
    padding: 10px;
  }
  
  .controls button {
    margin-bottom: 5px;
    display: block;
    width: 100%;
  }
  
  .log-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .log-time, .log-hook {
    min-width: auto;
    margin-right: 0;
    margin-bottom: 2px;
  }
}
</style>