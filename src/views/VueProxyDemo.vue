<template>
  <div class="vue-proxy-demo">
    <h2>Vue中的Proxy详解</h2>
    
    <!-- Vue 3响应式系统 -->
    <div class="section">
      <h3>🔥 Vue 3响应式系统（基于Proxy）</h3>
      <div class="demo-card">
        <h4>响应式数据示例</h4>
        <p>当前计数: <strong>{{ reactiveCount }}</strong></p>
        <p>用户信息: {{ userInfo.name }} ({{ userInfo.age }}岁)</p>
        <div class="buttons">
          <button @click="incrementCount">增加计数</button>
          <button @click="updateUser">更新用户</button>
          <button @click="showReactiveLog">查看响应式日志</button>
        </div>
        <div v-if="reactiveLog.length" class="log-section">
          <h5>响应式操作日志:</h5>
          <ul>
            <li v-for="log in reactiveLog" :key="log.id">
              {{ log.message }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 手动创建Proxy -->
    <div class="section">
      <h3>⚡ 手动创建Proxy示例</h3>
      <div class="demo-card">
        <h4>数据验证Proxy</h4>
        <p>银行账户余额: ¥{{ proxyAccount.balance.toLocaleString() }}</p>
        <p>账户状态: {{ proxyAccount.status }}</p>
        <div class="buttons">
          <button @click="depositMoney">存款 ¥1000</button>
          <button @click="withdrawMoney">取款 ¥500</button>
          <button @click="invalidOperation">无效操作测试</button>
        </div>
        <div v-if="proxyLog.length" class="log-section">
          <h5>Proxy操作日志:</h5>
          <ul>
            <li v-for="log in proxyLog" :key="log.id" :class="log.type">
              {{ log.message }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Proxy拦截器演示 -->
    <div class="section">
      <h3>🛡️ Proxy拦截器演示</h3>
      <div class="demo-card">
        <h4>属性访问控制</h4>
        <p>尝试访问不同的属性:</p>
        <div class="buttons">
          <button @click="accessPublicProp">访问公开属性</button>
          <button @click="accessPrivateProp">访问私有属性</button>
          <button @click="accessNonExistentProp">访问不存在属性</button>
        </div>
        <div class="result-display">
          <p v-if="accessResult">访问结果: {{ accessResult }}</p>
        </div>
      </div>
    </div>

    <!-- Proxy vs Object.defineProperty -->
    <div class="section">
      <h3>📊 Proxy vs Object.defineProperty</h3>
      <div class="comparison-grid">
        <div class="comparison-item">
          <h4>Vue 2 (Object.defineProperty)</h4>
          <ul>
            <li>只能监听已存在的属性</li>
            <li>无法监听数组索引变化</li>
            <li>需要递归遍历所有属性</li>
            <li>性能开销较大</li>
          </ul>
        </div>
        <div class="comparison-item">
          <h4>Vue 3 (Proxy)</h4>
          <ul>
            <li>可以监听整个对象</li>
            <li>支持数组索引和length变化</li>
            <li>支持动态添加属性</li>
            <li>性能更好，懒代理</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div class="section">
      <h3>🎯 实际应用场景</h3>
      <div class="demo-card">
        <h4>表单验证Proxy</h4>
        <div class="form-demo">
          <input 
            v-model="formData.username" 
            placeholder="用户名 (3-20字符)"
            :class="{ error: formErrors.username }"
          />
          <input 
            v-model="formData.email" 
            placeholder="邮箱地址"
            :class="{ error: formErrors.email }"
          />
          <input 
            v-model="formData.age" 
            type="number" 
            placeholder="年龄 (18-100)"
            :class="{ error: formErrors.age }"
          />
          <div class="error-messages">
            <p v-for="error in Object.values(formErrors)" :key="error" class="error-text">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="section">
      <h3>💻 核心代码示例</h3>
      <div class="code-examples">
        <div class="code-block">
          <h4>Vue 3响应式原理简化版</h4>
          <pre><code>function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      // 依赖收集
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      // 触发更新
      trigger(target, key)
      return true
    }
  })
}</code></pre>
        </div>
        
        <div class="code-block">
          <h4>数据验证Proxy</h4>
          <pre><code>const validatedData = new Proxy(data, {
  set(target, key, value) {
    if (key === 'balance' && value < 0) {
      throw new Error('余额不能为负数')
    }
    target[key] = value
    return true
  }
})</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'

// Vue 3响应式数据
const reactiveCount = ref(0)
const userInfo = reactive({
  name: '张三',
  age: 25
})
const reactiveLog = ref([])

// 手动Proxy示例
const originalAccount = {
  balance: 5000,
  status: 'active'
}

const proxyLog = ref([])
let logId = 0

// 创建银行账户的Proxy
const proxyAccount = new Proxy(originalAccount, {
  get(target, key) {
    addProxyLog(`读取属性: ${key} = ${target[key]}`, 'info')
    return target[key]
  },
  
  set(target, key, value) {
    if (key === 'balance') {
      if (value < 0) {
        addProxyLog(`❌ 错误: 余额不能为负数 (尝试设置: ${value})`, 'error')
        return false
      }
      if (value > 1000000) {
        addProxyLog(`⚠️ 警告: 余额过高 (${value})`, 'warning')
      }
    }
    
    const oldValue = target[key]
    target[key] = value
    addProxyLog(`✅ 设置属性: ${key} = ${value} (原值: ${oldValue})`, 'success')
    return true
  },
  
  has(target, key) {
    addProxyLog(`检查属性是否存在: ${key}`, 'info')
    return key in target
  },
  
  deleteProperty(target, key) {
    addProxyLog(`❌ 尝试删除属性: ${key} (被拒绝)`, 'error')
    return false // 不允许删除属性
  }
})

