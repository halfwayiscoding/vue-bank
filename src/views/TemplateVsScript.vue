<template>
  <div style="padding: 20px;">
    <h2>模板 vs JavaScript 的区别</h2>
    
    <!-- 在模板中：用插值表达式显示 -->
    <p>用户名：{{ username }}</p>
    <p>密码：{{ password }}</p>
    <p>用户名是否为demo：{{ username === 'demo' }}</p>
    <p>密码是否正确：{{ password === '123456' }}</p>
    <p>登录条件：{{ username === 'demo' && password === '123456' }}</p>
    
    <!-- 输入框 -->
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    
    <!-- 按钮 -->
    <button @click="checkLogin">检查登录条件</button>
    <button @click="showInConsole">在控制台显示</button>
    
    <!-- 条件渲染 -->
    <div v-if="username === 'demo' && password === '123456'">
      ✅ 登录条件满足！
    </div>
    <div v-else>
      ❌ 登录条件不满足
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const checkLogin = () => {
  // 在JavaScript中：必须用.value
  if (username.value === 'demo' && password.value === '123456') {
    alert('登录成功！')
  } else {
    alert('登录失败！')
  }
}

const showInConsole = () => {
  // 在JavaScript中：必须用.value
  console.log('用户名：', username.value)
  console.log('密码：', password.value)
  console.log('登录条件：', username.value === 'demo' && password.value === '123456')
}
</script>