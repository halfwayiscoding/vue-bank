<template>
  <div class="promise-demo">
    <div class="header">
      <h1>Promise vs Async/Await 演示</h1>
      <p>理解它们的等价关系</p>
    </div>

    <div class="demo-container">
      <!-- 基础概念 -->
      <div class="concept-section">
        <h2>🔍 核心概念</h2>
        <div class="concept-card">
          <h3>async/await 是 Promise 的语法糖</h3>
          <p>它们本质上是同一个东西，只是写法不同</p>
        </div>
      </div>

      <!-- 等价写法对比 -->
      <div class="comparison-section">
        <h2>📝 等价写法对比</h2>
        
        <div class="comparison-grid">
          <!-- Promise 写法 -->
          <div class="code-block">
            <h3>Promise 写法</h3>
            <pre><code>function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('数据获取成功')
    }, 2000)
  })
}

// 使用 Promise
fetchData()
  .then(result => {
    console.log(result)
    return '处理完成'
  })
  .then(finalResult => {
    console.log(finalResult)
  })
  .catch(error => {
    console.error(error)
  })</code></pre>
          </div>

          <!-- async/await 写法 -->
          <div class="code-block">
            <h3>async/await 写法</h3>
            <pre><code>function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('数据获取成功')
    }, 2000)
  })
}

// 使用 async/await
async function handleData() {
  try {
    const result = await fetchData()
    console.log(result)
    const finalResult = '处理完成'
    console.log(finalResult)
  } catch (error) {
    console.error(error)
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 实际演示 -->
      <div class="demo-section">
        <h2>🎯 实际演示</h2>
        
        <div class="demo-buttons">
          <button @click="runPromiseDemo" :disabled="isRunning">
            运行 Promise 版本
          </button>
          <button @click="runAsyncAwaitDemo" :disabled="isRunning">
            运行 Async/Await 版本
          </button>
          <button @click="clearLogs">清空日志</button>
        </div>

        <div class="logs">
          <h3>执行日志：</h3>
          <div class="log-container">
            <div v-for="(log, index) in logs" :key="index" class="log-item">
              <span class="timestamp">{{ log.time }}</span>
              <span :class="['message', log.type]">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细解释 -->
      <div class="explanation-section">
        <h2>💡 详细解释</h2>
        
        <div class="explanation-grid">
          <div class="explanation-card">
            <h3>1. async 函数</h3>
            <p><code>async</code> 关键字让函数自动返回 Promise</p>
            <pre><code>async function test() {
  return 'hello'
}
// 等价于
function test() {
  return Promise.resolve('hello')
}</code></pre>
          </div>

          <div class="explanation-card">
            <h3>2. await 关键字</h3>
            <p><code>await</code> 等待 Promise 完成并返回结果</p>
            <pre><code>const result = await promise
// 等价于
promise.then(result => {
  // 使用 result
})</code></pre>
          </div>

          <div class="explanation-card">
            <h3>3. 错误处理</h3>
            <p>try/catch 等价于 .catch()</p>
            <pre><code>try {
  const result = await promise
} catch (error) {
  console.error(error)
}
// 等价于
promise.catch(error => {
  console.error(error)
})</code></pre>
          </div>

          <div class="explanation-card">
            <h3>4. 你的代码示例</h3>
            <p>Login.vue 中的这行代码：</p>
            <pre><code>await new Promise(resolve => 
  setTimeout(resolve, 2000)
)
// 等价于
new Promise(resolve => 
  setTimeout(resolve, 2000)
).then(() => {
  // 继续执行后续代码
})</code></pre>
          </div>
        </div>
      </div>

      <!-- 优缺点对比 -->
      <div class="pros-cons-section">
        <h2>⚖️ 优缺点对比</h2>
        
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Promise</th>
                <th>async/await</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>可读性</td>
                <td>链式调用，嵌套复杂</td>
                <td>同步代码风格，易读</td>
              </tr>
              <tr>
                <td>错误处理</td>
                <td>.catch() 处理</td>
                <td>try/catch 统一处理</td>
              </tr>
              <tr>
                <td>调试</td>
                <td>调试困难</td>
                <td>容易调试</td>
              </tr>
              <tr>
                <td>浏览器支持</td>
                <td>ES6 支持</td>
                <td>ES2017 支持</td>
              </tr>
              <tr>
                <td>性能</td>
                <td>相同</td>
                <td>相同（只是语法糖）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const logs = ref([])
const isRunning = ref(false)

// 添加日志
const addLog = (message, type = 'info') => {
  logs.value.push({
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
}

// 模拟异步操作
const simulateAsyncOperation = (delay = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% 成功率
        resolve('操作成功完成')
      } else {
        reject(new Error('操作失败'))
      }
    }, delay)
  })
}

// Promise 版本演示
const runPromiseDemo = () => {
  if (isRunning.value) return
  
  isRunning.value = true
  addLog('开始执行 Promise 版本...', 'info')
  
  simulateAsyncOperation(1500)
    .then(result => {
      addLog(`Promise 结果: ${result}`, 'success')
      return '数据处理完成'
    })
    .then(processedResult => {
      addLog(`Promise 处理结果: ${processedResult}`, 'success')
    })
    .catch(error => {
      addLog(`Promise 错误: ${error.message}`, 'error')
    })
    .finally(() => {
      addLog('Promise 版本执行完毕', 'info')
      isRunning.value = false
    })
}

// async/await 版本演示
const runAsyncAwaitDemo = async () => {
  if (isRunning.value) return
  
  isRunning.value = true
  addLog('开始执行 Async/Await 版本...', 'info')
  
  try {
    const result = await simulateAsyncOperation(1500)
    addLog(`Async/Await 结果: ${result}`, 'success')
    
    const processedResult = '数据处理完成'
    addLog(`Async/Await 处理结果: ${processedResult}`, 'success')
    
  } catch (error) {
    addLog(`Async/Await 错误: ${error.message}`, 'error')
  } finally {
    addLog('Async/Await 版本执行完毕', 'info')
    isRunning.value = false
  }
}

// 清空日志
const clearLogs = () => {
  logs.value = []
}
</script>

<style scoped>
.promise-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
}

.concept-section,
.comparison-section,
.demo-section,
.explanation-section,
.pros-cons-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.concept-card {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
}

.code-block h3 {
  color: #63b3ed;
  margin-bottom: 15px;
}

.code-block pre {
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.demo-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.demo-buttons button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-buttons button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(116, 185, 255, 0.4);
}

.demo-buttons button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.logs {
  background: #1a202c;
  border-radius: 10px;
  padding: 20px;
}

.logs h3 {
  color: #e2e8f0;
  margin-bottom: 15px;
}

.log-container {
  max-height: 300px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
}

.timestamp {
  color: #a0aec0;
  min-width: 80px;
}

.message.info {
  color: #63b3ed;
}

.message.success {
  color: #68d391;
}

.message.error {
  color: #fc8181;
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.explanation-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
}

.explanation-card h3 {
  color: #2d3748;
  margin-bottom: 10px;
}

.explanation-card pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 10px;
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.comparison-table th {
  background: #f7fafc;
  font-weight: 600;
  color: #2d3748;
}

.comparison-table tr:hover {
  background: #f7fafc;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-buttons {
    flex-direction: column;
  }
  
  .explanation-grid {
    grid-template-columns: 1fr;
  }
}
</style>