// 属性访问控制示例
const secureObject = {
  publicData: '这是公开数据',
  _privateData: '这是私有数据',
  secretKey: 'top-secret'
}

const accessResult = ref('')

const secureProxy = new Proxy(secureObject, {
  get(target, key) {
    if (typeof key === 'string' && key.startsWith('_')) {
      return '❌ 访问被拒绝: 私有属性'
    }
    if (key === 'secretKey') {
      return '❌ 访问被拒绝: 机密信息'
    }
    return target[key] || '❌ 属性不存在'
  }
})

// 表单验证Proxy
const formData = reactive({
  username: '',
  email: '',
  age: ''
})

const formErrors = reactive({})

// 创建表单验证Proxy
const formValidator = new Proxy(formData, {
  set(target, key, value) {
    target[key] = value
    
    // 验证逻辑
    switch (key) {
      case 'username':
        if (value.length < 3 || value.length > 20) {
          formErrors.username = '用户名长度必须在3-20字符之间'
        } else {
          delete formErrors.username
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value && !emailRegex.test(value)) {
          formErrors.email = '请输入有效的邮箱地址'
        } else {
          delete formErrors.email
        }
        break
      case 'age':
        const ageNum = parseInt(value)
        if (value && (isNaN(ageNum) || ageNum < 18 || ageNum > 100)) {
          formErrors.age = '年龄必须在18-100之间'
        } else {
          delete formErrors.age
        }
        break
    }
    
    return true
  }
})

// 监听表单数据变化
watch(formData, () => {
  // 触发验证
  Object.keys(formData).forEach(key => {
    formValidator[key] = formData[key]
  })
}, { deep: true })

// 方法定义
const incrementCount = () => {
  reactiveCount.value++
  addReactiveLog(`计数器增加到: ${reactiveCount.value}`)
}

const updateUser = () => {
  userInfo.age++
  userInfo.name = userInfo.name === '张三' ? '李四' : '张三'
  addReactiveLog(`用户信息更新: ${userInfo.name}, ${userInfo.age}岁`)
}

const showReactiveLog = () => {
  addReactiveLog('Vue 3使用Proxy实现响应式系统，自动追踪依赖变化')
}

const depositMoney = () => {
  proxyAccount.balance += 1000
}

const withdrawMoney = () => {
  proxyAccount.balance -= 500
}

const invalidOperation = () => {
  try {
    proxyAccount.balance = -100 // 这会被Proxy拦截
  } catch (error) {
    addProxyLog(`❌ 操作失败: ${error.message}`, 'error')
  }
}

const accessPublicProp = () => {
  accessResult.value = secureProxy.publicData
}

const accessPrivateProp = () => {
  accessResult.value = secureProxy._privateData
}

const accessNonExistentProp = () => {
  accessResult.value = secureProxy.nonExistent
}

// 辅助函数
const addReactiveLog = (message) => {
  reactiveLog.value.unshift({
    id: Date.now(),
    message,
    time: new Date().toLocaleTimeString()
  })
  if (reactiveLog.value.length > 5) {
    reactiveLog.value.pop()
  }
}

const addProxyLog = (message, type = 'info') => {
  proxyLog.value.unshift({
    id: ++logId,
    message,
    type,
    time: new Date().toLocaleTimeString()
  })
  if (proxyLog.value.length > 8) {
    proxyLog.value.pop()
  }
}
</script>

<style scoped>
.vue-proxy-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

.demo-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
}

.demo-card h4 {
  margin-top: 0;
  color: #34495e;
}

.buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 16px 0;
}

button {
  padding: 8px 16px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.log-section {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.log-section h5 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.log-section ul {
  margin: 0;
  padding-left: 20px;
  max-height: 200px;
  overflow-y: auto;
}

.log-section li {
  margin-bottom: 4px;
  font-size: 13px;
  font-family: 'Monaco', 'Consolas', monospace;
}

.log-section li.success {
  color: #27ae60;
}

.log-section li.error {
  color: #e74c3c;
}

.log-section li.warning {
  color: #f39c12;
}

.log-section li.info {
  color: #3498db;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
}

.comparison-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.comparison-item h4 {
  margin-top: 0;
  color: #495057;
}

.comparison-item ul {
  margin: 0;
  padding-left: 20px;
}

.comparison-item li {
  margin-bottom: 8px;
  color: #6c757d;
}

.form-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-demo input {
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-demo input:focus {
  outline: none;
  border-color: #3498db;
}

.form-demo input.error {
  border-color: #e74c3c;
  background-color: #fdf2f2;
}

.error-messages {
  margin-top: 8px;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin: 4px 0;
}

.result-display {
  margin-top: 12px;
  padding: 12px;
  background: #e8f4f8;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.code-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
}

.code-block {
  background: #2c3e50;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-block h4 {
  color: #ecf0f1;
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 14px;
}

.code-block pre {
  margin: 0;
  color: #ecf0f1;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
}

.code-block code {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .comparison-grid,
  .code-examples {
    grid-template-columns: 1fr;
  }
  
  .buttons {
    flex-direction: column;
  }
}
</style>