<template>
  <div class="login-page">
    <!-- 顶部状态栏 -->
    <div class="status-bar">
      <span class="time">{{ currentTime }}</span>
      <div class="indicators">
        <span class="signal">📶</span>
        <span class="wifi">📶</span>
        <span class="battery">🔋</span>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- Logo区域 -->
      <div class="logo-section">
        <div class="logo-container" :class="{ 'animate': isLogoAnimated }">
          <div class="logo-circle">
            <span class="logo-text">招行</span>
          </div>
        </div>
        <h1 class="app-title">{{ appConfig.title }}</h1>
        <p class="app-subtitle">{{ appConfig.subtitle }}</p>
      </div>

      <!-- 登录表单 -->
      <div class="form-container">
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- 用户名输入框 -->
          <div class="input-group" :class="{ 'error': errors.username, 'focused': focusedField === 'username' }">
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input
                ref="usernameInput"
                v-model="formData.username"
                type="text"
                placeholder="请输入用户名"
                class="form-input"
                :disabled="isLoading"
                @focus="handleFocus('username')"
                @blur="handleBlur('username')"
                @input="clearError('username')"
              />
              <span v-if="formData.username" class="clear-btn" @click="clearField('username')">✕</span>
            </div>
            <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
          </div>

          <!-- 密码输入框 -->
          <div class="input-group" :class="{ 'error': errors.password, 'focused': focusedField === 'password' }">
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input
                ref="passwordInput"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                class="form-input"
                :disabled="isLoading"
                @focus="handleFocus('password')"
                @blur="handleBlur('password')"
                @input="clearError('password')"
              />
              <span class="toggle-password" @click="togglePassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </span>
            </div>
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
          </div>

          <!-- 记住密码 -->
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input v-model="rememberPassword" type="checkbox" class="checkbox">
              <span class="checkmark"></span>
              记住密码
            </label>
          </div>

          <!-- 登录按钮 -->
          <button 
            type="submit" 
            class="login-btn"
            :class="{ 'loading': isLoading, 'disabled': !isFormValid }"
            :disabled="!isFormValid || isLoading"
          >
            <span v-if="!isLoading">登录</span>
            <div v-else class="loading-spinner">
              <div class="spinner"></div>
              <span>登录中...</span>
            </div>
          </button>
        </form>

        <!-- 快捷操作 -->
        <div class="quick-actions">
          <a href="#" @click.prevent="handleForgotPassword" class="action-link">忘记密码？</a>
          <a href="#" @click.prevent="handleRegister" class="action-link">注册账户</a>
        </div>

        <!-- 生物识别登录 -->
        <div v-if="biometricSupported" class="biometric-section">
          <div class="divider">
            <span>或</span>
          </div>
          <button @click="handleBiometricLogin" class="biometric-btn">
            <span class="biometric-icon">{{ biometricType === 'face' ? '👤' : '👆' }}</span>
            {{ biometricType === 'face' ? 'Face ID登录' : 'Touch ID登录' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer">
      <p class="version">版本 {{ appConfig.version }}</p>
      <p class="copyright">© 2024 招商银行股份有限公司</p>
    </div>

    <!-- Toast消息 -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    
    // ===== 响应式数据 =====
    const currentTime = ref('')
    const isLogoAnimated = ref(false)
    const focusedField = ref('')
    const showPassword = ref(false)
    const rememberPassword = ref(false)
    const isLoading = ref(false)
    const biometricSupported = ref(true)
    const biometricType = ref('face') // 'face' 或 'touch'
    
    // 表单数据（使用reactive创建响应式对象）
    const formData = reactive({
      username: '',
      password: ''
    })
    
    // 错误信息
    const errors = reactive({
      username: '',
      password: ''
    })
    
    // Toast消息
    const toast = reactive({
      show: false,
      message: '',
      type: 'success' // 'success', 'error', 'warning'
    })
    
    // 应用配置
    const appConfig = reactive({
      title: '招商银行',
      subtitle: '一网通用户登录',
      version: 'v8.8.8'
    })
    
    // DOM引用
    const usernameInput = ref(null)
    const passwordInput = ref(null)
    
    // ===== 计算属性 =====
    const isFormValid = computed(() => {
      return formData.username.length > 0 && 
             formData.password.length > 0 && 
             !errors.username && 
             !errors.password
    })
    
    // ===== 方法 =====
    
    // 更新时间
    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
    
    // 表单验证
    const validateField = (field) => {
      switch (field) {
        case 'username':
          if (!formData.username) {
            errors.username = '请输入用户名'
          } else if (formData.username.length < 3) {
            errors.username = '用户名至少3个字符'
          } else {
            errors.username = ''
          }
          break
        case 'password':
          if (!formData.password) {
            errors.password = '请输入密码'
          } else if (formData.password.length < 6) {
            errors.password = '密码至少6个字符'
          } else {
            errors.password = ''
          }
          break
      }
    }
    
    // 焦点处理
    const handleFocus = (field) => {
      focusedField.value = field
    }
    
    const handleBlur = (field) => {
      focusedField.value = ''
      validateField(field)
    }
    
    // 清除错误
    const clearError = (field) => {
      errors[field] = ''
    }
    
    // 清除输入框
    const clearField = (field) => {
      formData[field] = ''
      clearError(field)
    }
    
    // 切换密码显示
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }
    
    // 显示Toast
    const showToast = (message, type = 'success') => {
      toast.message = message
      toast.type = type
      toast.show = true
      
      setTimeout(() => {
        toast.show = false
      }, 3000)
    }
    
    // 登录处理
    const handleLogin = async () => {
      // 验证所有字段
      validateField('username')
      validateField('password')
      
      if (!isFormValid.value) {
        showToast('请检查输入信息', 'error')
        return
      }
      
      isLoading.value = true
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        if (formData.username === 'demo' && formData.password === '123456') {
          showToast('登录成功！')
          
          // 保存登录状态
          if (rememberPassword.value) {
            localStorage.setItem('rememberedUser', formData.username)
          }
          
          // 延迟跳转，让用户看到成功消息
          setTimeout(() => {
            router.push('/home')
          }, 1000)
        } else {
          showToast('用户名或密码错误', 'error')
        }
      } catch (error) {
        showToast('登录失败，请重试', 'error')
      } finally {
        isLoading.value = false
      }
    }
    
    // 忘记密码
    const handleForgotPassword = () => {
      showToast('忘记密码功能开发中', 'warning')
    }
    
    // 注册
    const handleRegister = () => {
      showToast('注册功能开发中', 'warning')
    }
    
    // 生物识别登录
    const handleBiometricLogin = () => {
      showToast(`${biometricType.value === 'face' ? 'Face ID' : 'Touch ID'}登录功能开发中`, 'warning')
    }
    
    // ===== 生命周期 =====
    let timeInterval = null
    
    onMounted(async () => {
      // 启动时间更新
      updateTime()
      timeInterval = setInterval(updateTime, 1000)
      
      // Logo动画
      setTimeout(() => {
        isLogoAnimated.value = true
      }, 500)
      
      // 检查是否有记住的用户名
      const rememberedUser = localStorage.getItem('rememberedUser')
      if (rememberedUser) {
        formData.username = rememberedUser
        rememberPassword.value = true
        // 自动聚焦到密码框
        await nextTick()
        passwordInput.value?.focus()
      } else {
        // 自动聚焦到用户名框
        await nextTick()
        usernameInput.value?.focus()
      }
    })
    
    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })
    
    // ===== 返回给模板使用 =====
    return {
      // 数据
      currentTime,
      isLogoAnimated,
      focusedField,
      showPassword,
      rememberPassword,
      isLoading,
      biometricSupported,
      biometricType,
      formData,
      errors,
      toast,
      appConfig,
      
      // DOM引用
      usernameInput,
      passwordInput,
      
      // 计算属性
      isFormValid,
      
      // 方法
      handleFocus,
      handleBlur,
      clearError,
      clearField,
      togglePassword,
      handleLogin,
      handleForgotPassword,
      handleRegister,
      handleBiometricLogin
    }
  }
}
</script>

