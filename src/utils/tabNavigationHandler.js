// Tab导航处理器
class TabNavigationHandler {
  constructor() {
    this.tabRoutes = ['/home', '/wealth', '/life', '/cards']
    this.entryRoute = '/home' // 应用入口路由
    this.hasNavigatedFromNonTab = false // 是否从非tab页面导航而来
  }

  // 检查是否为tab路由
  isTabRoute(path) {
    return this.tabRoutes.includes(path)
  }

  // 记录导航
  recordNavigation(from, to) {
    // 如果从非tab页面导航到tab页面，标记为有非tab导航历史
    if (!this.isTabRoute(from) && this.isTabRoute(to)) {
      this.hasNavigatedFromNonTab = true
    }
    
    // 如果在tab之间导航，不改变非tab导航状态
    if (this.isTabRoute(from) && this.isTabRoute(to)) {
      // tab之间的导航，保持当前状态
      return
    }
    
    // 如果从tab导航到非tab页面，重置状态
    if (this.isTabRoute(from) && !this.isTabRoute(to)) {
      this.hasNavigatedFromNonTab = false
    }
  }

  // 检查是否应该退出应用
  shouldExitOnBack(currentPath) {
    // 只有在tab页面才考虑退出
    if (!this.isTabRoute(currentPath)) {
      return false
    }

    // 如果没有从非tab页面导航而来，且当前在入口页面，则应该退出
    if (!this.hasNavigatedFromNonTab && currentPath === this.entryRoute) {
      return true
    }

    // 如果没有从非tab页面导航而来，但不在入口页面，则导航到入口页面
    if (!this.hasNavigatedFromNonTab && currentPath !== this.entryRoute) {
      return false // 让浏览器正常返回到入口页面
    }

    // 如果有从非tab页面导航而来的历史，允许正常返回
    return false
  }

  // 重置状态
  reset() {
    this.hasNavigatedFromNonTab = false
  }

  // 设置入口路由
  setEntryRoute(route) {
    this.entryRoute = route
  }
}

export default new TabNavigationHandler()