# Vue银行App - 类似招商银行

这是一个使用Vue 3 + Vite + Vant UI开发的移动端银行应用，模仿招商银行app的界面和功能。

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

### 已实现功能
- ✅ 用户登录（demo/123456）
- ✅ 首页展示（余额、快捷功能、交易记录）
- ✅ 转账功能
- ✅ 账户明细查询
- ✅ 银行卡管理
- ✅ 底部导航栏
- ✅ 移动端适配

### 技术栈
- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 快速构建工具
- **Vue Router** - 路由管理
- **Pinia** - 状态管理
- **Vant UI** - 移动端组件库

## 📂 项目结构

```
src/
├── views/          # 页面组件
│   ├── Login.vue   # 登录页
│   ├── Home.vue    # 首页
│   ├── Transfer.vue # 转账页
│   ├── Account.vue # 账户明细
│   └── Cards.vue   # 卡片管理
├── router/         # 路由配置
├── App.vue         # 根组件
└── main.js         # 入口文件
```

## 🎯 学习要点

### 对于iOS开发者的Vue概念对比

| iOS概念 | Vue概念 | 说明 |
|---------|---------|------|
| UIViewController | Vue组件 | 页面的基本单位 |
| Storyboard | Template | 界面布局 |
| @IBAction | @click | 事件处理 |
| @State | ref() | 响应式数据 |
| UINavigationController | Vue Router | 页面导航 |
| UserDefaults | Pinia | 数据存储 |
| UITabBarController | van-tabbar | 底部导航 |

### Vue组件的三个部分
1. **Template** - 类似iOS的Storyboard，定义界面结构
2. **Script** - 类似iOS的ViewController，处理逻辑
3. **Style** - CSS样式，定义外观

### 响应式数据
```javascript
// Vue 3的响应式数据
const count = ref(0)

// 类似iOS SwiftUI的@State
@State private var count = 0
```

## 🔧 开发建议

1. **从登录页开始** - 理解Vue组件的基本结构
2. **学习路由** - 掌握页面间的导航
3. **理解响应式** - Vue的核心概念
4. **使用组件库** - Vant提供了丰富的移动端组件
5. **移动端适配** - 注意viewport和触摸事件

## 📖 下一步学习

1. 添加状态管理（Pinia）
2. 接入真实API
3. 添加动画效果
4. 优化性能
5. 添加PWA支持

## 🤝 贡献

欢迎提交Issue和Pull Request！