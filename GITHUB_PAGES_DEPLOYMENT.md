# Vue Bank App - GitHub Pages 部署指南

## 📋 部署概述

GitHub Pages 是 GitHub 提供的免费静态网站托管服务。本指南将帮助您将 Vue Bank 应用自动部署到 GitHub Pages。

## 🚀 自动部署设置

### 1. GitHub Actions 工作流

已创建 `.github/workflows/deploy.yml` 文件，实现以下功能：

- ✅ 当推送到 `main` 分支时自动触发部署
- ✅ 自动安装依赖和构建项目
- ✅ 自动部署到 GitHub Pages
- ✅ 支持并发控制，避免部署冲突

### 2. Vite 配置优化

已更新 `vite.config.js` 配置：

```javascript
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/vue-bank/' : '/',
  // ... 其他配置
})
```

**说明：**
- 开发环境：`base: '/'` - 本地开发正常访问
- 生产环境：`base: '/vue-bank/'` - GitHub Pages 子路径访问

## 🔧 启用 GitHub Pages

### 步骤 1: 推送代码到 GitHub

```bash
# 添加新文件到 Git
git add .github/workflows/deploy.yml
git add GITHUB_PAGES_DEPLOYMENT.md
git add vite.config.js

# 提交更改
git commit -m "feat: 添加GitHub Pages自动部署配置

- 添加GitHub Actions工作流
- 配置Vite生产环境base路径
- 添加GitHub Pages部署指南"

# 推送到远程仓库
git push origin main
```

### 步骤 2: 在 GitHub 仓库中启用 Pages

1. 访问您的 GitHub 仓库：`https://github.com/halfwayiscoding/vue-bank`
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择：
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** 
   - Folder: **/ (root)**
5. 点击 **Save**

### 步骤 3: 等待自动部署

1. 推送代码后，GitHub Actions 会自动开始构建
2. 在仓库的 **Actions** 选项卡中可以查看部署进度
3. 部署成功后，应用将在以下地址可访问：
   ```
   https://halfwayiscoding.github.io/vue-bank/
   ```

## 📱 应用功能

部署后的应用包含以下功能：

### 银行核心功能
- 🏠 **首页** - 账户概览和快捷操作
- 💳 **我的账户** - 账户详情和交易记录
- 💸 **转账** - 转账功能和收款码
- 🎫 **我的卡片** - 银行卡管理
- 💰 **财富管理** - 投资理财产品
- 🎮 **生活服务** - 便民服务功能

### Vue 技术演示
- 📝 **插值语法演示** - Vue 模板语法
- 🔄 **响应式数据演示** - ref 和 reactive
- 🎨 **样式绑定演示** - 动态样式
- 🧩 **组件化开发演示** - 组件通信
- ⚡ **计算属性 vs 方法** - 性能对比
- 🔄 **生命周期演示** - 组件生命周期
- 🎭 **渲染函数演示** - JSX 和 h 函数
- 🔗 **代理模式演示** - Proxy 应用

## 🔄 更新部署

当您需要更新应用时：

1. **修改代码**
2. **提交更改**：
   ```bash
   git add .
   git commit -m "更新功能描述"
   git push origin main
   ```
3. **自动部署** - GitHub Actions 会自动检测到推送并重新部署

## 🛠️ 本地测试生产构建

在推送前，建议本地测试生产构建：

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 访问 http://localhost:4173/ 测试
```

## 🌐 访问地址

- **生产环境**: https://halfwayiscoding.github.io/vue-bank/
- **GitHub 仓库**: https://github.com/halfwayiscoding/vue-bank
- **本地开发**: http://localhost:3000/

## 📊 部署状态检查

### GitHub Actions 状态
- 在仓库的 **Actions** 选项卡查看构建状态
- 绿色 ✅ 表示部署成功
- 红色 ❌ 表示部署失败，点击查看错误日志

### 常见问题排查

1. **404 错误**
   - 检查 GitHub Pages 设置是否正确
   - 确认 `base` 路径配置正确

2. **资源加载失败**
   - 检查 `vite.config.js` 中的 `base` 配置
   - 确认构建输出正确

3. **路由问题**
   - GitHub Pages 不支持 SPA 路由
   - 已配置 404.html 重定向（如需要）

## 🎯 部署检查清单

- [ ] GitHub Actions 工作流文件已创建
- [ ] Vite 配置已更新（base 路径）
- [ ] 代码已推送到 main 分支
- [ ] GitHub Pages 已在仓库设置中启用
- [ ] 构建和部署成功（Actions 显示绿色）
- [ ] 应用可通过 GitHub Pages URL 访问
- [ ] 所有页面路由正常工作
- [ ] 移动端适配正常
- [ ] 静态资源加载正常

## 🔗 相关链接

- **GitHub Pages 文档**: https://docs.github.com/en/pages
- **GitHub Actions 文档**: https://docs.github.com/en/actions
- **Vite 部署指南**: https://vitejs.dev/guide/static-deploy.html

---

🎉 **恭喜！您的 Vue Bank 应用将自动部署到 GitHub Pages！**

每次推送到 main 分支时，应用都会自动更新。