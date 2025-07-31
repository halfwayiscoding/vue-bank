# Vue Proxy 使用指南

## 什么是Proxy？

在Vue开发中，Proxy主要用于解决**跨域问题**。当前端应用（运行在 `http://localhost:3000`）需要请求后端API（运行在不同的端口或域名）时，浏览器的同源策略会阻止这些请求。

## 配置方法

### 1. 在 vite.config.js 中配置

```javascript
export default defineConfig({
  server: {
    proxy: {
      // 代理路径: 配置对象
      '/api': {
        target: 'http://localhost:8080',  // 目标服务器
        changeOrigin: true,               // 改变请求头中的origin
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  }
})
```

### 2. 常用配置选项

- **target**: 目标服务器地址
- **changeOrigin**: 是否改变请求头中的origin字段
- **rewrite**: 路径重写函数
- **secure**: 是否验证SSL证书（HTTPS时使用）
- **ws**: 是否代理WebSocket连接

## 实际使用示例

### 基础API请求
```javascript
// 前端请求: /api/users/123
// 实际请求: http://localhost:8080/users/123

fetch('/api/users/123')
  .then(response => response.json())
  .then(data => console.log(data))
```

### 不同服务的代理配置
```javascript
proxy: {
  // 用户服务
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  },
  
  // 银行服务
  '/bank-api': {
    target: 'https://api.bank.example.com',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/bank-api/, '/v1')
  },
  
  // 认证服务
  '/auth': {
    target: 'http://localhost:3001',
    changeOrigin: true
  }
}
```

## 注意事项

1. **仅在开发环境有效**: Proxy配置只在开发服务器中生效
2. **生产环境**: 需要在服务器层面配置反向代理（如Nginx）
3. **路径匹配**: 代理会匹配以指定路径开头的所有请求
4. **CORS**: 代理可以解决开发环境的跨域问题

## 调试技巧

1. 在浏览器开发者工具的Network面板查看实际请求
2. 检查请求的URL是否正确代理
3. 查看控制台是否有代理相关的错误信息

## 示例项目

在本项目中，你可以访问 `/proxy-demo` 页面查看完整的使用示例。