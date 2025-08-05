# Vue Bank App - Vercel 部署指南

## 部署步骤

### 1. 准备工作
确保您的项目已经推送到 GitHub、GitLab 或 Bitbucket 仓库。

### 2. 连接 Vercel
1. 访问 [Vercel官网](https://vercel.com)
2. 使用 GitHub/GitLab/Bitbucket 账号登录
3. 点击 "New Project"
4. 选择您的 vue-bank 仓库

### 3. 配置部署设置
Vercel 会自动检测到这是一个 Vite 项目，但您可以确认以下设置：

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. 环境变量（如需要）
如果您的应用需要环境变量，在 Vercel 项目设置中添加：
- `NODE_ENV=production`
- 其他自定义环境变量

### 5. 部署
点击 "Deploy" 按钮，Vercel 将自动：
1. 安装依赖
2. 构建项目
3. 部署到 CDN

## 项目配置文件说明

### vercel.json
- 配置了 SPA 路由重写规则
- 确保所有路由都指向 index.html
- 设置了构建输出目录

### vite.config.js 更新
- 添加了生产环境优化配置
- 配置了代码分割
- 设置了正确的 base 路径

## 自动部署
一旦设置完成，每次推送到主分支时，Vercel 会自动重新部署您的应用。

## 自定义域名
在 Vercel 项目设置中，您可以添加自定义域名。

## 性能优化
项目已配置了以下优化：
- 代码分割（vendor 和 vant 库分离）
- 资源压缩
- 静态资源缓存

## 故障排除
如果部署失败，请检查：
1. package.json 中的构建脚本
2. 依赖版本兼容性
3. Vercel 构建日志中的错误信息