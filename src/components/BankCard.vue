<template>
  <!-- 🎨 Template: 定义组件的界面结构 -->
  <div class="bank-card" :class="cardType">
    <div class="card-header">
      <span class="bank-name">{{ bankName }}</span>
      <span class="card-type">{{ cardTypeName }}</span>
    </div>
    
    <div class="card-number">
      {{ maskedCardNumber }}
    </div>
    
    <div class="card-footer">
      <div class="balance">
        <span class="label">可用余额</span>
        <span class="amount">¥{{ formattedBalance }}</span>
      </div>
      <div class="actions">
        <button @click="handleTransfer" class="action-btn">转账</button>
        <button @click="handleDetails" class="action-btn">详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 🧠 Script: 定义组件的业务逻辑
import { ref, computed } from 'vue'

// 📥 Props: 接收父组件传递的数据
const props = defineProps({
  bankName: {
    type: String,
    default: '招商银行'
  },
  cardNumber: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    default: 'savings', // savings, credit, debit
    validator: (value) => ['savings', 'credit', 'debit'].includes(value)
  },
  balance: {
    type: Number,
    default: 0
  }
})

// 📤 Emits: 定义组件可以发出的事件
const emit = defineEmits(['transfer', 'showDetails'])

// 🔢 响应式数据
const isLoading = ref(false)

// 🧮 计算属性：根据其他数据自动计算
const cardTypeName = computed(() => {
  const typeMap = {
    savings: '储蓄卡',
    credit: '信用卡',
    debit: '借记卡'
  }
  return typeMap[props.cardType] || '银行卡'
})

// 隐藏卡号中间部分
const maskedCardNumber = computed(() => {
  if (!props.cardNumber) return ''
  const num = props.cardNumber.replace(/\s/g, '')
  return `**** **** **** ${num.slice(-4)}`
})

// 格式化余额显示
const formattedBalance = computed(() => {
  return props.balance.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
})

// 🎯 方法：处理用户交互
const handleTransfer = () => {
  isLoading.value = true
  
  // 发送事件给父组件
  emit('transfer', {
    cardNumber: props.cardNumber,
    cardType: props.cardType
  })
  
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const handleDetails = () => {
  emit('showDetails', {
    cardNumber: props.cardNumber,
    balance: props.balance
  })
}
</script>

<style scoped>
/* 🎨 Style: 定义组件的外观样式 */

.bank-card {
  width: 100%;
  height: 200px;
  border-radius: 16px;
  padding: 20px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.bank-card:hover {
  transform: translateY(-4px);
}

/* 💳 不同卡片类型的样式 */
.bank-card.savings {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bank-card.credit {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bank-card.debit {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.bank-name {
  font-size: 16px;
  font-weight: bold;
}

.card-type {
  font-size: 12px;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
}

.card-number {
  font-size: 18px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.balance .label {
  display: block;
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
}

.balance .amount {
  font-size: 20px;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.action-btn:active {
  transform: scale(0.95);
}

/* 🔄 加载状态 */
.bank-card.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>