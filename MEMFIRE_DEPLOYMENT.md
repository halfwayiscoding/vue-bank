# Vue Bank App - MemFire Cloud 部署指南

## 📋 部署概述

MemFire Cloud 是一个一站式云服务平台，提供静态网站托管、云数据库、对象存储等服务。本指南将帮助您将 Vue Bank 应用部署到 MemFire Cloud 平台。

## 🚀 部署步骤

### 1. 注册 MemFire Cloud 账号

1. 访问 [MemFire Cloud 官网](https://memfiredb.com/)
2. 点击"开始使用"或"注册登录"
3. 使用微信扫码注册登录
4. 进入 MemFire Cloud 控制台

### 2. 创建项目

1. 在控制台中点击"创建项目"
2. 选择项目名称（如：vue-bank-app）
3. 选择所需服务（静态托管）
4. 完成项目创建

### 3. 构建应用

在本地项目目录中执行构建命令：

```bash
# 安装依赖（如果还没有安装）
npm install

# 构建生产版本
npm run build
```

构建完成后，会在 `dist` 目录中生成静态文件。

### 4. 打包部署文件

将 `dist` 目录中的所有文件打包成 ZIP 格式：

```bash
# 进入 dist 目录
cd dist

# 创建 ZIP 压缩包（macOS/Linux）
zip -r vue-bank-app.zip .

# 或者手动选择 dist 目录中的所有文件，右键压缩为 ZIP
```

**重要提示：** 
- 压缩时要选择 `dist` 目录**内部**的所有文件，而不是 `dist` 目录本身
- 确保 `index.html` 在 ZIP 文件的根目录

### 5. 上传到 MemFire Cloud

1. 在 MemFire Cloud 控制台中找到"静态托管"服务
2. 点击"上传文件"或"部署"
3. 选择刚才创建的 `vue-bank-app.zip` 文件
4. 等待上传和部署完成
5. 获取访问域名（格式类似：`xxx.app.memfiredb.cn`）

### 6. 访问应用

部署完成后，您将获得一个公网访问地址，可以直接在浏览器中访问您的 Vue Bank 应用。

## 🔧 部署配置文件

### package.json 脚本
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy:memfire": "npm run build && cd dist && zip -r ../vue-bank-memfire.zip ."
  }
}
```

### vite.config.js 配置
```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/', // MemFire Cloud 静态托管根路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          vant: ['vant']
        }
      }
    }
  }
})
```

## 📱 应用特性

### 主要功能页面
- 🏠 **首页** - 账户概览和快捷操作
- 💳 **我的账户** - 账户详情和交易记录  
- 💸 **转账** - 转账功能和收款码
- 🎫 **我的卡片** - 银行卡管理
- 💰 **财富管理** - 投资理财产品
- 🎮 **生活服务** - 便民服务功能

### Vue 技术演示
- 📝 插值语法演示
- 🔄 响应式数据演示
- 🎨 样式绑定演示
- 🧩 组件化开发演示
- ⚡ 计算属性 vs 方法对比
- 🔄 生命周期演示
- 🎭 渲染函数演示
- 🔗 代理模式演示

## 🌟 MemFire Cloud 优势

### 1. 一键部署
- 无需复杂配置
- 支持 ZIP 文件直接上传
- 自动解压和部署

### 2. 免费托管
- 提供免费的静态网站托管
- 自动分配访问域名
- 支持自定义域名

### 3. 高性能
- CDN 加速
- 全球节点分布
- 快速访问体验

### 4. 扩展能力
- 云数据库服务
- 对象存储
- 用户认证
- 云函数

## 🔄 更新部署

当需要更新应用时：

1. 修改代码
2. 重新构建：`npm run build`
3. 重新打包：`cd dist && zip -r ../vue-bank-app-v2.zip .`
4. 在 MemFire Cloud 控制台重新上传新的 ZIP 文件
5. 等待部署完成

## 🛠️ 一键部署脚本

创建快速部署脚本：

```bash
#!/bin/bash
# memfire-deploy.sh

echo "🚀 开始构建 Vue Bank 应用..."
npm run build

echo "📦 打包部署文件..."
cd dist
zip -r ../vue-bank-memfire-$(date +%Y%m%d-%H%M%S).zip .
cd ..

echo "✅ 部署包已创建: vue-bank-memfire-$(date +%Y%m%d-%H%M%S).zip"
echo "📤 请将此文件上传到 MemFire Cloud 静态托管服务"
echo "🌐 MemFire Cloud 控制台: https://memfiredb.com/"
```

## 📞 技术支持

- **MemFire Cloud 官网**: https://memfiredb.com/
- **文档地址**: https://docs.memfiredb.com/
- **项目仓库**: https://github.com/halfwayiscoding/vue-bank.git

## 🎯 部署检查清单

- [ ] 本地构建成功 (`npm run build`)
- [ ] dist 目录文件完整
- [ ] ZIP 文件正确打包（index.html 在根目录）
- [ ] MemFire Cloud 项目已创建
- [ ] 静态托管服务已启用
- [ ] 部署文件已上传
- [ ] 访问域名可正常访问
- [ ] 所有页面路由正常工作
- [ ] 移动端适配正常

---

🎉 **恭喜！您的 Vue Bank 应用已成功部署到 MemFire Cloud！**