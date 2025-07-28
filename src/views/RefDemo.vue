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

<script>
import { ref } from 'vue'

export default {
  setup() {
    // 创建响应式数据
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
    
    return {
      username,    // 返回给模板使用
      changeName,
      clearName
    }
  }
}
</script>