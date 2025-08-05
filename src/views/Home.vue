<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="CC银行" fixed>
      <template #right>
        <van-icon name="search" size="18" @click="showToast('搜索功能')" />
      </template>
    </van-nav-bar>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 用户信息 -->
      <UserInfo />
      
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

      <!-- 运营活动模块 -->
      <div class="activity-section">
        <div class="section-header">
          <h3>🎉 精彩活动</h3>
          <span class="more" @click="showToast('查看更多活动')">更多</span>
        </div>
        
        <!-- 轮播活动横幅 -->
        <van-swipe class="activity-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="banner in activityBanners" :key="banner.id">
            <div class="activity-banner" :style="{ background: banner.gradient }" @click="handleActivityClick(banner)">
              <div class="banner-content">
                <div class="banner-text">
                  <h4>{{ banner.title }}</h4>
                  <p>{{ banner.subtitle }}</p>
                </div>
                <div class="banner-icon">
                  <van-icon :name="banner.icon" size="32" />
                </div>
              </div>
              <div class="banner-tag">{{ banner.tag }}</div>
            </div>
          </van-swipe-item>
        </van-swipe>

        <!-- 活动网格 -->
        <div class="activity-grid">
          <div 
            v-for="activity in activities" 
            :key="activity.id" 
            class="activity-item"
            @click="handleActivityClick(activity)"
          >
            <div class="activity-icon" :style="{ background: activity.gradient }">
              <van-icon :name="activity.icon" size="20" />
            </div>
            <div class="activity-info">
              <span class="activity-title">{{ activity.title }}</span>
              <span class="activity-desc">{{ activity.desc }}</span>
            </div>
            <div class="activity-badge" v-if="activity.badge">{{ activity.badge }}</div>
          </div>
        </div>
      </div>

      <!-- 开发者演示区域 - 已隐藏 -->
      <!-- 
      <div class="developer-section">
        <div class="section-header">
          <h3>🛠️ 开发者演示</h3>
        </div>
        <div class="demo-grid">
          <div class="demo-item" @click="goToPermissionDemo">
            <div class="demo-icon permission">
              <van-icon name="shield-o" size="20" />
            </div>
            <span>权限管理</span>
          </div>
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
          <div class="demo-item" @click="goToProxyDemo">
            <div class="demo-icon proxy">
              <van-icon name="exchange" size="18" />
            </div>
            <span>HTTP代理</span>
          </div>
          <div class="demo-item" @click="goToVueProxyDemo">
            <div class="demo-icon vue-proxy">
              <van-icon name="diamond-o" size="18" />
            </div>
            <span>Vue Proxy</span>
          </div>
          <div class="demo-item" @click="goToPromiseDemo">
            <div class="demo-icon promise">
              <van-icon name="clock-o" size="18" />
            </div>
            <span>Promise</span>
          </div>
        </div>
      </div>
      -->

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
    <BottomTabbar />
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import BottomTabbar from '@/components/BottomTabbar.vue'
import UserInfo from '@/components/UserInfo.vue'

const router = useRouter()
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

// 运营活动横幅数据
const activityBanners = ref([
  {
    id: 1,
    title: '新用户专享',
    subtitle: '开户即送888元理财金',
    icon: 'gift-o',
    tag: '限时',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    type: 'newuser'
  },
  {
    id: 2,
    title: '理财节',
    subtitle: '年化收益率高达6.8%',
    icon: 'gold-coin-o',
    tag: '热门',
    gradient: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 100%)',
    type: 'wealth'
  },
  {
    id: 3,
    title: '信用卡优惠',
    subtitle: '消费满1000返100',
    icon: 'credit-pay',
    tag: '推荐',
    gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    type: 'creditcard'
  }
])

// 活动网格数据
const activities = ref([
  {
    id: 1,
    title: '签到有礼',
    desc: '连续签到7天',
    icon: 'calendar-o',
    gradient: 'linear-gradient(135deg, #00b894, #00cec9)',
    badge: '每日',
    type: 'checkin'
  },
  {
    id: 2,
    title: '邀请好友',
    desc: '最高得500元',
    icon: 'friends-o',
    gradient: 'linear-gradient(135deg, #fd79a8, #e84393)',
    badge: '奖励',
    type: 'invite'
  },
  {
    id: 3,
    title: '积分商城',
    desc: '积分兑好礼',
    icon: 'shop-o',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    badge: null,
    type: 'points'
  },
  {
    id: 4,
    title: '生活缴费',
    desc: '水电燃气费',
    icon: 'bill-o',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    badge: '便民',
    type: 'bills'
  }
])

// 处理活动点击
const handleActivityClick = (activity) => {
  const messages = {
    newuser: '新用户专享活动详情',
    wealth: '理财节活动详情',
    creditcard: '信用卡优惠活动详情',
    checkin: '签到功能',
    invite: '邀请好友功能',
    points: '积分商城功能',
    bills: '生活缴费功能'
  }
  showToast(messages[activity.type] || '活动详情')
}

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

const goToPermissionDemo = () => {
  router.push('/permission-demo')
}

const goToComponentDemo = () => {
  router.push('/component-demo')
}

const goToProxyDemo = () => {
  router.push('/proxy-demo')
}

const goToVueProxyDemo = () => {
  router.push('/vue-proxy-demo')
}

const goToPromiseDemo = () => {
  router.push('/promise-demo')
}

// 刷新页面数据
const refreshData = () => {
  console.log('首页数据刷新')
  // 这里可以添加实际的数据刷新逻辑，比如重新获取账户余额、交易记录等
}

// 生命周期钩子
onMounted(() => {
  refreshData()
})

// 页面激活时刷新（用于tab切换）
onActivated(() => {
  refreshData()
})


</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
  /* 确保页面可以正常滚动 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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

.activity-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.activity-swipe {
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
}

.activity-banner {
  height: 120px;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.banner-text {
  color: white;
}

.banner-text h4 {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.banner-text p {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

.banner-icon {
  color: white;
  opacity: 0.8;
}

.banner-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  backdrop-filter: blur(10px);
}

.activity-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.activity-item:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
}

.activity-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.activity-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.activity-desc {
  font-size: 12px;
  color: #666;
}

.activity-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
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
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
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

.demo-icon.permission {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
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

.demo-icon.proxy {
  background: linear-gradient(135deg, #fd79a8, #fdcb6e);
}

.demo-icon.vue-proxy {
  background: linear-gradient(135deg, #00b894, #00cec9);
}

.demo-icon.promise {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
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