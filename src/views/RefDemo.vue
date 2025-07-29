<template>
  <div>
    <!-- 在模板中使用时，不需要写.value -->
    <h2>你好，{{ username }}！</h2>
    <p>你输入了 {{ username.length }} 个字符</p>
    
    <!-- v-model会自动处理.value -->
    <input v-model="username" placeholder="输入你的名字" />
    
    <!-- 点击按钮改变值 -->
    <button @click="changeName">改成张三</button>
    <button @click="clearName">清空</button>
  </div>
</template>

<script setup>
// 🚀 使用 <script setup> 语法 - Vue 3.2+ 推荐写法
import { ref } from 'vue'

// 创建响应式数据 - 自动暴露给模板
const username = ref('')

// 在JavaScript中使用时，需要.value
const changeName = () => {
  username.value = '张三'  // 必须用.value
}

const clearName = () => {
  username.value = ''     // 必须用.value
}

// 也可以读取值
const logName = () => {
  console.log('当前用户名：', username.value)  // 读取也要用.value
}

// 🎯 script setup 的优势：
// 1. 无需 export default
// 2. 无需 setup() 函数
// 3. 无需 return 语句
// 4. 所有顶层变量自动暴露给模板
</script>