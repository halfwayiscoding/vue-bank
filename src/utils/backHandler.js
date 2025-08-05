// 返回处理工具
import { showConfirmDialog, showToast } from 'vant'

class BackHandler {
  constructor() {
    this.topLevelRoutes = ['/home', '/wealth', '/life', '/cards']
    this.lastBackTime = 0
    this.backToExitInterval = 2000 // 2秒内连续按返回键退出
    this.navigationStack = [] // 导航栈
    this.isInitialized = false
  }

  // 检查是否为顶级页面
  isTopLevelRoute(path) {
    return this.topLevelRoutes.includes(path)
  }

  // 初始化
  initialize(currentPath) {
    if (!this.isInitialized) {
      this.navigationStack = [currentPath]
      this.isInitialized = true
    }
  }

  // 记录路由变化
  recordNavigation(from, to) {
    // 如果是tab之间的切换，不添加到导航栈
    if (this.isTopLevelRoute(from) && this.isTopLevelRoute(to)) {
      // 替换栈顶元素而不是添加新元素
      if (this.navigationStack.length > 0) {
        this.navigationStack[this.navigationStack.length - 1] = to
      } else {
        this.navigationStack.push(to)
      }
      return
    }

    // 如果是从tab页面到非tab页面，添加到栈
    if (this.isTopLevelRoute(from) && !this.isTopLevelRoute(to)) {
      this.navigationStack.push(to)
      return
    }

    // 如果是从非tab页面返回到tab页面，弹出栈
    if (!this.isTopLevelRoute(from) && this.isTopLevelRoute(to)) {
      // 弹出非tab页面
      while (this.navigationStack.length > 0 && !this.isTopLevelRoute(this.navigationStack[this.navigationStack.length - 1])) {
        this.navigationStack.pop()
      }
      // 确保栈顶是当前tab页面
      if (this.navigationStack.length === 0 || this.navigationStack[this.navigationStack.length - 1] !== to) {
        this.navigationStack.push(to)
      }
      return
    }

    // 其他情况，正常添加到栈
    this.navigationStack.push(to)
  }

  // 检查是否应该退出应用
  shouldExitApp(currentPath) {
    if (!this.isTopLevelRoute(currentPath)) {
      return false
    }

    // 如果导航栈只有一个tab页面，应该退出
    const nonTabPages = this.navigationStack.filter(path => !this.isTopLevelRoute(path))
    return nonTabPages.length === 0 && this.navigationStack.length <= 1
  }

  // 处理返回逻辑
  async handleBack(currentPath, router) {
    if (this.isTopLevelRoute(currentPath)) {
      // 检查是否应该退出应用
      if (this.shouldExitApp(currentPath)) {
        const now = Date.now()
        
        // 如果是PWA环境，显示确认对话框
        if (this.isPWA()) {
          return this.showExitConfirm()
        }
        
        // 在浏览器中，使用双击返回退出
        if (now - this.lastBackTime < this.backToExitInterval) {
          // 连续两次返回，退出应用
          this.exitApp()
          return true
        } else {
          // 第一次返回，显示提示
          this.lastBackTime = now
          showToast({
            message: '再按一次退出应用',
            position: 'bottom',
            duration: 2000
          })
          return false
        }
      } else {
        // 有非tab页面的历史记录，允许正常返回
        return true
      }
    }
    
    // 非顶级页面，正常返回
    return true
  }

  // 检查是否为PWA环境
  isPWA() {
    return window.navigator.standalone || 
           window.matchMedia('(display-mode: standalone)').matches ||
           window.matchMedia('(display-mode: fullscreen)').matches
  }

  // 显示退出确认对话框
  async showExitConfirm() {
    try {
      await showConfirmDialog({
        title: '退出应用',
        message: '确定要退出Vue银行吗？',
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        confirmButtonColor: '#ee0a24',
        overlay: true,
        closeOnClickOverlay: false
      })
      
      this.exitApp()
      return true
    } catch (error) {
      // 用户取消
      return false
    }
  }

  // 退出应用
  exitApp() {
    if (this.isPWA()) {
      // PWA环境，尝试关闭应用
      if (window.close) {
        window.close()
      }
    } else {
      // 浏览器环境
      if (window.history.length > 1) {
        window.history.back()
      } else {
        // 尝试关闭标签页
        window.close()
      }
    }
  }

  // 重置返回计时器
  resetBackTimer() {
    this.lastBackTime = 0
  }
}

export default new BackHandler()