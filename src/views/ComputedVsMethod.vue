<template>
  <div class="demo-container">
    <h2>计算属性 vs 方法的区别</h2>
    
    <div class="input-section">
      <input v-model="firstName" placeholder="姓" />
      <input v-model="lastName" placeholder="名" />
    </div>
    
    <div class="result-section">
      <h3>1. 计算属性 (Computed Property)</h3>
      <p>全名: {{ fullNameComputed }}</p>
      <p>全名: {{ fullNameComputed }}</p>
      <p>全名: {{ fullNameComputed }}</p>
      <small>👆 多次访问，但只计算一次（有缓存）</small>
      
      <h3>2. 方法 (Method)</h3>
      <p>全名: {{ fullNameMethod() }}</p>
      <p>全名: {{ fullNameMethod() }}</p>
      <p>全名: {{ fullNameMethod() }}</p>
      <small>👆 每次访问都重新计算（无缓存）</small>
      
      <h3>3. 性能对比</h3>
      <p>计算属性调用次数: {{ computedCallCount }}</p>
      <p>方法调用次数: {{ methodCallCount }}</p>
    </div>
    
    <div class="explanation">
      <h3>为什么叫"计算属性"？</h3>
      <ul>
        <li><strong>访问方式像属性：</strong> fullNameComputed（无括号）</li>
        <li><strong>行为像属性：</strong> 有缓存，依赖不变时不重新计算</li>
        <li><strong>声明像属性：</strong> const fullName = computed(...)</li>
      </ul>
      
      <h3>与方法的区别：</h3>
      <ul>
        <li><strong>方法访问：</strong> fullNameMethod()（有括号）</li>
        <li><strong>方法行为：</strong> 每次调用都执行</li>
        <li><strong>方法声明：</strong> const fullNameMethod = () => {...}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')
const computedCallCount = ref(0)
const methodCallCount = ref(0)

// 计算属性 - 像属性一样访问
const fullNameComputed = computed(() => {
  computedCallCount.value++
  console.log('计算属性被调用了！')
  return `${firstName.value}${lastName.value}`
})

// 方法 - 需要调用
const fullNameMethod = () => {
  methodCallCount.value++
  console.log('方法被调用了！')
  return `${firstName.value}${lastName.value}`
}
</script>

<style scoped>
.demo-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.input-section {
  margin-bottom: 30px;
}

.input-section input {
  margin: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.result-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.result-section h3 {
  color: #333;
  margin-top: 20px;
}

.result-section h3:first-child {
  margin-top: 0;
}

.result-section p {
  margin: 8px 0;
  font-size: 16px;
}

.result-section small {
  color: #666;
  font-style: italic;
}

.explanation {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.explanation h3 {
  color: #1976d2;
  margin-top: 20px;
}

.explanation h3:first-child {
  margin-top: 0;
}

.explanation ul {
  margin: 10px 0;
  padding-left: 20px;
}

.explanation li {
  margin: 8px 0;
  line-height: 1.5;
}

.explanation strong {
  color: #1976d2;
}
</style>