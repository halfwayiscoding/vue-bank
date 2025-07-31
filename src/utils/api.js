// API工具函数示例 - 展示如何使用proxy配置

// 基础API请求函数
async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API请求失败:', error)
    throw error
  }
}

// 使用 /api 代理的示例
export const userAPI = {
  // 获取用户信息 - 实际请求: http://localhost:8080/users/profile
  async getUserProfile(userId) {
    return request(`/api/users/${userId}/profile`)
  },
  
  // 更新用户信息 - 实际请求: http://localhost:8080/users/profile
  async updateUserProfile(userId, data) {
    return request(`/api/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
}

// 使用 /bank-api 代理的示例
export const bankAPI = {
  // 获取账户余额 - 实际请求: https://api.bank.example.com/v1/accounts/balance
  async getAccountBalance(accountId) {
    return request(`/bank-api/accounts/${accountId}/balance`)
  },
  
  // 转账操作 - 实际请求: https://api.bank.example.com/v1/transfer
  async transfer(fromAccount, toAccount, amount) {
    return request('/bank-api/transfer', {
      method: 'POST',
      body: JSON.stringify({
        from: fromAccount,
        to: toAccount,
        amount: amount
      })
    })
  }
}

// 使用 /auth 代理的示例
export const authAPI = {
  // 用户登录 - 实际请求: http://localhost:3001/auth/login
  async login(username, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
  },
  
  // 用户注册 - 实际请求: http://localhost:3001/auth/register
  async register(userData) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }
}

// WebSocket连接示例（使用socket.io代理）
export function createSocketConnection() {
  // 这会通过proxy连接到 ws://localhost:8080
  // 注意：实际使用时需要安装并导入socket.io-client
  // import { io } from 'socket.io-client'
  
  try {
    // 模拟WebSocket连接
    const ws = new WebSocket('ws://localhost:8080/socket.io')
    
    ws.onopen = () => {
      console.log('WebSocket连接成功')
    }
    
    ws.onclose = () => {
      console.log('WebSocket连接断开')
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket连接错误:', error)
    }
    
    return ws
  } catch (error) {
    console.error('创建WebSocket连接失败:', error)
    return null
  }
}