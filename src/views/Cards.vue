<template>
  <div class="cards-container">
    <van-nav-bar title="我的卡片" left-arrow @click-left="$router.back()" />
    
    <div class="content">
      <!-- 卡片轮播 -->
      <div class="cards-carousel">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="card in cards" :key="card.id">
            <div :class="['card-item', card.type]">
              <div class="card-header">
                <span class="card-name">{{ card.name }}</span>
                <span class="card-logo">{{ card.bank }}</span>
              </div>
              <div class="card-number">{{ card.number }}</div>
              <div class="card-footer">
                <div class="card-info">
                  <span class="label">持卡人</span>
                  <span class="value">{{ card.holder }}</span>
                </div>
                <div class="card-info">
                  <span class="label">有效期</span>
                  <span class="value">{{ card.expiry }}</span>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 卡片功能 -->
      <div class="card-functions">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            v-for="func in cardFunctions"
            :key="func.name"
            :icon="func.icon"
            :text="func.name"
            @click="handleFunction(func.action)"
          />
        </van-grid>
      </div>

      <!-- 卡片列表 -->
      <div class="card-list">
        <van-cell-group title="我的银行卡">
          <van-cell
            v-for="card in cards"
            :key="card.id"
            :title="card.name"
            :label="`${card.bank} • ${card.number}`"
            :value="card.status"
            :value-class="card.status === '正常' ? 'status-normal' : 'status-frozen'"
            @click="showCardDetail(card)"
          >
            <template #icon>
              <div :class="['card-icon', card.type]">
                <van-icon name="credit-pay" size="20" />
              </div>
            </template>
            <template #right-icon>
              <van-icon name="arrow" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 添加卡片按钮 -->
      <div class="add-card-section">
        <van-button 
          round 
          block 
          type="primary" 
          icon="plus"
          @click="addCard"
        >
          申请新卡
        </van-button>
      </div>
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="activeTab" fixed>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="gold-coin-o" to="/wealth">理财</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/life">生活</van-tabbar-item>
      <van-tabbar-item icon="credit-pay" to="/cards">卡片</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'

const activeTab = ref(2)

// 卡片数据
const cards = ref([
  {
    id: 1,
    name: '一卡通储蓄卡',
    bank: 'CC银行',
    number: '**** **** **** 8888',
    holder: '张三',
    expiry: '12/28',
    type: 'debit',
    status: '正常'
  },
  {
    id: 2,
    name: '信用卡金卡',
    bank: 'CC银行',
    number: '**** **** **** 6666',
    holder: '张三',
    expiry: '08/27',
    type: 'credit',
    status: '正常'
  },
  {
    id: 3,
    name: '理财金卡',
    bank: 'CC银行',
    number: '**** **** **** 9999',
    holder: '张三',
    expiry: '03/29',
    type: 'wealth',
    status: '冻结'
  }
])

// 卡片功能
const cardFunctions = ref([
  { name: '挂失', icon: 'warning-o', action: 'reportLoss' },
  { name: '解挂', icon: 'success', action: 'unfreeze' },
  { name: '设置密码', icon: 'lock', action: 'setPassword' },
  { name: '额度调整', icon: 'balance-o', action: 'adjustLimit' },
  { name: '账单查询', icon: 'orders-o', action: 'viewBill' },
  { name: '分期还款', icon: 'gold-coin-o', action: 'installment' },
  { name: '积分查询', icon: 'star-o', action: 'viewPoints' },
  { name: '更多', icon: 'ellipsis', action: 'more' }
])

// 处理功能点击
const handleFunction = (action) => {
  const actionMap = {
    reportLoss: '挂失功能',
    unfreeze: '解挂功能',
    setPassword: '设置密码',
    adjustLimit: '额度调整',
    viewBill: '账单查询',
    installment: '分期还款',
    viewPoints: '积分查询',
    more: '更多功能'
  }
  showToast(actionMap[action] || '功能开发中')
}

// 显示卡片详情
const showCardDetail = (card) => {
  showToast(`查看 ${card.name} 详情`)
}

// 申请新卡
const addCard = () => {
  showToast('申请新卡功能')
}
</script>

<style scoped>
.cards-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.content {
  padding-top: 46px;
}

.cards-carousel {
  padding: 16px;
}

.card-item {
  height: 200px;
  border-radius: 16px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  margin: 0 8px;
}

.card-item.debit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-item.credit {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.card-item.wealth {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.card-name {
  font-size: 16px;
  font-weight: bold;
}

.card-logo {
  font-size: 14px;
  opacity: 0.9;
}

.card-number {
  font-size: 20px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-info {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 4px;
}

.value {
  font-size: 14px;
  font-weight: bold;
}

.card-functions {
  background: white;
  margin: 16px;
  border-radius: 12px;
  padding: 16px 0;
}

.card-list {
  margin: 16px;
}

.card-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
}

.card-icon.debit {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.card-icon.credit {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.card-icon.wealth {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.status-normal {
  color: #00b894 !important;
}

.status-frozen {
  color: #e84393 !important;
}

.add-card-section {
  margin: 16px;
}
</style>