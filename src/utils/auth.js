// 身份验证和权限管理工具
import { showToast, showConfirmDialog } from 'vant'

class AuthManager {
  constructor() {
    this.TOKEN_KEY = 'vue_bank_token'
    this.USER_KEY = 'vue_bank_user'
    this.PERMISSIONS_KEY = 'vue_bank_permissions'
    this.REFRESH_TOKEN_KEY = 'vue_bank_refresh_token'
  }

  // ===== Token管理 =====
  
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
  }

  // ===== 用户信息管理 =====
  
  getUserInfo() {
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  setUserInfo(userInfo) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userInfo))
  }

  // ===== 权限管理 =====
  
  getPermissions() {
    const permStr = localStorage.getItem(this.PERMISSIONS_KEY)
    return permStr ? JSON.parse(permStr) : []
  }

  setPermissions(permissions) {
    localStorage.setItem(this.PERMISSIONS_KEY, JSON.stringify(permissions))
  }

  // 检查是否有特定权限
  hasPermission(permission) {
    const permissions = this.getPermissions()
    return permissions.includes(permission)
  }

  // 检查是否有任一权限
  hasAnyPermission(permissionList) {
    const permissions = this.getPermissions()
    return permissionList.some(perm => permissions.includes(perm))
  }

  // 检查是否有所有权限
  hasAllPermissions(permissionList) {
    const permissions = this.getPermissions()
    return permissionList.every(perm => permissions.includes(perm))
  }

  // ===== 角色管理 =====
  
  getUserRole() {
    const userInfo = this.getUserInfo()
    return userInfo ? userInfo.role : null
  }

  hasRole(role) {
    const userRole = this.getUserRole()
    return userRole === role
  }

  hasAnyRole(roleList) {
    const userRole = this.getUserRole()
    return roleList.includes(userRole)
  }

  // ===== VIP等级管理 =====
  
  getUserLevel() {
    const userInfo = this.getUserInfo()
    return userInfo ? userInfo.level : 'NORMAL'
  }

  isVIP() {
    const level = this.getUserLevel()
    return ['VIP', 'SVIP', 'DIAMOND'].includes(level)
  }

  // ===== Token验证 =====
  
  isTokenExpired() {
    const userInfo = this.getUserInfo()
    if (!userInfo || !userInfo.expireTime) return true
    
    return Date.now() > userInfo.expireTime
  }

  isLoggedIn() {
    const token = this.getToken()
    return token && !this.isTokenExpired()
  }

  // ===== 刷新Token =====
  
  async refreshToken() {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      // 模拟API调用
      const response = await this.mockApiCall('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })

      if (response.success) {
        this.setToken(response.data.token)
        this.setRefreshToken(response.data.refreshToken)
        this.setUserInfo(response.data.user)
        return response.data
      } else {
        throw new Error('Token refresh failed')
      }
    } catch (error) {
      this.clearAuthData()
      throw error
    }
  }

  // ===== 登录登出 =====
  
  async login(credentials) {
    try {
      // 模拟登录API调用
      const response = await this.mockApiCall('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (response.success) {
        const { token, refreshToken, user, permissions } = response.data
        
        // 保存认证信息
        this.setToken(token)
        this.setRefreshToken(refreshToken)
        this.setUserInfo(user)
        this.setPermissions(permissions)
        
        showToast({
          type: 'success',
          message: `欢迎回来，${user.name}！`
        })
        
        return response.data
      } else {
        throw new Error(response.message || '登录失败')
      }
    } catch (error) {
      showToast({
        type: 'fail',
        message: error.message
      })
      throw error
    }
  }

  async logout() {
    try {
      // 可选：调用登出API
      await this.mockApiCall('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
    } catch (error) {
      console.warn('Logout API call failed:', error)
    } finally {
      this.clearAuthData()
      showToast({
        type: 'success',
        message: '已安全退出'
      })
    }
  }

  // ===== 数据清理 =====
  
  clearAuthData() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
    localStorage.removeItem(this.PERMISSIONS_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  // ===== 模拟API调用 =====
  
  async mockApiCall(url, options = {}) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟不同的API响应
    if (url === '/api/auth/login') {
      const { username, password } = JSON.parse(options.body)
      
      // 简化登录逻辑：只要用户名和密码不为空就登录成功
      if (username && username.trim() && password && password.trim()) {
        // 根据用户名决定用户角色和权限
        let userRole = 'user'
        let userLevel = 'NORMAL'
        let userPermissions = ['user:read']
        let userName = username
        let userAvatar = '👤'

        // 根据用户名包含的关键词分配不同角色
        if (username.toLowerCase().includes('admin')) {
          userRole = 'admin'
          userLevel = 'DIAMOND'
          userPermissions = ['user:read', 'user:write', 'admin:read', 'admin:write', 'vip:access']
          userName = '管理员'
          userAvatar = '👨‍💼'
        } else if (username.toLowerCase().includes('vip')) {
          userRole = 'vip'
          userLevel = 'VIP'
          userPermissions = ['user:read', 'user:write', 'vip:access']
          userName = 'VIP用户'
          userAvatar = '⭐'
        } else {
          userName = `用户${username}`
        }

        return {
          success: true,
          data: {
            token: `mock_token_${Date.now()}`,
            refreshToken: `mock_refresh_token_${Date.now()}`,
            user: {
              id: Date.now(),
              username: username,
              name: userName,
              role: userRole,
              level: userLevel,
              avatar: userAvatar,
              expireTime: Date.now() + 24 * 60 * 60 * 1000 // 24小时后过期
            },
            permissions: userPermissions
          }
        }
      } else {
        return {
          success: false,
          message: '用户名和密码不能为空'
        }
      }
    }

    if (url === '/api/auth/refresh') {
      return {
        success: true,
        data: {
          token: `refreshed_token_${Date.now()}`,
          refreshToken: `refreshed_refresh_token_${Date.now()}`,
          user: this.getUserInfo()
        }
      }
    }

    if (url === '/api/auth/logout') {
      return { success: true }
    }

    // 默认成功响应
    return { success: true, data: {} }
  }

  // ===== 权限检查辅助方法 =====
  
  // 检查页面访问权限
  canAccessPage(routeMeta) {
    if (!routeMeta.requiresAuth) return true
    if (!this.isLoggedIn()) return false

    // 检查角色权限
    if (routeMeta.roles && routeMeta.roles.length > 0) {
      if (!this.hasAnyRole(routeMeta.roles)) return false
    }

    // 检查具体权限
    if (routeMeta.permissions && routeMeta.permissions.length > 0) {
      if (!this.hasAllPermissions(routeMeta.permissions)) return false
    }

    // 检查VIP等级
    if (routeMeta.requiresVIP && !this.isVIP()) return false

    return true
  }

  // 获取用户显示信息
  getUserDisplayInfo() {
    const userInfo = this.getUserInfo()
    if (!userInfo) return null

    return {
      name: userInfo.name,
      avatar: userInfo.avatar,
      role: userInfo.role,
      level: userInfo.level,
      isVIP: this.isVIP()
    }
  }
}

export default new AuthManager()