<style scoped>
/* ===== 全局样式 ===== */
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

/* ===== 状态栏 ===== */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 14px;
  font-weight: 600;
}

.indicators {
  display: flex;
  gap: 5px;
}

/* ===== 主要内容 ===== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

/* ===== Logo区域 ===== */
.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  margin-bottom: 20px;
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-container.animate {
  transform: scale(1);
  opacity: 1;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.logo-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.app-title {
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0 5px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 0;
}

/* ===== 表单容器 ===== */
.form-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.login-form {
  margin-bottom: 20px;
}

/* ===== 输入框组 ===== */
.input-group {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.input-group.focused {
  transform: translateY(-2px);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.input-group.focused .input-wrapper {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group.error .input-wrapper {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.input-icon {
  padding: 0 15px;
  font-size: 18px;
  color: #6c757d;
}

.form-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 16px 0;
  font-size: 16px;
  color: #333;
  outline: none;
}

.form-input::placeholder {
  color: #adb5bd;
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-btn, .toggle-password {
  padding: 0 15px;
  cursor: pointer;
  color: #6c757d;
  font-size: 16px;
  transition: color 0.3s ease;
}

.clear-btn:hover, .toggle-password:hover {
  color: #333;
}

.error-message {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 15px;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* ===== 复选框 ===== */
.checkbox-group {
  margin-bottom: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #6c757d;
}

.checkbox {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox:checked + .checkmark {
  background: #667eea;
  border-color: #667eea;
}

.checkbox:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* ===== 登录按钮 ===== */
.login-btn {
  width: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ===== 快捷操作 ===== */
.quick-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.action-link {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.action-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* ===== 生物识别 ===== */
.biometric-section {
  text-align: center;
}

.divider {
  position: relative;
  margin: 20px 0;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #dee2e6;
}

.divider span {
  background: rgba(255, 255, 255, 0.95);
  padding: 0 15px;
  color: #6c757d;
  font-size: 14px;
}

.biometric-btn {
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  color: #667eea;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
}

.biometric-btn:hover {
  background: #667eea;
  color: white;
}

.biometric-icon {
  font-size: 16px;
}

/* ===== 底部 ===== */
.footer {
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.version, .copyright {
  margin: 5px 0;
  font-size: 12px;
}

/* ===== Toast消息 ===== */
.toast {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toast.success {
  background: #28a745;
}

.toast.error {
  background: #dc3545;
}

.toast.warning {
  background: #ffc107;
  color: #333;
}

/* Toast动画 */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* ===== 响应式设计 ===== */
@media (max-width: 480px) {
  .main-content {
    padding: 15px;
  }
  
  .form-container {
    padding: 20px;
    border-radius: 15px;
  }
  
  .app-title {
    font-size: 24px;
  }
  
  .logo-circle {
    width: 60px;
    height: 60px;
  }
  
  .logo-text {
    font-size: 20px;
  }
}

/* ===== 深色模式支持 ===== */
@media (prefers-color-scheme: dark) {
  .form-container {
    background: rgba(30, 30, 30, 0.95);
    color: #e9ecef;
  }
  
  .input-wrapper {
    background: #2d3748;
    border-color: #4a5568;
  }
  
  .form-input {
    color: #e9ecef;
  }
  
  .form-input::placeholder {
    color: #a0aec0;
  }
  
  .input-icon {
    color: #a0aec0;
  }
}
</style>