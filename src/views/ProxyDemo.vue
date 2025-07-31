<template>
  <div class="proxy-demo">
    <h2>Proxy使用示例</h2>
    
    <!-- 用户信息区域 -->
    <div class="section">
      <h3>用户信息 (使用 /api 代理)</h3>
      <div v-if="userProfile">
        <p>用户名: {{ userProfile.username }}</p>
        <p>邮箱: {{ userProfile.email }}</p>
        <button @click="updateProfile">更新资料</button>
      </div>
      <button @click="loadUserProfile" :disabled="loading.user">
        {{ loading.user ? '加载中...' : '加载用户信息' }}
      </button>
    </div>

    <!-- 银行信息区域 -->
    <div class="section">
      <h3>银行信息 (使用 /bank-api 代理)</h3>
      <div v-if="accountBalance">
        <p>账户余额: ¥{{ accountBalance.toLocaleString() }}</p>
        <button @click="performTransfer">转账测试</button>
      </div>
      <button @click="loadBalance" :disabled="loading.bank">
        {{ loading.bank ? '加载中...' : '查询余额' }}
      </button>
    </div>

    <!-- 认证区域 -->
    <div class="section">
      <h3>用户认证 (使用 /auth 代理)</h3>
      <div class="auth-form">
        <input v-model="loginForm.username" placeholder="用户名" />
        <input v-model="loginForm.password" type="password" placeholder="密码" />
        <button @click="handleLogin" :disabled="loading.auth">
          {{ loading.auth ? '登录中...' : '登录' }}
        </button>
      </div>
    </div>

    <!-- WebSocket状态 -->
    <div class="section">
      <h3>WebSocket连接 (使用 /socket.io 代理)</h3>
      <p>连接状态: {{ socketStatus }}</p>
      <button @click="toggleSocket">
        {{ socketConnected ? '断开连接' : '连接WebSocket' }}
      </button>
    </div>

    <!-- 错误信息 -->
    <div v-if="error" class="error">
      错误: {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { userAPI, bankAPI, authAPI, createSocketConnection } from '@/utils/api'

// 响应式数据
const userProfile = ref(null)
const accountBalance = ref(null)
const error = ref('')
const socketStatus = ref('未连接')
const socketConnected = ref(false)
let socket = null

// 加载状态
const loading = reactive({
  user: false,
  bank: false,
  auth: false
})

// 登录表单
const loginForm = reactive({
  username: '',
  password: ''
})

// 加载用户信息
const loadUserProfile = async () => {
  loading.user = true
  error.value = ''
  
  try {
    // 这个请求会被代理到 http://localhost:8080/users/123/profile
    userProfile.value = await userAPI.getUserProfile('123')
  } catch (err) {
    error.value = `加载用户信息失败: ${err.message}`
  } finally {
    loading.user = false
  }
}

// 更新用户资料
const updateProfile = async () => {
  try {
    const updatedData = {
      email: 'new-email@example.com',
      phone: '13800138000'
    }
    
    // 这个请求会被代理到 http://localhost:8080/users/123/profile
    await userAPI.updateUserProfile('123', updatedData)
    await loadUserProfile() // 重新加载用户信息
  } catch (err) {
    error.value = `更新用户信息失败: ${err.message}`
  }
}

// 查询账户余额
const loadBalance = async () => {
  loading.bank = true
  error.value = ''
  
  try {
    // 这个请求会被代理到 https://api.bank.example.com/v1/accounts/456/balance
    const result = await bankAPI.getAccountBalance('456')
    accountBalance.value = result.balance
  } catch (err) {
    error.value = `查询余额失败: ${err.message}`
  } finally {
    loading.bank = false
  }
}

// 执行转账
const performTransfer = async () => {
  try {
    // 这个请求会被代理到 https://api.bank.example.com/v1/transfer
    const result = await bankAPI.transfer('456', '789', 100)
    console.log('转账成功:', result)
    await loadBalance() // 重新查询余额
  } catch (err) {
    error.value = `转账失败: ${err.message}`
  }
}

// 处理登录
const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    error.value = '请输入用户名和密码'
    return
  }
  
  loading.auth = true
  error.value = ''
  
  try {
    // 这个请求会被代理到 http://localhost:3001/auth/login
    const result = await authAPI.login(loginForm.username, loginForm.password)
    console.log('登录成功:', result)
    
    // 清空表单
    loginForm.username = ''
    loginForm.password = ''
  } catch (err) {
    error.value = `登录失败: ${err.message}`
  } finally {
    loading.auth = false
  }
}

// WebSocket连接管理
const toggleSocket = () => {
  if (socketConnected.value) {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  } else {
    // 这会通过proxy连接到 ws://localhost:8080
    socket = createSocketConnection()
    
    socket.on('connect', () => {
      socketStatus.value = '已连接'
      socketConnected.value = true
    })
    
    socket.on('disconnect', () => {
      socketStatus.value = '已断开'
      socketConnected.value = false
    })
    
    socket.on('error', (err) => {
      socketStatus.value = `连接错误: ${err.message}`
      socketConnected.value = false
    })
  }
}

// 组件挂载时的初始化
onMounted(() => {
  console.log('Proxy Demo组件已挂载')
  console.log('可用的代理路径:')
  console.log('- /api -> http://localhost:8080')
  console.log('- /bank-api -> https://api.bank.example.com/v1')
  console.log('- /auth -> http://localhost:3001')
  console.log('- /socket.io -> ws://localhost:8080')
})

// 组件卸载时清理
onUnmounted(() => {
  if (socket) {
    socket.disconnect()
  }
})
</script>

<style scoped>
.proxy-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.section h3 {
  margin-top: 0;
  color: #333;
}

.auth-form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.auth-form input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 150px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error {
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-top: 20px;
}

p {
  margin: 8px 0;
}
</style>