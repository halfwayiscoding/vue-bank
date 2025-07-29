<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="招商银行" fixed>
      <template #right>
        <van-icon name="search" size="18" @click="showToast('搜索功能')" />
      </template>
    </van-nav-bar>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 账户余额卡片 -->
      <div class="balance-card">
        <div class="balance-header">
          <span class="account-type">储蓄卡</span>
          <span class="card-number">尾号 8888</span>
        </div>
        <div class="balance-amount">
          <span class="currency">¥</span>
          <span class="amount">{{ balance.toLocaleString() }}</span>
        </div>
        <div class="balance-footer">
          <span>可用余额</span>
          <van-icon name="eye-o" @click="toggleBalanceVisibility" />
        </div>
      </div>

      <!-- 快捷功能 -->
      <div class="quick-functions">
        <div class="function-grid">
          <div class="function-item" @click="goToTransfer">
            <div class="function-icon transfer">
              <van-icon name="exchange" size="24" />
            </div>
            <span>转账</span>
          </div>
          <div class="function-item" @click="goToCards">
            <div class="function-icon cards">
              <van-icon name="credit-pay" size="24" />
            </div>
            <span>我的卡片</span>
          </div>
          <div class="function-item" @click="showToast('理财功能')">
            <div class="function-icon wealth">
              <van-icon name="gold-coin-o" size="24" />
            </div>
            <span>理财</span>
          </div>
          <div class="function-item" @click="showToast('贷款功能')">
            <div class="function-icon loan">
              <van-icon name="shop-o" size="24" />
            </div>
            <span>贷款</span>
          </div>
        </div>
      </div>

      <!-- 开发者演示区域 -->
      <div class="developer-section">
        <div class="section-header">
          <h3>🛠️ 开发者演示</h3>
        </div>
        <div class="demo-grid">
          <div class="demo-item" @click="goToComponentDemo">
            <div class="demo-icon component">
              <van-icon name="apps-o" size="20" />
            </div>
            <span>组件基础</span>
          </div>
          <div class="demo-item" @click="goToRenderDemo">
            <div class="demo-icon render">
              <van-icon name="setting-o" size="20" />
            </div>
            <span>Render函数</span>
          </div>
          <div class="demo-item" @click="goToLifecycleDemo">
            <div class="demo-icon lifecycle">
              <van-icon name="clock-o" size="20" />
            </div>
            <span>生命周期</span>
          </div>
          <div class="demo-item" @click="goToComputedDemo">
            <div class="demo-icon computed">
              <van-icon name="fire-o" size="20" />
            </div>
            <span>计算属性</span>
          </div>
        </div>
      </div>

      <!-- 交易记录 -->
      <div class="transaction-section">
        <div class="section-header">
          <h3>最近交易</h3>
          <span class="more" @click="goToAccount">查看全部</span>
        </div>
        <van-cell-group>
          <van-cell
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            :title="transaction.title"
            :label="transaction.time"
            :value="transaction.amount"
            :value-class="transaction.type === 'income' ? 'income' : 'expense'"
          >
            <template #icon>
              <div :class="['transaction-icon', transaction.type]">
                <van-icon :name="transaction.icon" size="20" />
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="activeTab" fixed>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/account">账户</van-tabbar-item>
      <van-tabbar-item icon="credit-pay" to="/cards">卡片</van-tabbar-item>
      <van-tabbar-item icon="user-o" @click="showToast('个人中心')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const activeTab = ref(0)
const balance = ref(128888.88)
const balanceVisible = ref(true)

// 模拟交易记录数据
const recentTransactions = ref([
  {
    id: 1,
    title: '工资发放',
    time: '今天 14:30',
    amount: '+8,500.00',
    type: 'income',
    icon: 'gold-coin-o'
  },
  {
    id: 2,
    title: '超市购物',
    time: '昨天 19:20',
    amount: '-156.80',
    type: 'expense',
    icon: 'shop-o'
  },
  {
    id: 3,
    title: '转账给张三',
    time: '昨天 15:45',
    amount: '-2,000.00',
    type: 'expense',
    icon: 'exchange'
  }
])

// 切换余额显示/隐藏
const toggleBalanceVisibility = () => {
  balanceVisible.value = !balanceVisible.value
}

// 导航方法
const goToTransfer = () => {
  router.push('/transfer')
}

const goToCards = () => {
  router.push('/cards')
}

const goToAccount = () => {
  router.push('/account')
}

const goToRenderDemo = () => {
  router.push('/render-demo')
}

const goToLifecycleDemo = () => {
  router.push('/lifecycle-demo')
}

const goToComputedDemo = () => {
  router.push('/computed-demo')
}

const goToComponentDemo = () => {
  router.push('/component-demo')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.content {
  padding-top: 46px;
  padding: 46px 16px 16px;
}

.balance-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.balance-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
  opacity: 0.9;
}

.balance-amount {
  margin-bottom: 16px;
}

.currency {
  font-size: 20px;
  margin-right: 4px;
}

.amount {
  font-size: 32px;
  font-weight: bold;
}

.balance-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  opacity: 0.9;
}

.quick-functions {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.function-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: white;
}

.function-icon.transfer {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.function-icon.cards {
  background: linear-gradient(135deg, #4834d4, #686de0);
}

.function-icon.wealth {
  background: linear-gradient(135deg, #f9ca24, #f0932b);
}

.function-icon.loan {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
}

.function-item span {
  font-size: 12px;
  color: #666;
}

.developer-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px dashed #e8e8e8;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.demo-item:hover {
  background-color: #f8f9fa;
}

.demo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  color: white;
}

.demo-icon.render {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.demo-icon.component {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
}

.demo-icon.lifecycle {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.demo-icon.computed {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.demo-item span {
  font-size: 11px;
  color: #666;
  text-align: center;
}

.transaction-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0;
}

.section-header h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.more {
  font-size: 14px;
  color: #1989fa;
}

.transaction-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
}

.transaction-icon.income {
  background: linear-gradient(135deg, #00b894, #00cec9);
}

.transaction-icon.expense {
  background: linear-gradient(135deg, #fd79a8, #e84393);
}

.income {
  color: #00b894 !important;
}

.expense {
  color: #e84393 !important;
}
</style>