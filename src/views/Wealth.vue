<template>
  <div class="wealth-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="理财推荐" fixed>
      <template #right>
        <van-icon name="search" size="18" @click="showToast('搜索理财产品')" />
      </template>
    </van-nav-bar>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 推荐理财产品 -->
      <div class="recommend-section">
        <div class="recommend-item" v-for="product in recommendProducts" :key="product.id" @click="handleProductClick(product)">
          <!-- VIP标识 -->
          <div v-if="[2, 3].includes(product.id)" class="vip-badge">
            <van-icon name="diamond-o" size="12" />
            <span>VIP专享</span>
          </div>
          
          <div class="product-header">
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <div class="product-rate">
                <span class="rate-number">{{ product.rate }}</span>
                <span class="rate-unit">%</span>
              </div>
              <div class="product-desc">{{ product.desc }}</div>
            </div>
            <div class="product-action">
              <van-button type="danger" size="small" round>{{ product.buttonText }}</van-button>
            </div>
          </div>
          <div class="product-details">
            <span class="detail-text">{{ product.details }}</span>
          </div>
        </div>
      </div>

      <!-- 精选基金 -->
      <div class="fund-section">
        <div class="section-header">
          <h3>精选基金</h3>
        </div>
        <div class="fund-grid">
          <div class="fund-card" v-for="fund in funds" :key="fund.id" @click="handleFundClick(fund)">
            <!-- VIP标识 -->
            <div v-if="fund.id === 2" class="vip-badge-small">
              <van-icon name="diamond-o" size="10" />
              <span>VIP</span>
            </div>
            
            <div class="fund-icon" :style="{ background: fund.gradient }">
              <van-icon :name="fund.icon" size="24" />
            </div>
            <div class="fund-info">
              <h4>{{ fund.title }}</h4>
              <p>{{ fund.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 基金产品列表 -->
      <div class="product-list">
        <div class="product-item" v-for="item in fundProducts" :key="item.id" @click="handleProductClick(item)">
          <div class="item-left">
            <div class="chart-icon">
              <svg width="40" height="30" viewBox="0 0 40 30">
                <polyline 
                  :points="item.chartPoints" 
                  fill="none" 
                  :stroke="item.isPositive ? '#ff6b6b' : '#00b894'" 
                  stroke-width="2"
                />
              </svg>
            </div>
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <div class="item-rate" :class="{ positive: item.isPositive, negative: !item.isPositive }">
                {{ item.isPositive ? '+' : '' }}{{ item.rate }}%
              </div>
              <div class="item-desc">{{ item.period }}</div>
            </div>
          </div>
          <div class="item-right">
            <div class="item-tags">
              <span class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="item-discount" v-if="item.discount">{{ item.discount }}</div>
          </div>
        </div>
      </div>

      <!-- 行业资讯 -->
      <div class="news-section">
        <div class="section-header">
          <h3>行业资讯</h3>
          <van-icon name="arrow" />
        </div>
        <div class="news-item" @click="showToast('查看资讯详情')">
          <div class="news-tag">秒懂市场</div>
          <div class="news-content">
            <h4>指数波动加剧！如何降低震感？| 秒懂市场</h4>
            <div class="news-meta">
              <span class="news-date">5/5</span>
              <div class="news-mascot">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTQiIGN5PSIxNiIgcj0iMyIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIyNiIgY3k9IjE2IiByPSIzIiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0xMiAyNEMyMCAyOCAyOCAyNCAxMiAyNCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K" alt="熊猫" />
              </div>
            </div>
          </div>
          <van-button size="small" round color="#d4a574">查看详情</van-button>
        </div>
      </div>
    </div>

    <!-- 底部标签栏 -->
  <BottomTabbar />
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import BottomTabbar from '@/components/BottomTabbar.vue'
import auth from '@/utils/auth'

const route = useRoute()

// 推荐理财产品
const recommendProducts = ref([
  {
    id: 1,
    name: '"芙蓉锦程·日日得益"',
    rate: '1.539',
    desc: '7日年化收益率',
    details: '',
    buttonText: '立即购买'
  },
  {
    id: 2,
    name: '南银理财安稳1906—年定开T-G份额（自动赎回···',
    rate: '2.9~3.2',
    desc: '业绩比较基准',
    details: '',
    buttonText: '立即购买'
  },
  {
    id: 3,
    name: '宁银理财宁欣日日薪30号（芙蓉锦程-优选）（···',
    rate: '1.99',
    desc: '近一月年化',
    details: '',
    buttonText: '立即购买'
  }
])

// 精选基金
const funds = ref([
  {
    id: 1,
    title: '基金超市',
    subtitle: '多支基金任你挑',
    icon: 'shop-o',
    gradient: 'linear-gradient(135deg, #ffeaa7, #fab1a0)'
  },
  {
    id: 2,
    title: '定投专区',
    subtitle: '小投资大未来',
    icon: 'clock-o',
    gradient: 'linear-gradient(135deg, #a8e6cf, #74b9ff)'
  }
])

// 基金产品列表
const fundProducts = ref([
  {
    id: 1,
    name: '工银精选平衡混合',
    rate: '11.61',
    period: '近1年收益率',
    tags: ['均衡配置', '低波权益'],
    discount: '0.1折申购',
    isPositive: true,
    chartPoints: '5,25 10,15 15,20 20,10 25,18 30,8 35,12'
  },
  {
    id: 2,
    name: '易方达如意安享一年持有混合（FOF）A',
    rate: '3.72',
    period: '近1年收益率',
    tags: ['风险分散', '长期稳健'],
    discount: '1折申购',
    isPositive: true,
    chartPoints: '5,20 10,18 15,22 20,16 25,19 30,14 35,17'
  },
  {
    id: 3,
    name: '华夏行业景气混合',
    rate: '51.85',
    period: '近1年收益率',
    tags: ['据金量气赛道', '布局成长'],
    discount: '0.1折申购',
    isPositive: true,
    chartPoints: '5,28 10,12 15,8 20,15 25,5 30,18 35,3'
  }
])

// 处理产品点击
const handleProductClick = async (product) => {
  // 高收益产品需要VIP权限
  const highYieldProducts = [2, 3] // 收益率较高的产品ID
  
  if (highYieldProducts.includes(product.id)) {
    if (!auth.hasVIPLevel(1)) {
      try {
        await showConfirmDialog({
          title: 'VIP专享产品',
          message: '此产品为VIP专享，升级VIP即可享受更高收益理财产品。是否了解VIP权益？',
          confirmButtonText: '了解VIP',
          cancelButtonText: '取消'
        })
        showToast('VIP权益详情页面')
      } catch {
        // 用户取消
      }
      return
    }
  }
  
  showToast(`查看${product.name}详情`)
}

// 处理基金点击
const handleFundClick = async (fund) => {
  // 定投专区需要VIP权限
  if (fund.id === 2) { // 定投专区
    if (!auth.hasVIPLevel(1)) {
      try {
        await showConfirmDialog({
          title: 'VIP专享功能',
          message: '定投专区为VIP专享功能，可享受更优质的定投服务和更低的手续费。是否了解VIP权益？',
          confirmButtonText: '了解VIP',
          cancelButtonText: '取消'
        })
        showToast('VIP权益详情页面')
      } catch {
        // 用户取消
      }
      return
    }
  }
  
  showToast(`进入${fund.title}`)
}

// 刷新页面数据
const refreshData = () => {
  console.log('理财页面数据刷新')
  // 这里可以添加实际的数据刷新逻辑，比如重新获取理财产品数据
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
.wealth-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.content {
  padding-top: 46px;
  padding: 46px 16px 16px;
}

.recommend-section {
  margin-bottom: 20px;
}

.recommend-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.recommend-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.product-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.product-rate {
  margin-bottom: 4px;
}

.rate-number {
  font-size: 24px;
  font-weight: bold;
  color: #ff6b6b;
}

.rate-unit {
  font-size: 16px;
  color: #ff6b6b;
}

.product-desc {
  font-size: 12px;
  color: #666;
}

.product-details {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.fund-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.fund-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.fund-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.fund-card:hover {
  background: #e9ecef;
}

.fund-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: white;
}

.fund-info h4 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.fund-info p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.product-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.product-item:last-child {
  border-bottom: none;
}

.product-item:hover {
  background-color: #f8f9fa;
}

.item-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.chart-icon {
  margin-right: 12px;
}

.item-info h4 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.item-rate {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
}

.item-rate.positive {
  color: #ff6b6b;
}

.item-rate.negative {
  color: #00b894;
}

.item-desc {
  font-size: 12px;
  color: #666;
}

.item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.item-tags {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}

.tag {
  background: #f0f0f0;
  color: #666;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.item-discount {
  background: #ff6b6b;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.news-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.news-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.news-tag {
  background: #d4a574;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.news-content {
  flex: 1;
}

.news-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.news-date {
  font-size: 12px;
  color: #666;
}

.news-mascot img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

/* VIP标识样式 */
.vip-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 2px;
  box-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
  z-index: 1;
}

.vip-badge-small {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1px;
  box-shadow: 0 1px 2px rgba(255, 215, 0, 0.3);
  z-index: 1;
}
</style>