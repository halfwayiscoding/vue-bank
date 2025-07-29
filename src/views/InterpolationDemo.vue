<template>
  <div style="padding: 20px;">
    <h2>插值表达式演示</h2>
    
    <!-- 显示变量值 -->
    <p>用户名：{{ username }}</p>
    <p>密码长度：{{ password.length }}</p>
    <p>是否登录：{{ isLoggedIn ? '是' : '否' }}</p>
    
    <!-- 可以写表达式 -->
    <p>用户名大写：{{ username.toUpperCase() }}</p>
    <p>计算结果：{{ 1 + 1 }}</p>
    
    <!-- 输入框 -->
    <input v-model="username" placeholder="输入用户名" />
    <input v-model="password" type="password" placeholder="输入密码" />
    
    <!-- 按钮 -->
    <button @click="toggleLogin">切换登录状态</button>
    <button @click="showValues">在控制台显示值</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('张三')
const password = ref('')
const isLoggedIn = ref(false)

const toggleLogin = () => {
  // 在JavaScript中必须用.value
  isLoggedIn.value = !isLoggedIn.value
}

const showValues = () => {
  // 在JavaScript中必须用.value
  console.log('用户名：', username.value)
  console.log('密码：', password.value)
  console.log('登录状态：', isLoggedIn.value)
}
</script>