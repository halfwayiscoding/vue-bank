# Vue Bank App 🏦

这是一个使用Vue 3 + Vite + Vant UI开发的移动端银行应用，具有现代化的UI设计和完整的银行功能模拟。

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📱 功能特性

- 🏠 **首页**: 账户余额、交易记录、活动推广
- 💰 **理财**: 理财产品推荐、基金投资
- 🛍️ **生活**: 生活服务、便民缴费
- 💳 **卡片**: 银行卡管理、卡片功能
- 🔄 **转账**: 资金转账功能
- 👤 **账户**: 个人账户管理

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI组件库**: Vant 4
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **开发语言**: JavaScript

## 🌐 部署到 Vercel

### 方法一：使用 Vercel 网站部署
1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel官网](https://vercel.com)
3. 连接您的 GitHub 仓库
4. 自动检测为 Vite 项目并部署

### 方法二：使用 Vercel CLI
```bash
# 安装 Vercel CLI
npm install -g vercel

# 使用一键部署脚本
./deploy.sh

# 或手动部署
vercel --prod
```

### 部署配置
项目已包含以下配置文件：
- `vercel.json`: Vercel 部署配置
- `deploy.sh`: 一键部署脚本
- `DEPLOYMENT.md`: 详细部署说明

## 📁 项目结构

```
vue-bank/
├── src/
│   ├── components/     # 公共组件
│   ├── views/         # 页面组件
│   ├── router/        # 路由配置
│   ├── utils/         # 工具函数
│   └── main.js        # 入口文件
├── public/            # 静态资源
├── dist/              # 构建输出
├── vercel.json        # Vercel配置
├── deploy.sh          # 部署脚本
└── DEPLOYMENT.md      # 部署说明
```

## 🔧 开发说明

### 页面刷新机制
- 使用 `onMounted` 和 `onActivated` 生命周期钩子
- 支持 tab 切换时的页面数据刷新
- 使用 `keep-alive` 缓存组件状态

### 路由配置
- 支持 SPA 单页应用路由
- 配置了路由重写规则，支持直接访问子路径

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License
